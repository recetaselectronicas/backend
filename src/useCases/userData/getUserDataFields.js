const { userTypes } = require('../../permissions/identifiedUser')
const { getPatientDataFields } = require('./patient/getPatientDataFields')
const { getDoctorDataFields } = require('./doctor/getDoctorDataFields')
const { getPharmacistDataFields } = require('./pharmacist/getPharmacistDataFields')
const { getMedicalInsuranceDataFields } = require('./medicalInsurance/getMedicalInsuranceDataFields')
const errors = require('../../utils/errors')

const usersMap = {
  [userTypes.AFFILIATE]: getPatientDataFields,
  [userTypes.DOCTOR]: getDoctorDataFields,
  [userTypes.PHARMACIST]: getPharmacistDataFields,
  [userTypes.MEDICAL_INSURANCE]: getMedicalInsuranceDataFields
}

const getUserDataFields = (user) => {
  if (usersMap[user.type]) {
    return usersMap[user.type](user.id)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { getUserDataFields }