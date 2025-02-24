import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

import Product from '../models/Product.js'

const getAllProducts = async (req, res) => {
	const { page = 1, limit = 8 } = req.query
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
	const { category, query, page = 1, limit = 8 } = req.query
	const filters = {}
	if (category) {
		filters.category = category
	}
	if (query) {
		filters.name = { $regex: query, $options: 'i' }
	}
	const pageInt = parseInt(page)
	const limitInt = parseInt(limit)
	const skip = (pageInt - 1) * limitInt

	const products = await Product.find(filters, '-createdAt -updatedAt').skip(skip).limit(limit).lean()
	const total = await Product.countDocuments(filters)
	const pages = Math.ceil(total / limitInt)

	res.json({
		products,
		total,
		pages,
		page: pageInt,
		limit: limitInt,
	})
}

export default {
	getAllProducts: ctrlWrapper(getAllProducts),
	getOneProduct: ctrlWrapper(getOneProduct),
	getCategoryProductsAll: ctrlWrapper(getCategoryProductsAll),
	filterByCategoryAndQuery: ctrlWrapper(filterByCategoryAndQuery),
}
