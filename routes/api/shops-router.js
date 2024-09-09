import express from 'express'
import { authenticate, isValidId } from '../../middlewares/index.js'
import shopsController from '../../controllers/shops-controller.js'

const shopsRouter = express.Router()

shopsRouter.use(authenticate)
shopsRouter.post('/create', shopsController.createShop)
shopsRouter.get('/:shopId',  shopsController.getShopsById)
shopsRouter.put('/:shopId/update',  shopsController.getShopUpdate)

export default shopsRouter
