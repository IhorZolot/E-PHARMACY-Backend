import bcryptjs from 'bcryptjs'

import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

import Shop from '../models/Shop.js'

const createShop = async (req, res) => {
	const { _id: owner, password } = req.user
	const hashPassword = await bcryptjs.hash(password, 10)
	const result = await (await Shop.create({ ...req.body, owner, password: hashPassword })).populate('owner')

	res.status(201).json(result)
}
const getShopsById = async (req, res) => {
	const { shopId } = req.params
	const result = await Shop.findById(shopId)
	if (!result) {
		throw HttpError(404, `Shop with id:${shopId} not found`)
	}
	res.json(result)
}
const getShopUpdate = async (req, res) => {
	const { shopId } = req.params
	const result = await Shop.findByIdAndUpdate(shopId, req.body, {
		new: true,
	})
	if (!result) {
		throw HttpError(404, `Shop with id:${shopId} not found`)
	}
	res.json(result)
}
export default {
	createShop: ctrlWrapper(createShop),
	getShopsById: ctrlWrapper(getShopsById),
	getShopUpdate: ctrlWrapper(getShopUpdate),
}
