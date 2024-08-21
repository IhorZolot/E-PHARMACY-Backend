const getAllStatistics = async (req, res) => {
	const result = await Promise.resolve('All statistics')
	res.json(result)
}
const getStatOneClient = async (req, res) => {
	const result = []
	res.json(result)
}
export default { getAllStatistics, getStatOneClient }
