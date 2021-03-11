import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { join } from 'path'

export default () => createConnection({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [
    join(__dirname, './entity/**/*.js'),
    join(__dirname, './entity/**/*.ts')
  ],
  synchronize: true,
  logging: false
})