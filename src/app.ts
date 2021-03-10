/* Dependencies */
import express    from 'express'
import cors       from 'cors'
import helmet     from 'helmet'

/* Middlewares */
// import authMiddleware from './middlewares/authentication'

/* Controllers */
import versionRouter from './routes/version'

/* Start Server */
export default () => {
  /* Express initialization */
  const app = express()

  /* Initialize dependencies */
  app.use(cors())
  app.use(helmet())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  /* Routes endpoints */
  app.use('/', versionRouter)

  /* Running server */
  const port = 8000
  app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`)
  })

  return app
}
