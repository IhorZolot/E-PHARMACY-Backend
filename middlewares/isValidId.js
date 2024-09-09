import { isValidObjectId } from 'mongoose'
import {HttpError} from '../helpers/index.js'

const isValidId =(paramName) => (req, res, next) => {
  const id = req.params[paramName];
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `${id} is not valid id`))
  }
  next()
}

export default isValidId