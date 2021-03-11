import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.json({
    'api': 'Test API',
    'version': '1.0.0'
  })
})

export default router
