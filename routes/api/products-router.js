import express from 'express'

const productsRouter = express.Router()

productsRouter.get('/:shopId/product', )
productsRouter.post('/:shopId/product/add', )
productsRouter.get('/:shopId/product/:productId', )
productsRouter.put('/:shopId/product/:productId/edit', )
productsRouter.delete('/:shopId/product/:productId/delete', )

export default productsRouter
