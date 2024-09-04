import { Schema, model } from 'mongoose'
import Joi from 'joi'
import { handleSaveError, preUpdate } from '../hooks/hooks.js'

const productSchema = new Schema(
	{
		photo: {
			type: String,
			// required: true,
		},
		name: {
			type: String,
			required: true,
		},
		suppliers: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		shopId: {
			type: Schema.Types.ObjectId,
			ref: 'shop',	
			required: true,
		}
	},
	{ versionKey: false, timestamps: true }
)

productSchema.post('save', handleSaveError)
productSchema.pre('findByIdAndUpdate', preUpdate)
productSchema.post('findByIdAndUpdate', handleSaveError)

export const productAddSchemaJoi = Joi.object({
	photo: Joi.string().uri().optional(),
	name: Joi.string().required(),
	suppliers: Joi.string().required(),
	stock: Joi.number().required(),
	price: Joi.number().required(),
	category: Joi.string().required(),
})

export const productUpdateSchemaJoi = Joi.object({
	photo: Joi.string().uri().optional(),
	name: Joi.string().optional(),
	suppliers: Joi.string().optional(),
	stock: Joi.number().optional(),
	price: Joi.number().optional(),
	category: Joi.string().optional(),
})

const Product = model('product', productSchema)

export default Product
