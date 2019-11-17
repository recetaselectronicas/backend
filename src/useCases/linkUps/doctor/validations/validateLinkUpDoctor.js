const lang = require('lodash/lang')
const array = require('lodash/array')
const errors = require('../../../../utils/errors')
const { codes } = require('../../../../codes/entities-codes')
const { validateMedicalInsuranceExists } = require('../../../validations/validateMedicalInsuranceExists')
const { validateDoctorIsAbleToLink } = require('./validateDoctorIsAbleToLink')
const { validateDoctorLinkUpRequests } = require('./validateDoctorLinkUpRequests')

const MEDICAL_INSURANCE = codes.MEDICAL_INSURANCE.name

const validateLinkUpDoctor = async (doctorId, body) => {
  let bodyErrors = [
    errors.getObjectDoesntMatchError(body, 'medicalInsurance.id', id => lang.isNumber(id) && id > 0, MEDICAL_INSURANCE, 'id'),
  ]
  bodyErrors = array.compact(bodyErrors)
  if (bodyErrors.length) {
    throw errors.newBadRequestError('error while linking-up doctor', bodyErrors)
  }
  const { medicalInsurance } = body
  await validateMedicalInsuranceExists(medicalInsurance.id)
  await validateDoctorIsAbleToLink(doctorId, medicalInsurance.id)
  await validateDoctorLinkUpRequests(doctorId, medicalInsurance.id)
}

module.exports = { validateLinkUpDoctor }
