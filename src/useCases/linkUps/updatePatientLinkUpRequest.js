const { requestStatus } = require('../../repositories/defaults')
const errors = require('../../utils/errors')
const { AffiliateRequestRepository } = require('../../repositories/affiliateRequestRepository')

const updatePatientLinkUpRequest = async (patient, body) => {
  if (body.status !== requestStatus.CANCELLED) {
    throw errors.newInvalidValueError('invalid status given')
  }
  const request = await AffiliateRequestRepository.getRequest(body.id)
  if (!request || request.idPatient !== patient.id) {
    throw errors.newForbiddenResourceException()
  }
  if (request.status !== requestStatus.PENDING) {
    throw errors.newInvalidValueError('invalid request status')
  }
  const update = {
    status: body.status,
    reason: body.reason
  }
  return AffiliateRequestRepository.updateStatus(body.id, update)
}

module.exports = { updatePatientLinkUpRequest }