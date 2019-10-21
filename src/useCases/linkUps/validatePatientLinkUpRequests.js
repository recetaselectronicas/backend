const { AffiliateRequestRepository } = require('../../repositories/affiliateRequestRepository')
const errors = require('../../utils/errors')

const validatePatientLinkUpRequests = async (patientId) => {
  const hasPendingRequest = await AffiliateRequestRepository.hasPendingRequest(patientId)
  if (hasPendingRequest) {
    throw errors.newBadRequestError('patient has pending link-up requests')
  }
}

module.exports = { validatePatientLinkUpRequests }