import express from 'express'

import productsController from '../../controllers/products-controller.js'
import { authenticate } from '../../middlewares/index.js'

const productsRouter = express.Router()

productsRouter.use(authenticate)

productsRouter.get('/', productsController.getAllProducts)

export default productsRouter
