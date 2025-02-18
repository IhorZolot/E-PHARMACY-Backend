import express from 'express'

import policyPublicController from '../../controllers/policy-public-controller.js'
const policyPublicRouter = express.Router()

policyPublicRouter.get('/privacy-policy', policyPublicController.getPrivacyPolicy)
policyPublicRouter.get('/terms-and-conditions', policyPublicController.getTermsAndConditions)

export default policyPublicRouter