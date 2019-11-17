const { userTypes } = require('../../permissions/identifiedUser')
const { updatePatientLinkUpRequest } = require('./patient/updatePatientLinkUpRequest')
const { updateMedicalInsuranceLinkUpRequest } = require('./medicalInsurance/updateMedicalInsuranceLinkUpRequest')
const { updateDoctorLinkUpRequest } = require('./doctor/updateDoctorLinkUpRequest')
const errors = require('../../utils/errors')

const linkUpRequestMap = {
  [userTypes.AFFILIATE]: updatePatientLinkUpRequest,
  [userTypes.MEDICAL_INSURANCE]: updateMedicalInsuranceLinkUpRequest,
  [userTypes.DOCTOR]: updateDoctorLinkUpRequest,
}

const updateUserLinkUpRequest = (user, body) => {
  if (linkUpRequestMap[user.type]) {
    return linkUpRequestMap[user.type](user, body)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { updateUserLinkUpRequest }