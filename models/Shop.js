import { Schema, model } from 'mongoose'
import Joi from 'joi'
import { handleSaveError, preUpdate } from '../hooks/hooks.js'

const shopSchema = new Schema(
	{
		shop: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			// match: /^\d{10}$/,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		postal: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		}
	},
	{ versionKey: false, timestamps: true }
)

shopSchema.post('save', handleSaveError)
shopSchema.pre('findByIdAndUpdate', preUpdate)
shopSchema.post('findByIdAndUpdate', handleSaveError)

export const shopAddSchemaJoi = Joi.object({
	shop: Joi.string().required(),
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	address: Joi.string().required(),
	city: Joi.string().required(),
	postal: Joi.string().required(),
	country: Joi.string().required(),
	password: Joi.string().required(),
})

export const shopUpdateSchemaJoi = Joi.object({
	shop: Joi.string().optional(),
	name: Joi.string().optional(),
	email: Joi.string().optional(),
	phone: Joi.string().optional(),
	address: Joi.string().optional(),
	city: Joi.string().optional(),
	postal: Joi.string().optional(),
	country: Joi.string().optional(),
	password: Joi.string().optional(),
})

export default model('shop', shopSchema)
