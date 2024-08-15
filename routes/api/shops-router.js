import express from 'express'

const shopsRouter = express.Router()

shopsRouter.post('/create', (req, res) => {
	console.log(req.body)
	res.json({ message: 'OK' })
})
shopsRouter.get('/', (req, res) => {
	res.json([])
})
shopsRouter.put('/{shopId}/update', (req, res) => {
	res.json({ message: 'OK' })
})

export default shopsRouter
