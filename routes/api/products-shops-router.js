import express from 'express'

import productsShopController from '../../controllers/products-shops-controller.js'

const productsShopsRouter = express.Router()

productsShopsRouter.get('/:shopId/product', productsShopController.getAllProductsShop )
productsShopsRouter.post('/:shopId/product/add', productsShopController.addProductShop) 
productsShopsRouter.get('/:shopId/product/:productId', productsShopController.getOneProductShop) 
productsShopsRouter.put('/:shopId/product/:productId/edit', productsShopController.updateProductShop) 
productsShopsRouter.delete('/:shopId/product/:productId/delete', productsShopController.deleteProductShop) 

export default productsShopsRouter
