const moment = require('moment')
const { requestStatus } = require('../../../repositories/defaults')
const errors = require('../../../utils/errors')
const { PharmacistRequestRepository } = require('../../../repositories/pharmacistRequestRepository')
const { ReceptionRepository } = require('../../../repositories/receptionRepository')
const { buildUpdateRequest } = require('../buildUpdateRequest')


const updateMedicalInsuranceLinkUpPharmacistRequest = async (user, body) => {
  const request = await PharmacistRequestRepository.getRequest(body.id)
  if (!request || request.status !== requestStatus.PENDING) {
    throw errors.newBadRequestError("El pedido no se encuentra en un estado valido")
  }
  await PharmacistRequestRepository.updateStatus(request.id, buildUpdateRequest(body))
  if (body.status === requestStatus.ACCEPTED) {
    const data = {
      idMedicalInsurance: request.idMedicalInsurance,
      idPharmacist: request.idPharmacist
    }
    await ReceptionRepository.link(data, moment())
  }
}

module.exports = { updateMedicalInsuranceLinkUpPharmacistRequest }