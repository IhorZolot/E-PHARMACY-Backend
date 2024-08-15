import express from 'express'

const productsRouter = express.Router()

productsRouter.post('/create', (req, res) => {
	console.log(req.body)
	res.json({ message: 'OK' })
})
productsRouter.get('/', (req, res) => {
	res.json([])
})
productsRouter.put('/{productId}/update', (req, res) => {
	res.json({ message: 'OK' })
})
export default productsRouter
