/* eslint-disable no-param-reassign */
const lang = require('lodash/lang')
const { AuthorizationVerifier } = require('../authorization/authorizationVerifier')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const { newNotFoundError } = require('../utils/errors')

const issueVerifier = async (req, res, next) => {
  const { logger } = req.app.locals
  const { identifiedUser } = req
  const { body } = req
  const authorizationToken = req.header('x-authorization-token')
  const verificationToken = req.header('x-verification-token')
  try {
    await AuthorizationVerifier.issuePrescription(authorizationToken, verificationToken, body, identifiedUser)
    return next()
  } catch (e) {
    return next(e)
  }
}

const receiveVerifier = async (req, res, next) => {
  const { logger } = req.app.locals
  const { identifiedUser } = req
  const { body } = req
  const authorizationToken = req.header('x-authorization-token')
  const verificationToken = req.header('x-verification-token')
  try {
    if (body.status === 'RECEIVE') {
      const prescription = {
        id: +req.params.id,
        items: lang.cloneDeep(body.data.items)
      }
      prescription.items.forEach((item) => { item.medicine = { id: item.medicine.id } })
      await AuthorizationVerifier.receivePrescription(authorizationToken, verificationToken, prescription, identifiedUser)
    }
    return next()
  } catch (e) {
    return next(e)
  }
}

const viewVerifier = async (req, res, next) => {
  const { identifiedUser } = req
  const authorizationToken = req.header('x-authorization-token')
  let savedPrescription
  try {
    savedPrescription = await PrescriptionRepository.getById(req.params.id)
  } catch (e) {
    return next(e)
  }
  try {
    identifiedUser.checkForbiden(savedPrescription)
  } catch (e) {
    const prescription = {
      id: savedPrescription.id
    }
    try {
      await AuthorizationVerifier.viewPrescription(authorizationToken, prescription, identifiedUser)
    } catch (_) {
      const { query } = req
      if (query && query.affiliate && query.medicalInsurance) {
        if (savedPrescription.affiliate.id === +query.affiliate && savedPrescription.medicalInsurance.id === +query.medicalInsurance) {
          savedPrescription = prescription
        } else {
          return next(newNotFoundError(`No prescription was found with id ${req.params.id}`))
        }
      } else {
        return next(newNotFoundError(`No prescription was found with id ${req.params.id}`))
      }
    }
  }
  req.prescription = savedPrescription
  return next()
}

module.exports = {
  issueVerifier,
  receiveVerifier,
  viewVerifier
}