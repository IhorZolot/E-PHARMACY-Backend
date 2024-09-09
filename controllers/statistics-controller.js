import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

import Product from '../models/Product.js'
import Customer from '../models/Customer.js'
import Supplier from '../models/Supplier.js'
import IncomeExpenses from '../models/IncomeExpenses.js'

const getAllStatistics = async (req, res) => {
	const productsCount = await Product.countDocuments()
	const customersCount = await Customer.countDocuments()
	const suppliersCount = await Supplier.countDocuments()

	const statisticsCustomer = await Customer.find({},"-image -phone -register_date" ).lean()
	const statisticsIncomeExpenses = await IncomeExpenses.find().lean()

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
	const { clientId} = req.params
	const result = await Customer.findById(clientId).lean()

	if (!result) {
		throw HttpError(404, `Client with id:${clientId} not found`)
	}
	res.json(result)
}
export default {
	getAllStatistics: ctrlWrapper(getAllStatistics),
	getStatOneClient: ctrlWrapper(getStatOneClient),
}
