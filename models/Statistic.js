import { Schema, model } from 'mongoose'
import { handleSaveError } from '../hooks/hooks.js'
const statisticSchema = new Schema(
	{
		Product: {
			required: true,
		},
		clientId: {
			type: Schema.Types.ObjectId,
			ref: 'Client',
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
)

statisticSchema.post('save', handleSaveError)
export default model('statistic', statisticSchema)
