/* Starting dotenv */
import dotenv from 'dotenv'
import path from 'path'
if (process.env.NODE_ENV === 'test')
  dotenv.config({ path: path.join(__dirname, '../.env.test') })
else
  dotenv.config()

/* Dependencies */
import db  from './db'
import app from './app'

/* Running DB */
db()
  .then(() => app())
  .catch(err => {
    console.error(err)
  })