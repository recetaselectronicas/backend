const array = require('lodash/array')
const errors = require('../../utils/errors')
const { validateGender } = require('./validateGender')
const { validateEmail } = require('./validateEmail')
const { validateNationality } = require('./validateNationality')
const { validateNicType } = require('./validateNicType')
const { PharmacistRepository } = require('../../repositories/pharmacistRepository')
const { codes } = require('../../codes/entities-codes')

const PHARMACIST = codes.PHARMACIST.name

const validateCreatePharmacist = async (pharmacist) => {
  let errorsArray = [
    validateGender(pharmacist.gender, PHARMACIST),
    validateEmail(pharmacist.email, PHARMACIST),
    validateNationality(pharmacist.nationality, PHARMACIST),
    validateNicType(pharmacist.nicType, PHARMACIST),
    errors.getNotNullError(pharmacist.userName, PHARMACIST, 'userName'),
    errors.getNotNullError(pharmacist.password, PHARMACIST, 'password'),
    errors.getNotNullError(pharmacist.name, PHARMACIST, 'name'),
    errors.getNotNullError(pharmacist.lastName, PHARMACIST, 'lastName'),
    errors.getNotNullError(pharmacist.birthDate, PHARMACIST, 'birthDate'),
    errors.getNotNullError(pharmacist.contactNumber, PHARMACIST, 'contactNumber'),
    errors.getNotNullError(pharmacist.address, PHARMACIST, 'address'),
    errors.getNotNullError(pharmacist.nicNumber, PHARMACIST, 'nicNumber'),
    errors.getNotNullError(pharmacist.matriculation, PHARMACIST, 'matriculation'),
  ]
  errorsArray = array.compact(errorsArray)
  if (errorsArray.length) {
    throw errors.newBadRequestError('there were errors while creating pharmacist', errorsArray)
  }
  const exists = await PharmacistRepository.userNameExists(pharmacist.userName)
  if (exists) {
    throw errors.newDuplicatedValueError('userName allready in use', errors.generateFieldCause(PHARMACIST, 'userName', pharmacist.userName))
  }
  const matriculationExists = await PharmacistRepository.matriculationExists(pharmacist.matriculation)
  if (matriculationExists) {
    throw errors.newDuplicatedValueError('matriculation allready registered', errors.generateFieldCause(PHARMACIST, 'matriculation', pharmacist.matriculation))
  }
}

module.exports = { validateCreatePharmacist }