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
const getCategoryProductsAll = async (req, res) => {
	const categories = await Product.distinct('category')
	res.json(categories)
}

const getOneProduct = async (req, res) => {
	const { productId } = req.params
	const product = await Product.findById(productId).lean()
	if (!product) {
		throw HttpError(404, `Product with ID: ${productId} not found`)
	}
	res.json(product)
}
const filterByCategoryAndQuery = async (req, res) => {
	const { category, query } = req.query
	const filters = {}
	if (category) {
		filters.category = category
	}
	if (query) {
		filters.name = { $regex: query, $options: 'i' }
	}
	const result = await Product.find(filters, '-createdAt -updatedAt').lean()
	res.json(result)
}

export default {
	getAllProducts: ctrlWrapper(getAllProducts),
	getOneProduct: ctrlWrapper(getOneProduct),
	getCategoryProductsAll: ctrlWrapper(getCategoryProductsAll),
	filterByCategoryAndQuery: ctrlWrapper(filterByCategoryAndQuery),
}
