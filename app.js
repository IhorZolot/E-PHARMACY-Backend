import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import 'dotenv/config'

import shopsRouter from './routes/api/shops-router.js'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/shops', shopsRouter)

app.use((req, res) => {
	res.status(404).json({ message: 'Not found' })
})

export default app
