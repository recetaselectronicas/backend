const { requestStatus } = require('../../../repositories/defaults')
const errors = require('../../../utils/errors')
const { DoctorRequestRepository } = require('../../../repositories/doctorRequestRepository')
const { buildUpdateRequest } = require('../buildUpdateRequest')

const updateDoctorLinkUpRequest = async (doctor, body) => {
  if (body.status !== requestStatus.CANCELLED) {
    throw errors.newInvalidValueError('invalid status given')
  }

  const request = await DoctorRequestRepository.getRequest(body.id)
  if (!request || request.idDoctor !== doctor.id) {
    throw errors.newForbiddenResourceException()
  }
  if (request.status !== requestStatus.PENDING) {
    throw errors.newInvalidValueError('invalid request status')
  }
  return DoctorRequestRepository.updateStatus(body.id, buildUpdateRequest(body))
}

module.exports = { updateDoctorLinkUpRequest }