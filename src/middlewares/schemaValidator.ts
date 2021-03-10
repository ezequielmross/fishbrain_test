import Joi from 'joi'
import { Request, Response } from 'express'

const checkError = (data: any, schema: Joi.ObjectSchema<any> | undefined) => {
  if (schema) {
    return schema.validate(data)
  }
}

export type RouteSchema = {
  query?: Joi.ObjectSchema
  params?: Joi.ObjectSchema
  body?: Joi.ObjectSchema
}

export const schemaValidator = (schema: RouteSchema) => (req: Request, res: Response, next: Function) => {
  if (!schema) {
    return next()
  }

  // Check errors
  const query  = checkError(req.query, schema.query)
  const params = checkError(req.params, schema.params)
  const body   = checkError(req.body, schema.body)

  // Set errors
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

  if (errors.length > 0) {
    return res.status(400).json({
      error: errors.join('\n')
    })
  }

  req.query  = query  && query.value  ? query.value  : req.query
  req.params = params && params.value ? params.value : req.params
  req.body   = body   && body.value   ? body.value   : req.body

  next()
}