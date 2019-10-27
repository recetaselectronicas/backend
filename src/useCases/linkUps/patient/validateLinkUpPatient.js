const lang = require('lodash/lang')
const array = require('lodash/array')
const errors = require('../../../utils/errors')
const { codes } = require('../../../codes/entities-codes')
const { validateMedicalInsuranceAndPlan } = require('../../validations/validateMedicalInsuranceAndPlan')
const { validateAffiliateCredential } = require('../validateAffiliateCredential')
const { validatePatientIsAbleToAffiliate } = require('../validatePatientIsAbleToAffiliate')
const { validatePatientLinkUpRequests } = require('../validatePatientLinkUpRequests.js')

const AFFILIATE = codes.AFFILIATE.name
const MEDICAL_INSURANCE = codes.MEDICAL_INSURANCE.name
const PLAN = codes.PLAN.name

const validateLinkUpPatient = async (patientId, body) => {
  let bodyErrors = [
    errors.getNotNullError(body.code, AFFILIATE, 'code'),
    errors.getNotNullError(body.category, AFFILIATE, 'category'),
    errors.getNotNullError(body.imageCredential, AFFILIATE, 'imageCredential'),
    errors.getObjectDoesntMatchError(body, 'medicalInsurance.id', id => lang.isNumber(id) && id > 0, MEDICAL_INSURANCE, 'id'),
    errors.getObjectDoesntMatchError(body, 'medicalInsurance.plan.id', id => lang.isNumber(id) && id > 0, PLAN, 'id')
  ]
  bodyErrors = array.compact(bodyErrors)
  if (bodyErrors.length) {
    throw errors.newBadRequestError('error while linking-up patient', bodyErrors)
  }
  await validateMedicalInsuranceAndPlan(body.medicalInsurance.id, body.medicalInsurance.plan.id)
  await validateAffiliateCredential(body.code, body.category)
  await validatePatientIsAbleToAffiliate(patientId)
  await validatePatientLinkUpRequests(patientId)
}

module.exports = { validateLinkUpPatient }