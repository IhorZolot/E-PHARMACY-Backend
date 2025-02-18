import { model, Schema } from 'mongoose'

const publicSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  text2: {
    type: String,
    required: true,
  },
  text3: {
    type: String,
    required: true,
  },
}, { versionKey: false, timestamps: true })

export default model('public', publicSchema)
 