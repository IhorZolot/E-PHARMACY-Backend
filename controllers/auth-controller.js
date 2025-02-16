import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import { HttpError } from '../helpers/index.js'
import { ctrlWrapper } from '../decorators/index.js'
import { token } from 'morgan'
import Shop from '../models/Shop.js'
const {JWT_SECRET} = process.env

const signup = async (req, res) => {
  const { email, password, phone } = req.body
  const user = await User.findOne({ email })
  if ( user) {
    throw HttpError(409, 'Email already in use')
  }
  if (!email || !password || !phone)  {
		return res.status(400).json({ error: 'All fields must be filled' })
	}
  const hashPassword = await bcryptjs.hash(password, 10)
  const newUser = await User.create({...req.body, password:hashPassword})
  res.status(201).json({ 
      username: newUser.username,
      email: newUser.email
  })
}
const signin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw HttpError(401, 'Email or password is wrong')
  }
  const passwordCompare = await bcryptjs.compare(password, user.password)
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong')
  }
  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '48d' })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({ token })
}
const userInfo = async (req, res) => {
  const { email, username, _id } = req.user

  const shop = await Shop.findOne({ owner: _id });

  res.json({
    email,
    username,
    shopId: shop ? shop._id : null,
  })
}

const logout = async (req, res) => {
  const {_id} = req.user
  await User.findByIdAndUpdate(_id, {token: ''})
  res.json({message: 'User logged out'})
}


export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  userInfo: ctrlWrapper(userInfo),
  logout: ctrlWrapper(logout),
}