import { ctrlWrapper } from '../decorators/index.js'

import Review from '../models/Review.js'

const getReviews = async (req, res) => {
	const { page = 1, limit = 5 } = req.query
	const skip = (page - 1) * limit
	const reviews = await Review.find({}, '-createdAt -updatedAt', { skip, limit }).lean()
	const total = await Review.countDocuments()
	const pages = Math.ceil(total / limit)
	res.json({ reviews, pages, total, limit, page })
}
export default {
	getReviews: ctrlWrapper(getReviews),
}
