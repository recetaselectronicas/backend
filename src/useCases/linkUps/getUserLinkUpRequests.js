const { userTypes } = require('../../permissions/identifiedUser')
const { getPatientLinkUpRequests } = require('./patient/getPatientLinkUpRequests')
const { getMedicalInsuranceLinkUpRequests } = require('./medicalInsurance/getMedicalInsuranceLinkUpRequests')
const { getDoctorLinkUpRequests } = require('./doctor/getDoctorLinkUpRequests')
const { getPharmacistLinkUpRequests } = require('./pharmacist/getPharmacistLinkUpRequests')
const errors = require('../../utils/errors')

const linkUpRequestMap = {
  [userTypes.AFFILIATE]: getPatientLinkUpRequests,
  [userTypes.MEDICAL_INSURANCE]: getMedicalInsuranceLinkUpRequests,
  [userTypes.DOCTOR]: getDoctorLinkUpRequests,
  [userTypes.PHARMACIST]: getPharmacistLinkUpRequests
}

const getUserLinkUpRequests = (user) => {
  if (linkUpRequestMap[user.type]) {
    return linkUpRequestMap[user.type](user)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { getUserLinkUpRequests }