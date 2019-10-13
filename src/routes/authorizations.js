/* eslint-disable no-param-reassign */
const express = require('express')

const router = express.Router()
const { newBadRequestError } = require('../utils/errors')
const { authorizationActionTypes } = require('../permissions/identifiedUser')
const { AuthorizationProvider } = require('../authorization/authorizationProvider')
const { AffiliateRepository } = require('../repositories/affiliateRepository')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')

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
  [authorizationActionTypes.RECEIVE_PRESCRIPTION]: async (identifiedUser, authentication, prescription) => {
    authentication.id = identifiedUser.id
    prescription.items.forEach((item) => { item.medicine = { id: item.medicine.id } })
    return AuthorizationProvider.receivePrescription(identifiedUser, authentication, prescription)
  },
  [authorizationActionTypes.AUTHORIZE_RECEIVE_PRESCRIPTION]: async (identifiedUser, authentication, prescription) => {
    const savedPrescription = await PrescriptionRepository.getById(prescription.id)
    const affiliate = await AffiliateRepository.getById(savedPrescription.affiliate.id)
    authentication.id = affiliate.idPatient
    prescription = { id: prescription.id }
    return AuthorizationProvider.allowReceivePrescription(affiliate, identifiedUser, authentication, prescription)
  }
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
