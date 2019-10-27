const lang = require('lodash/lang')
const array = require('lodash/array')
const errors = require('../../../utils/errors')
const { codes } = require('../../../codes/entities-codes')
const { validatePatientIsAbleToUnAffiliate } = require('../validatePatientIsAbleToUnAffiliate')
const { validateMedicalInsuranceAndPlan } = require('../../validations/validateMedicalInsuranceAndPlan')

const MEDICAL_INSURANCE = codes.MEDICAL_INSURANCE.name
const PLAN = codes.PLAN.name

const validateUnlinkPatient = async (patientId, body, datetime) => {
  let bodyErrors = [
    errors.getObjectDoesntMatchError(body, 'medicalInsurance.id', id => lang.isNumber(id) && id > 0, MEDICAL_INSURANCE, 'id'),
    errors.getObjectDoesntMatchError(body, 'medicalInsurance.plan.id', id => lang.isNumber(id) && id > 0, PLAN, 'id')
  ]
  bodyErrors = array.compact(bodyErrors)
  if (bodyErrors.length) {
    throw errors.newBadRequestError('error while unlinking patient', bodyErrors)
  }
  await validateMedicalInsuranceAndPlan(body.medicalInsurance.id, body.medicalInsurance.plan.id)
  await validatePatientIsAbleToUnAffiliate(patientId, body.medicalInsurance.plan.id, datetime)
}

module.exports = { validateUnlinkPatient }