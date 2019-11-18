const { requestStatus } = require('../../../repositories/defaults')
const errors = require('../../../utils/errors')
const { PharmacistRequestRepository } = require('../../../repositories/pharmacistRequestRepository')
const { buildUpdateRequest } = require('../buildUpdateRequest')

const updatePharmacistLinkUpRequest = async (pharmacist, body) => {
  if (body.status !== requestStatus.CANCELLED) {
    throw errors.newInvalidValueError('Ya se encuentra cancelada esta vinculación')
  }

  const request = await PharmacistRequestRepository.getRequest(body.id)
  if (!request || request.idPharmacist !== pharmacist.id) {
    throw errors.newForbiddenResourceException()
  }
  if (request.status !== requestStatus.PENDING) {
    throw errors.newInvalidValueError('invalid request status')
  }
  return PharmacistRequestRepository.updateStatus(body.id, buildUpdateRequest(body))
}

module.exports = { updatePharmacistLinkUpRequest }