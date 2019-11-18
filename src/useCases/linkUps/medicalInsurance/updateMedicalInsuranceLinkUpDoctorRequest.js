const moment = require('moment')
const { requestStatus } = require('../../../repositories/defaults')
const errors = require('../../../utils/errors')
const { DoctorRequestRepository } = require('../../../repositories/doctorRequestRepository')
const { MedicalBookletRepository } = require('../../../repositories/medicalBookletRepository')
const { buildUpdateRequest } = require('../buildUpdateRequest')


const updateMedicalInsuranceLinkUpDoctorRequest = async (user, body) => {
  const request = await DoctorRequestRepository.getRequest(body.id)
  if (!request || request.status !== requestStatus.PENDING) {
    throw errors.newForbiddenResourceException()
  }
  await DoctorRequestRepository.updateStatus(request.id, buildUpdateRequest(body))
  if (body.status === requestStatus.ACCEPTED) {
    const medicalBooklet = {
      idMedicalInsurance: request.idMedicalInsurance,
      idDoctor: request.idDoctor
    }
    await MedicalBookletRepository.link(medicalBooklet, moment())
  }
}

module.exports = { updateMedicalInsuranceLinkUpDoctorRequest }