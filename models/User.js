import { Schema, model } from 'mongoose'
import Joi from 'joi'

import { handleSaveError, preUpdate } from '../hooks/hooks.js'
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneRegexp = /^\+?\d{1,4}?[-.\s]?(\(?\d{1,3}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    phone: {
      type: String, 
      match: phoneRegexp, 
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 3,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
)
userSchema.post('save', handleSaveError)
userSchema.pre('findByIdAndUpdate', preUpdate)
userSchema.post('findByIdAndUpdate', handleSaveError)

export const userSignupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  password: Joi.string().min(3).required(),
})

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(3).required(),
})

const User = model('user', userSchema)

export default User