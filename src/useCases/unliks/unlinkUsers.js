const { userTypes } = require('../../permissions/identifiedUser')
const { unlinkPatient } = require('./patient/unlinkPatient')
const errors = require('../../utils/errors')
const { unlinkMedicalInsurance } = require('./medicalInsurance/unlinkMedicalInsurance')
const { unlinkDoctor } = require('./doctor/unlinkDoctor')
const { unlinkPharmacist } = require('./pharmacist/unlinkPharmacist')

const unlinkMap = {
  [userTypes.AFFILIATE]: unlinkPatient,
  [userTypes.MEDICAL_INSURANCE]: unlinkMedicalInsurance,
  [userTypes.DOCTOR]: unlinkDoctor,
  [userTypes.PHARMACIST]: unlinkPharmacist,
}
const unlinkUsers = async (user, body) => {
  if (unlinkMap[user.type]) {
    return unlinkMap[user.type](user.id, body)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { unlinkUsers }