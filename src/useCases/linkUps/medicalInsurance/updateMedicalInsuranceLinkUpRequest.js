const { requestStatus } = require('../../../repositories/defaults')
const { userTypes } = require('../../../permissions/identifiedUser')
const errors = require('../../../utils/errors')
const { updateMedicalInsuranceLinkUpAffiliateRequest } = require('./updateMedicalInsuranceLinkUpAffiliateRequest')

const availableStatus = [requestStatus.ACCEPTED, requestStatus.DECLINED]

const updateMedicalInsuranceLinkUpMap = {
  [userTypes.AFFILIATE]: updateMedicalInsuranceLinkUpAffiliateRequest,
}

const updateMedicalInsuranceLinkUpRequest = async (user, body) => {
  if (!availableStatus.includes(body.status)) {
    throw errors.newInvalidValueError('invalid status given')
  }
  if (!updateMedicalInsuranceLinkUpMap[body.type]) {
    throw errors.newInvalidValueError('invalid type given')
  }
  await updateMedicalInsuranceLinkUpMap[body.type](user, body)
}

module.exports = { updateMedicalInsuranceLinkUpRequest }