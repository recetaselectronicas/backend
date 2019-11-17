const lang = require('lodash/lang')
const array = require('lodash/array')
const errors = require('../../utils/errors')
const { validateGender } = require('./validateGender')
const { validateEmail } = require('./validateEmail')
const { validateNationality } = require('./validateNationality')
const { validateNicType } = require('./validateNicType')
const { DoctorRepository } = require('../../repositories/doctorRepository')
const { UserRepository } = require('../../repositories/userRepository')
const { codes } = require('../../codes/entities-codes')

const DOCTOR = codes.DOCTOR.name
const SPECIALTY = codes.SPECIALTY.name

const validateCreateDoctor = async (doctor) => {
  let errorsArray = [
    validateGender(doctor.gender, DOCTOR),
    validateEmail(doctor.email, DOCTOR),
    validateNationality(doctor.nationality, DOCTOR),
    validateNicType(doctor.nicType, DOCTOR),
    errors.getNotNullError(doctor.userName, DOCTOR, 'userName'),
    errors.getNotNullError(doctor.password, DOCTOR, 'password'),
    errors.getNotNullError(doctor.name, DOCTOR, 'name'),
    errors.getNotNullError(doctor.lastName, DOCTOR, 'lastName'),
    errors.getNotNullError(doctor.birthDate, DOCTOR, 'birthDate'),
    errors.getNotNullError(doctor.contactNumber, DOCTOR, 'contactNumber'),
    errors.getNotNullError(doctor.address, DOCTOR, 'address'),
    errors.getNotNullError(doctor.nicNumber, DOCTOR, 'nicNumber'),
    errors.getNotNullError(doctor.nationalMatriculation, DOCTOR, 'nationalMatriculation'),
    errors.getObjectDoesntMatchError(doctor, 'specialty.id', id => lang.isNumber(id) && id > 0, SPECIALTY, 'id'),
  ]
  errorsArray = array.compact(errorsArray)
  if (errorsArray.length) {
    throw errors.newBadRequestError('there were errors while creating doctor', errorsArray)
  }
  const exists = await DoctorRepository.userNameExists(doctor.userName)
  if (exists) {
    throw errors.newDuplicatedValueError('userName allready in use', errors.generateFieldCause(DOCTOR, 'userName', doctor.userName))
  }
  const nicTypeAndNumberExists = await UserRepository.nicNumberAndTypeExists(doctor.nicNumber, doctor.nicType)
  if (nicTypeAndNumberExists) {
    throw errors.newDuplicatedValueError('nicNumber allready registered', errors.generateFieldCause(DOCTOR, 'nicNumber', doctor.nicNumber))
  }
  const matriculationsExists = await DoctorRepository.nationalMatriculationExists(doctor.nationalMatriculation, doctor.provincialMatriculation)
  if (matriculationsExists) {
    throw errors.newDuplicatedValueError('national matriculation allready registered', errors.generateFieldCause(DOCTOR, 'nationalMatriculation', doctor.nationalMatriculation))
  }
  const specialtyExists = await DoctorRepository.specialtyExists(doctor.specialty.id)
  if (!specialtyExists) {
    throw errors.newInvalidValueError('specialty does not exists')
  }
}

module.exports = { validateCreateDoctor }