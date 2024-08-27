import { Schema, model } from 'mongoose'

const customerSchema = new Schema(
	{
		image: {
			type: String,
			// required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		spent: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		register_date: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
)

export default model('customer', customerSchema)
