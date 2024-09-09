import express from 'express'
import authController from '../../controllers/auth-controller.js'
import {validateBody} from '../../decorators/index.js'
import { userSigninSchema, userSignupSchema } from '../../models/User.js'
import {authenticate} from '../../middlewares/index.js'

const authRouter = express.Router()

authRouter.post('/register', validateBody(userSignupSchema), authController.signup )
authRouter.post('/login', validateBody(userSigninSchema), authController.signin )
authRouter.get('/user-info' ,authenticate, authController.userInfo )
authRouter.post('/logout',authenticate, authController.logout )

export default authRouter