import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

const getAllStatistics = async (req, res) => {
	const result = await Promise.resolve('All statistics')
	res.json(result)
}
const getStatOneClient = async (req, res) => {
	const result = []
	if (!result) {
		throw HttpError(404, `Client with id  not found`)
	}
	res.json(result)
}
export default {
	getAllStatistics: ctrlWrapper(getAllStatistics),
	getStatOneClient: ctrlWrapper(getStatOneClient),
}
