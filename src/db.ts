import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { join } from 'path'
const entitiesPath = join(__dirname, './entity/**/*.js')

export default () => createConnection({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [
    entitiesPath
  ],
  synchronize: true,
  logging: false
})