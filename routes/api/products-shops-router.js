import express from 'express'

import productsShopController from '../../controllers/products-shops-controller.js'
import { authenticate, isValidId, upload } from '../../middlewares/index.js'
import { productAddSchemaJoi, productUpdateSchemaJoi } from '../../models/Product.js'
import validateBody from '../../decorators/validateBody.js'

const productsShopsRouter = express.Router()
productsShopsRouter.use(authenticate)

productsShopsRouter.get('/:shopId/product', isValidId('shopId'), productsShopController.getAllProductsShop)
productsShopsRouter.post(
	'/:shopId/product/add',
	isValidId('shopId'),
	validateBody(productAddSchemaJoi),
	productsShopController.addProductShop
)
productsShopsRouter.get(
	'/:shopId/product/:productId',
	isValidId('shopId', 'productId'),
	productsShopController.getOneProductShop
)
productsShopsRouter.put(
	'/:shopId/product/:productId/edit',
	isValidId('shopId', 'productId'),
	upload.single('photo'),
	validateBody(productUpdateSchemaJoi),
	productsShopController.updateProductShop
)
productsShopsRouter.delete(
	'/:shopId/product/:productId/delete',
	isValidId('shopId', 'productId'),
	productsShopController.deleteProductShop
)

export default productsShopsRouter
