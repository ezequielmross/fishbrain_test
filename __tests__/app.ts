/* Update test envs */
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '../.env.test') })

/* Dependencies */
import db  from '../src/db'
import app from '../src/app'

/* Running DB */
export default () => db().then(() => app())