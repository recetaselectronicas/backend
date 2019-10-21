const { userTypes } = require('../../permissions/identifiedUser')
const { getPatientLinkUpRequests } = require('./getPatientLinkUpRequests')
const { getMedicalInsuranceLinkUpRequests } = require('./getMedicalInsuranceLinkUpRequests')
const errors = require('../../utils/errors')

const linkUpRequestMap = {
  [userTypes.AFFILIATE]: getPatientLinkUpRequests,
  [userTypes.MEDICAL_INSURANCE]: getMedicalInsuranceLinkUpRequests
}

const getUserLinkUpRequests = (user) => {
  if (linkUpRequestMap[user.type]) {
    return linkUpRequestMap[user.type](user)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { getUserLinkUpRequests }