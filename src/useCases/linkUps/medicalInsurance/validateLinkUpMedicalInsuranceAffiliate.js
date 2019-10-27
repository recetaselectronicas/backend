const lang = require('lodash/lang')
const array = require('lodash/array')
const errors = require('../../../utils/errors')
const { codes } = require('../../../codes/entities-codes')
const { validateMedicalInsuranceAndPlan } = require('../validateMedicalInsuranceAndPlan')
const { validatePatientIsAbleToAffiliate } = require('../validatePatientIsAbleToAffiliate')
const { validatePatientLinkUpRequests } = require('../validatePatientLinkUpRequests.js')

const AFFILIATE = codes.AFFILIATE.name
const PATIENT = codes.PATIENT.name
const PLAN = codes.PLAN.name

const validateLinkUpMedicalInsuranceAffiliate = async (medicalInsuranceId, body) => {
  let bodyErrors = [
    errors.getNotNullError(body.code, AFFILIATE, 'code'),
    errors.getNotNullError(body.category, AFFILIATE, 'category'),
    errors.getNotNullError(body.imageCredential, AFFILIATE, 'imageCredential'),
    errors.getObjectDoesntMatchError(body, 'patient.id', id => lang.isNumber(id) && id > 0, PATIENT, 'id'),
    errors.getObjectDoesntMatchError(body, 'plan.id', id => lang.isNumber(id) && id > 0, PLAN, 'id')
  ]
  bodyErrors = array.compact(bodyErrors)
  if (bodyErrors.length) {
    throw errors.newBadRequestError('error while linking-up medicalInsurance with patient', bodyErrors)
  }
  await validateMedicalInsuranceAndPlan(medicalInsuranceId, body.plan.id)
  await validatePatientIsAbleToAffiliate(body.patient.id)
  await validatePatientLinkUpRequests(body.patient.id)
}

module.exports = { validateLinkUpMedicalInsuranceAffiliate }