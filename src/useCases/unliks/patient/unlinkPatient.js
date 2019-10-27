const moment = require('moment')
const { validateUnlinkPatient } = require('./validateUnlinkPatient')
const { AffiliateRepository } = require('../../../repositories/affiliateRepository')

const unlinkPatientAffiliation = async (patientId, datetime) => {
  const affiliate = await AffiliateRepository.getCurrentAffiliation(patientId, datetime)
  await AffiliateRepository.unAffiliate(affiliate.id, datetime)
}

const unlinkPatient = async (patientId, body) => {
  const datetime = moment()
  await validateUnlinkPatient(patientId, body, datetime)
  await unlinkPatientAffiliation(patientId, datetime)
}

module.exports = { unlinkPatient }