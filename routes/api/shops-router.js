import express from 'express'
import { authenticate, isValidId } from '../../middlewares/index.js'
import shopsController from '../../controllers/shops-controller.js'
import validateBody from '../../decorators/validateBody.js'
import { shopAddSchemaJoi, shopUpdateSchemaJoi } from '../../models/Shop.js'

const shopsRouter = express.Router()

shopsRouter.use(authenticate)
shopsRouter.post('/create', validateBody(shopAddSchemaJoi), shopsController.createShop)
shopsRouter.get('/:shopId', isValidId('shopId'), shopsController.getShopsById)
shopsRouter.put(
	'/:shopId/update',
	isValidId('shopId'),
	validateBody(shopUpdateSchemaJoi),
	shopsController.getShopUpdate
)


export default shopsRouter
