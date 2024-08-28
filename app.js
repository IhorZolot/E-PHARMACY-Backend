import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import 'dotenv/config'

import shopsRouter from './routes/api/shops-router.js'
import productsShopsRouter from './routes/api/products-shops-router.js'
import statisticsRouter from './routes/api/statistics-router.js'
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/shop', shopsRouter)
app.use('/api/shop', productsShopsRouter)
app.use('/api/statistics', statisticsRouter)

app.use((req, res) => {
	res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({ message: err.message })
})

export default app
