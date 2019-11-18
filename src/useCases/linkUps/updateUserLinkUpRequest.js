const { userTypes } = require('../../permissions/identifiedUser')
const { updatePatientLinkUpRequest } = require('./patient/updatePatientLinkUpRequest')
const { updateMedicalInsuranceLinkUpRequest } = require('./medicalInsurance/updateMedicalInsuranceLinkUpRequest')
const { updateDoctorLinkUpRequest } = require('./doctor/updateDoctorLinkUpRequest')
const { updatePharmacistLinkUpRequest } = require('./pharmacist/updatePharmacistLinkUpRequest')
const errors = require('../../utils/errors')

const linkUpRequestMap = {
  [userTypes.AFFILIATE]: updatePatientLinkUpRequest,
  [userTypes.MEDICAL_INSURANCE]: updateMedicalInsuranceLinkUpRequest,
  [userTypes.DOCTOR]: updateDoctorLinkUpRequest,
  [userTypes.PHARMACIST]: updatePharmacistLinkUpRequest,
}

const updateUserLinkUpRequest = (user, body) => {
  if (linkUpRequestMap[user.type]) {
    return linkUpRequestMap[user.type](user, body)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { updateUserLinkUpRequest }