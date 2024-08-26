import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

import Product from '../models/Product.js'
import Customer from '../models/Customer.js'
import Supplier from '../models/Supplier.js'
import IncomeExpenses from '../models/IncomeExpenses.js'

const getAllStatistics = async (req, res) => {
	const productsCount = await Product.countDocuments(1)
	const customersCount = await Customer.countDocuments()
	const suppliersCount = await Supplier.countDocuments()

	console.log('Product Count:', productsCount)
	console.log('Customer Count:', customersCount)
	console.log('Supplier Count:', suppliersCount)

	const statisticsCustomer = await Customer.find().lean()
	const statisticsIncomeExpenses = await IncomeExpenses.find().lean()

	console.log('Customer Count All:', statisticsCustomer)
	console.log('Income Expenses Result:', statisticsIncomeExpenses)

	const counts = {
		productsCount,
		customersCount,
		suppliersCount,
	}

	const result = {
		counts,
		statisticsCustomer,
		statisticsIncomeExpenses,
	}
	res.json(result)
}
const getStatOneClient = async (req, res) => {
	const { _id } = req.params
	console.log(_id)

	const result = await Customer.findById(_id).lean()

	if (!result) {
		throw HttpError(404, `Client with id:${_id}  not found`)
	}
	res.json(result)
}
export default {
	getAllStatistics: ctrlWrapper(getAllStatistics),
	getStatOneClient: ctrlWrapper(getStatOneClient),
}
