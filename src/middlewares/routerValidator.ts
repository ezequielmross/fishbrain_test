import { RouteSchema, schemaValidator } from './schemaValidator'
import { Request, Response } from 'express'

type RouterSchema = {
  request: RouteSchema
  controller: Function
}

const routerValidator = (router: RouterSchema) => (req: Request, res: Response) => {
  schemaValidator(router.request)(req, res, async () => {
    try {
      await router.controller(req, res)
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  })
}

export default routerValidator