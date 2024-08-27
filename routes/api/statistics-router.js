import express from 'express'
import statisticsController from '../../controllers/statistics-controller.js'
import {isValidId} from '../../middlewares/index.js'

const statisticsRouter = express.Router()

statisticsRouter.get('/', statisticsController.getAllStatistics)
statisticsRouter.get('/:clientId/goods', isValidId, statisticsController.getStatOneClient)

export default statisticsRouter
