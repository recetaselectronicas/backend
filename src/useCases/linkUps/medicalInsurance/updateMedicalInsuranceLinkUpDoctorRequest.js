const { requestStatus } = require('../../../repositories/defaults')
const errors = require('../../../utils/errors')
const { DoctorRequestRepository } = require('../../../repositories/doctorRequestRepository')
const { buildUpdateRequest } = require('../buildUpdateRequest')

const updateMedicalInsuranceLinkUpDoctorRequest = async (user, body) => {
  const request = await DoctorRequestRepository.getRequest(body.id)
  console.debug(request)
  if (!request || request.status !== requestStatus.PENDING) {
    throw errors.newForbiddenResourceException()
  }
  await DoctorRequestRepository.updateStatus(request.id, buildUpdateRequest(body))
}

module.exports = { updateMedicalInsuranceLinkUpDoctorRequest }