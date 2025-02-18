import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import 'dotenv/config'

import shopsRouter from './routes/api/shops-router.js'
import productsShopsRouter from './routes/api/products-shops-router.js'
import statisticsRouter from './routes/api/statistics-router.js'
import authRouter from './routes/api/auth-router.js'
import productsRouter from './routes/api/products-router.js'
import reviewsRouter from './routes/api/reviews-router.js'
import  policyPublicRouter from './routes/api/policy-public-routes.js'

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/user', authRouter)
app.use('/api/shop', shopsRouter)
app.use('/api/shop', productsShopsRouter)
app.use('/api/products', productsRouter)
app.use('/api/statistics', statisticsRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/policy', policyPublicRouter)


app.use((req, res) => {
	res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({ message: err.message })
})

export default app
