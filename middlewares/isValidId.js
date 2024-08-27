import { isValidObjectId } from 'mongoose'
import {HttpError} from '../helpers/index.js'

const isValidId = (req, res, next) => {
  const {clientId} = req.params
  if (!isValidObjectId(clientId)) {
    return next(HttpError(404, `${clientId} is not valid id`))
  }
  next()
}

export default isValidId