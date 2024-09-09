import express from 'express'
import authController from '../../controllers/auth-controller.js'
import {validateBody} from '../../decorators/index.js'
import { userSigninSchema, userSignupSchema } from '../../models/User.js'

const authRouter = express.Router()

authRouter.post('/register', validateBody(userSignupSchema), authController.signup )
authRouter.post('/login', validateBody(userSigninSchema), authController.signin )

export default authRouter