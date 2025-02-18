import { Schema, model } from 'mongoose'

const policySchema = new Schema({
  text: {
    type: String,
  },
  text2: {
    type: String,
  },
  text3: {
    type: String,
  },
}, { versionKey: false, timestamps: true })

export default model('policy', policySchema)