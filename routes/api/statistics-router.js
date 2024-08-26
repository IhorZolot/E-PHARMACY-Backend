import express from 'express'
import statisticsController from '../../controllers/statistics-controller.js'

const statisticsRouter = express.Router()

statisticsRouter.get('/', statisticsController.getAllStatistics)
statisticsRouter.get('/:id', statisticsController.getStatOneClient)

export default statisticsRouter
