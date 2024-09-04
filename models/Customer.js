import { Schema, model } from 'mongoose'

const register_dateRegex = /^\d{4}$/

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
			// match: register_dateRegex,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
)

export default model('customer', customerSchema)
