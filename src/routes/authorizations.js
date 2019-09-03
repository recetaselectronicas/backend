/* eslint-disable no-param-reassign */
const express = require('express')

const router = express.Router()
const { Prescription } = require('../domain/prescription')
const { newBadRequestError, isBusinessError, newForbiddenResourceException } = require('../utils/errors')
const { authorizationActionTypes, userTypes, authenticationTypes } = require('../permissions/identifiedUser')
const { AuthorizationProvider } = require('../authorization/authorizationProvider')
const { SessionRepository } = require('../repositories/sessionRepository')
const { AffiliateRepository } = require('../repositories/affiliateRepository')

const authorizationHandler = {
  [authorizationActionTypes.ISSUE_PRESCRIPTION]: async (identifiedUser, authentication, prescription) => {
    authentication.id = identifiedUser.id
    return AuthorizationProvider.issuePrescription(identifiedUser, authentication, prescription)
  },
  [authorizationActionTypes.AUTHORIZE_ISSUE_PRESCRIPTION]: async (identifiedUser, authentication, prescription) => {
    const affiliate = await AffiliateRepository.getById(prescription.affiliate.id)
    authentication.id = affiliate.idPatient
    return AuthorizationProvider.allowIssuePrescription(affiliate, identifiedUser, authentication, prescription)
  },
  [authorizationActionTypes.RECEIVE_PRESCRIPTION]: () => {},
  [authorizationActionTypes.AUTHORIZE_RECEIVE_PRESCRIPTION]: () => {}
}

router.post('/', async (req, res, next) => {
  const { logger } = req.app.locals
  const { identifiedUser } = req
  const { body } = req
  const { action, authentication } = body
  const { prescription } = req.body
  try {
    if (!authorizationHandler[action]) {
      throw newBadRequestError('Wrong action given')
    }
    const authorization = await authorizationHandler[action](identifiedUser, authentication, prescription)
    return res.json({ authorization })
  } catch (e) {
    return next(e)
  }
})

module.exports = router
