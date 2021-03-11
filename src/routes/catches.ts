import express, { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { createReadStream, access } from 'fs'
import { join } from 'path'
import { AnglerCatch } from '../entity'
import routerValidator from '../middlewares/routerValidator'
import imageUpload from '../middlewares/imageUpload'
import joi from 'joi'
import queue from '../queue'

const router = express.Router()

// Create an angler catch
router.post('/', imageUpload('img'), routerValidator({
  request: {
    body: joi.object({
      anglerName: joi.string().required(),
      species: joi.string().required(),
      weight: joi.number().required(),
      length: joi.number().required(),
      latitude: joi.number().required(),
      longitude: joi.number().required()
    }).options({ stripUnknown: true })
  },
  async controller(req: Request, res: Response) {
    const repo = getRepository(AnglerCatch)

    const anglerCatch = new AnglerCatch()

    anglerCatch.anglerName = req.body.anglerName
    anglerCatch.species    = req.body.species
    anglerCatch.weight     = req.body.weight
    anglerCatch.length     = req.body.length
    anglerCatch.latitude   = req.body.latitude
    anglerCatch.longitude  = req.body.longitude
    anglerCatch.timestamp  = new Date()

    const result = await repo.save(anglerCatch)

    queue.push(req.file.path, result.id.toString())

    res.json(result)
  }
}))

// List all catches ordered by date
router.get('/', async (req: Request, res: Response) => {
  const repo = getRepository(AnglerCatch)

  const catches = await repo.find({
    order: {
      timestamp: "DESC"
    }
  })

  res.json(catches)
})

// Get a catch resized photo
router.get('/:id/resized-photo', async (req: Request, res: Response) => {
  const filePath = join(__dirname, '../../', 'public', 'resized', `${req.params.id}.png`)
  const exist = await new Promise((resolve, reject) => access(filePath, err => {
      if (err) return resolve(false)
      resolve(true)
    }))
  if (!exist)
    return res.status(404).json({ error: 'resized photo not found' })

  createReadStream(filePath)
    .pipe(res)
})

export default router
