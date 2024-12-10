import express from 'express'

import productsController from '../../controllers/products-controller.js'
import { authenticate, isValidId } from '../../middlewares/index.js'

const productsRouter = express.Router()
// productsRouter.use(authenticate)

productsRouter.get('/', productsController.getAllProducts)
productsRouter.get('/:productId', isValidId('productId'), productsController.getOneProduct)

export default productsRouter
