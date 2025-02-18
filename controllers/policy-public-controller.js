import { ctrlWrapper } from '../decorators/index.js'
import Policy from '../models/Policy.js'
import Public from '../models/Public.js'

const getPrivacyPolicy = async (req, res) => {
  const result = await Policy.find({}, "-createdAt -updatedAt")
	res.json(result)
}
const getTermsAndConditions = async (req, res) => {
  const result = await Public.find({}, "-createdAt -updatedAt")
	res.json(result)
}

export default {
	getPrivacyPolicy: ctrlWrapper(getPrivacyPolicy),
	getTermsAndConditions: ctrlWrapper(getTermsAndConditions),
}