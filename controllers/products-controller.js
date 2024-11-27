import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

import Product from '../models/Product.js'

const getAllProducts = async (req, res) => {
	const { page = 1, limit = 5 } = req.query
	const skip = (page - 1) * limit
	const products = await Product.find({}, '-createdAt -updatedAt', { skip, limit }).lean()
	const total = await Product.countDocuments()
	const pages = Math.ceil(total / limit)
	res.json({ products, pages, total, limit, page })
}

export default {
	getAllProducts: ctrlWrapper(getAllProducts),
}