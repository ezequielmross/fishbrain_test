import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

// Check schema errors in a payload
const checkError = (data: any, schema: Joi.ObjectSchema<any> | undefined) => {
  if (schema) {
    return schema.validate(data)
  }
}

// Default Request Schema
export type RouteSchema = {
  query?: Joi.ObjectSchema
  params?: Joi.ObjectSchema
  body?: Joi.ObjectSchema
}

export const schemaValidator = (schema: RouteSchema) => (req: Request, res: Response, next: NextFunction) => {
  // Ignore apis with no schema
  if (!schema) {
    return next()
  }

  // Check errors
  const query  = checkError(req.query, schema.query)
  const params = checkError(req.params, schema.params)
  const body   = checkError(req.body, schema.body)

  // Set Joi errors messages
  const errors: Joi.ValidationError[] = []
  if (query && query.error) {
    errors.push(query.error)
  }
  if (params && params.error) {
    errors.push(params.error)
  }
  if (body && body.error) {
    errors.push(body.error)
  }

  // Send Joi errors to client
  if (errors.length > 0) {
    return res.status(400).json({
      error: errors.join('\n')
    })
  }

  // Update request objects
  req.query  = query  && query.value  ? query.value  : req.query
  req.params = params && params.value ? params.value : req.params
  req.body   = body   && body.value   ? body.value   : req.body

  // Proceed
  next()
}