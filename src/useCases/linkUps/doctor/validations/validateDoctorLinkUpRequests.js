const { DoctorRequestRepository } = require('../../../../repositories/doctorRequestRepository')
const errors = require('../../../../utils/errors')

const validateDoctorLinkUpRequests = async (doctorId, medicalInsuranceId) => {
  const hasPendingRequest = await DoctorRequestRepository.hasPendingRequest(doctorId, medicalInsuranceId)
  if (hasPendingRequest) {
    throw errors.newBadRequestError('El doctor tiene ya una solicitud pendiente con esta obra social')
  }
}

module.exports = { validateDoctorLinkUpRequests }