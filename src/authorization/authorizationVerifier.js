const jwt = require('jsonwebtoken')
const lang = require('lodash/lang')
const utils = require('./utils')
const { isBusinessError, newForbiddenResourceException } = require('../utils/errors')
const { logger } = require('../utils/utils')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')

const privateKey = utils.getPrivateKey()

class AuthorizationVerifier {
  async issuePrescription(authorizationToken, verificationToken, prescription, identifiedUser) {
    try {
      const authorization = jwt.verify(authorizationToken, privateKey, { subject: utils.getAffiliateSubject(prescription.affiliate), audience: utils.getDoctorAudience(identifiedUser) })
      const verification = jwt.verify(verificationToken, privateKey, { subject: utils.getDoctorSubject(identifiedUser), audience: utils.getDoctorAudience(identifiedUser) })
      if (!lang.isEqual(prescription, authorization.prescription) || !lang.isEqual(prescription, verification.prescription)) {
        throw newForbiddenResourceException('prescription data has change')
      }
    } catch (e) {
      if (!isBusinessError(e)) {
        logger.error(e)
        throw newForbiddenResourceException('invalid authorization given')
      }
      throw e
    }
  }

  async receivePrescription(authorizationToken, verificationToken, prescription, identifiedUser) {
    try {
      const savedPrescription = await PrescriptionRepository.getById(prescription.id)
      const authorization = jwt.verify(authorizationToken, privateKey, { subject: utils.getAffiliateSubject(savedPrescription.affiliate), audience: utils.getPharmacistAudience(identifiedUser) })
      const verification = jwt.verify(verificationToken, privateKey, { subject: utils.getPharmacistAudience(identifiedUser), audience: utils.getPharmacistAudience(identifiedUser) })
      if (prescription.id !== authorization.prescription.id || !lang.isEqual(prescription, verification.prescription)) {
        throw newForbiddenResourceException('prescription data has change')
      }
    } catch (e) {
      if (!isBusinessError(e)) {
        logger.error(e)
        throw newForbiddenResourceException('invalid authorization given')
      }
      throw e
    }
  }

  async viewPrescription(authorizationToken, prescription, identifiedUser) {
    try {
      const savedPrescription = await PrescriptionRepository.getById(prescription.id)
      const authorization = jwt.verify(authorizationToken, privateKey, { subject: utils.getAffiliateSubject(savedPrescription.affiliate), audience: utils.getPharmacistAudience(identifiedUser) })
      if (prescription.id !== authorization.prescription.id) {
        throw newForbiddenResourceException('prescription data has change')
      }
    } catch (e) {
      if (!isBusinessError(e)) {
        logger.error(e)
        throw newForbiddenResourceException('invalid authorization given')
      }
      throw e
    }
  }
}

module.exports = { AuthorizationVerifier: new AuthorizationVerifier() }