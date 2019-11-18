const { PharmacistRequestRepository } = require('../../../../repositories/pharmacistRequestRepository')
const errors = require('../../../../utils/errors')

const validatePharmacistLinkUpRequests = async (pharmacistId, medicalInsuranceId) => {
  const hasPendingRequest = await PharmacistRequestRepository.hasPendingRequest(pharmacistId, medicalInsuranceId)
  if (hasPendingRequest) {
    throw errors.newBadRequestError('El farmaceutico tiene ya una solicitud pendiente con esta obra social')
  }
}

module.exports = { validatePharmacistLinkUpRequests }