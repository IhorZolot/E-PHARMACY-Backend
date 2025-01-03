import express from 'express'
import reviewsController from '../../controllers/reviews-controller.js'
import { authenticate } from '../../middlewares/index.js'

const reviewsRouter = express.Router()
reviewsRouter.use(authenticate)

reviewsRouter.get('/', reviewsController.getReviews)

export default reviewsRouter
