const lang = require('lodash/lang')
const array = require('lodash/array')
const errors = require('../../../utils/errors')
const { codes } = require('../../../codes/entities-codes')
const { validatePatientIsAbleToUnAffiliate } = require('../validatePatientIsAbleToUnAffiliate')
const { validateMedicalInsuranceAndPlan } = require('../../validations/validateMedicalInsuranceAndPlan')

const PATIENT = codes.PATIENT.name
const PLAN = codes.PLAN.name

const validateUnlinkMedicalInsuranceAffiliate = async (medicalInsuranceId, body, datetime) => {
  let bodyErrors = [
    errors.getObjectDoesntMatchError(body, 'patient.id', id => lang.isNumber(id) && id > 0, PATIENT, 'id'),
    errors.getObjectDoesntMatchError(body, 'plan.id', id => lang.isNumber(id) && id > 0, PLAN, 'id')
  ]
  bodyErrors = array.compact(bodyErrors)
  if (bodyErrors.length) {
    throw errors.newBadRequestError('error while unlinking patient', bodyErrors)
  }
  await validateMedicalInsuranceAndPlan(medicalInsuranceId, body.plan.id)
  await validatePatientIsAbleToUnAffiliate(body.patient.id, body.plan.id, datetime)
}

module.exports = { validateUnlinkMedicalInsuranceAffiliate }