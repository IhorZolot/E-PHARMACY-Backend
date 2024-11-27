import mongoose from 'mongoose'
import fs from 'fs/promises'
import path from 'path'

import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

import Shop from '../models/Shop.js'
import Product, { productAddSchemaJoi } from '../models/Product.js'
const productImagePath = path.resolve('public', 'productImg')

const getAllProductsShop = async (req, res) => {
	const { shopId } = req.params
	const { page = 1, limit = 5 } = req.query
	const skip = (page - 1) * limit
	if (!shopId) {
		throw HttpError(404, `Shop with id:${shopId} not found`)
	}
	if (!mongoose.Types.ObjectId.isValid(shopId)) {
		throw HttpError(400, 'Invalid shop ID')
	}
	const shop = await Shop.findById(shopId).lean()
	if (!shop) {
		throw HttpError(404, `Shop with ID: ${shopId} not found`)
	}
	const products = await Product.find({ shopId }, '-createdAt -updatedAt', { skip, limit })
	const totalProducts = await Product.countDocuments({ shopId })

	res.json({ shop, products, totalProducts, limit, page })
}
const addProductShop = async (req, res) => {
	const { shopId } = req.params

	if (!mongoose.Types.ObjectId.isValid(shopId)) {
		throw HttpError(400, 'Invalid shop ID')
	}

	const shop = await Shop.findById(shopId)
	if (!shop) {
		throw HttpError(404, `Shop with ID: ${shopId} not found`)
	}
	let photo = null
	if (req.file) {
		const { path: oldPath, filename } = req.file
		const newPath = path.join(productImagePath, filename)
		await fs.rename(oldPath, newPath)
		photo = path.join('productImg', filename)
	}

	const { error } = productAddSchemaJoi.validate(req.body)
	if (error) {
		throw HttpError(400, error.details[0].message)
	}
	const newProduct = await Product.create({ ...req.body, photo, shopId })

	res.status(201).json({
		message: 'Product added successfully',
		product: newProduct,
	})
}
const getOneProductShop = async (req, res) => {
	const { shopId, productId } = req.params
	if (!mongoose.Types.ObjectId.isValid(shopId)) {
		throw HttpError(400, 'Invalid shop ID')
	}
	if (!mongoose.Types.ObjectId.isValid(productId)) {
		throw HttpError(400, 'Invalid product ID')
	}
	const shop = await Shop.findById(shopId)
	if (!shop) {
		throw HttpError(404, `Shop with ID: ${shopId} not found`)
	}
	const product = await Product.findById(productId).lean()
	if (!product) {
		throw HttpError(404, `Product with ID: ${productId} not found`)
	}
	res.json({ shop, product })
}
const updateProductShop = async (req, res) => {
	const { shopId, productId } = req.params
	if (!mongoose.Types.ObjectId.isValid(shopId)) {
		throw HttpError(400, 'Invalid shop ID')
	}
	if (!mongoose.Types.ObjectId.isValid(shopId) || !mongoose.Types.ObjectId.isValid(productId)) {
		throw HttpError(400, 'Invalid shop ID or product ID')
	}
	const shop = await Shop.findById(shopId).lean()
	if (!shop) {
		throw HttpError(404, `Shop with ID: ${shopId} not found`)
	}
	const product = await Product.findById(productId).lean()
	if (!product) {
		throw HttpError(404, `Product with ID: ${productId} not found`)
	}
	const updateProductShop = await Product.findByIdAndUpdate(productId, req.body, { new: true })
	if (!updateProductShop) {
		throw HttpError(404, `Product with ID: ${productId} not found`)
	}
	res.json({ shop, updateProductShop })
}
const deleteProductShop = async (req, res) => {
	const { shopId, productId } = req.params
	if (!mongoose.Types.ObjectId.isValid(shopId) || !mongoose.Types.ObjectId.isValid(productId)) {
		throw HttpError(400, 'Invalid shop or product ID')
	}
	const product = await Product.findByIdAndDelete(productId).lean()
	if (!product) {
		throw HttpError(404, `Product with ID: ${productId} not found`)
	}
	res.json({ message: 'Product deleted successfully', product })
}
export default {
	getAllProductsShop: ctrlWrapper(getAllProductsShop),
	addProductShop: ctrlWrapper(addProductShop),
	getOneProductShop: ctrlWrapper(getOneProductShop),
	updateProductShop: ctrlWrapper(updateProductShop),
	deleteProductShop: ctrlWrapper(deleteProductShop),
}
