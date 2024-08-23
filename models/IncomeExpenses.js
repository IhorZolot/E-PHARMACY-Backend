import { Schema, model } from 'mongoose'

const incomeExpensesSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
)

const IncomeExpenses = model('income-expenses', incomeExpensesSchema)
export default IncomeExpenses
