import express from 'express'
import statisticsController from '../../controllers/statistics-controller.js'
import { authenticate, isValidId } from '../../middlewares/index.js'

const statisticsRouter = express.Router()
statisticsRouter.use(authenticate)

statisticsRouter.get('/', statisticsController.getAllStatistics)
statisticsRouter.get('/:clientId/goods', isValidId('clientId'), statisticsController.getStatOneClient)

export default statisticsRouter
