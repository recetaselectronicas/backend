const lang = require('lodash/lang')
const array = require('lodash/array')
const errors = require('../../../../utils/errors')
const { codes } = require('../../../../codes/entities-codes')
const { validateDoctorIsAbleToUnlink } = require('./validateDoctorIsAbleToUnlink')
const { validateMedicalInsuranceExists } = require('../../../validations/validateMedicalInsuranceExists')

const MEDICAL_INSURANCE = codes.MEDICAL_INSURANCE.name

const validateUnlinkDoctor = async (doctorId, body, datetime) => {
  let bodyErrors = [
    errors.getObjectDoesntMatchError(body, 'medicalInsurance.id', id => lang.isNumber(id) && id > 0, MEDICAL_INSURANCE, 'id'),
  ]
  bodyErrors = array.compact(bodyErrors)
  if (bodyErrors.length) {
    throw errors.newBadRequestError('Error mientras se quiere desvincular al medico, parametros invalidos', bodyErrors)
  }
  const { medicalInsurance } = body
  await validateMedicalInsuranceExists(medicalInsurance.id)
  await validateDoctorIsAbleToUnlink(doctorId, medicalInsurance.id, datetime)
}

module.exports = { validateUnlinkDoctor }