const array = require('lodash/array')
const errors = require('../../utils/errors')
const { validateGender } = require('./validateGender')
const { validateEmail } = require('./validateEmail')
const { validateNationality } = require('./validateNationality')
const { validateNicType } = require('./validateNicType')
const { PatientRepository } = require('../../repositories/patientRepository')
const { codes } = require('../../codes/entities-codes')

const PATIENT = codes.PATIENT.name

const validateCreatePatient = async (patient) => {
  let errorsArray = [
    validateGender(patient.gender, PATIENT),
    validateEmail(patient.email, PATIENT),
    validateNationality(patient.nationality, PATIENT),
    validateNicType(patient.nicType, PATIENT),
    errors.getNotNullError(patient.userName, PATIENT, 'userName'),
    errors.getNotNullError(patient.password, PATIENT, 'password'),
    errors.getNotNullError(patient.name, PATIENT, 'name'),
    errors.getNotNullError(patient.surname, PATIENT, 'surname'),
    errors.getNotNullError(patient.birthDate, PATIENT, 'birthDate'),
    errors.getNotNullError(patient.contactNumber, PATIENT, 'contactNumber'),
    errors.getNotNullError(patient.address, PATIENT, 'address'),
    errors.getNotNullError(patient.nicNumber, PATIENT, 'nicNumber'),
  ]
  errorsArray = array.compact(errorsArray)
  if (errorsArray.length) {
    throw errors.newBadRequestError('there were errors while creating patient', errorsArray)
  }
  const exists = await PatientRepository.userNameExists(patient.userName)
  if (exists) {
    throw errors.newDuplicatedValueError('userName allready in use', errors.generateFieldCause(PATIENT, 'userName', patient.userName))
  }
}

module.exports = { validateCreatePatient }