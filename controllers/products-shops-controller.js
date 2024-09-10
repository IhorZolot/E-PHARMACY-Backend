import mongoose from 'mongoose';
import fs from 'fs/promises'
import path from 'path'

import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'

import Shop from '../models/Shop.js'
import Product, {productAddSchemaJoi} from '../models/Product.js'
const productImagePath = path.resolve('public', 'productImg')

const getAllProductsShop = async (req, res) => {
  const { shopId } = req.params
  if(!shopId) {
    throw HttpError(404, `Shop with id:${shopId} not found`)
}
if (!mongoose.Types.ObjectId.isValid(shopId)) {
  throw HttpError(400, 'Invalid shop ID');
}
const shop = await Shop.findById(shopId).lean();
  if (!shop) {
    throw HttpError(404, `Shop with ID: ${shopId} not found`);
  }
  const products = await Product.find({ shopId }).lean();

  res.json({ shop, products });
}
const addProductShop = async (req, res) => {
  const { shopId } = req.params
  const {path: oldPath, filename} = req.file
  await fs.rename(oldPath, path.join(productImagePath, filename))
  const photo= path.join('productImg', filename)
  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    throw HttpError(400, 'Invalid shop ID');
  }
  const shop = await Shop.findById(shopId);
  if (!shop) {
    throw HttpError(404, `Shop with ID: ${shopId} not found`);
  }
  const { error } = productAddSchemaJoi.validate(req.body);
  if (error) {
    throw HttpError(400, error.details[0].message);
  }
  const newProduct = await Product.create({ ...req.body, photo, shopId });
 
  res.status(201).json(newProduct);

}
const getOneProductShop = async (req, res) => {
  const { shopId, productId } = req.params
  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    throw HttpError(400, 'Invalid shop ID');
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw HttpError(400, 'Invalid product ID');
  }
  const shop = await Shop.findById(shopId).lean();
  if (!shop) {
    throw HttpError(404, `Shop with ID: ${shopId} not found`);
  }
  const product = await Product.findById(productId).lean();
  if (!product) {
    throw HttpError(404, `Product with ID: ${productId} not found`);
  }
  res.json({ shop, product });
}
const updateProductShop = async (req, res) => {
  const { shopId, productId } = req.params
  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    throw HttpError(400, 'Invalid shop ID');
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw HttpError(400, 'Invalid product ID');
  }
  const shop = await Shop.findById(shopId).lean();
  if (!shop) {
    throw HttpError(404, `Shop with ID: ${shopId} not found`);
  }
  const product = await Product.findById(productId).lean();
  if (!product) {
    throw HttpError(404, `Product with ID: ${productId} not found`);
  }
  await Product.findByIdAndUpdate(productId, req.body, { new: true });
  res.json({ shop, product });

}
const deleteProductShop = async (req, res) => {
  const { shopId, productId } = req.params
  if (!mongoose.Types.ObjectId.isValid(shopId)) {
    throw HttpError(400, 'Invalid shop ID');
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw HttpError(400, 'Invalid product ID');
  }
  const shop = await Shop.findById(shopId).lean();
  if (!shop) {
    throw HttpError(404, `Shop with ID: ${shopId} not found`);
  }
  const product = await Product.findById(productId).lean();
  if (!product) {
    throw HttpError(404, `Product with ID: ${productId} not found`);
  }
  await Product.findByIdAndDelete(productId);
  res.json({ shop, product, message: 'Product deleted' });

}



export default {
  getAllProductsShop: ctrlWrapper(getAllProductsShop),
  addProductShop: ctrlWrapper(addProductShop),
  getOneProductShop: ctrlWrapper(getOneProductShop),
  updateProductShop: ctrlWrapper(updateProductShop),
  deleteProductShop: ctrlWrapper(deleteProductShop),

}

