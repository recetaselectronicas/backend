const moment = require('moment')
const { DoctorRepository } = require('../../../../repositories/doctorRepository')
const { MedicalBookletRepository } = require('../../../../repositories/medicalBookletRepository')
const errors = require('../../../../utils/errors')

const validateDoctorIsAbleToLink = async (doctorId, medicalInsuranceId) => {
  const doctor = await DoctorRepository.getById(doctorId)
  if (!doctor) {
    throw errors.newBadRequestError('Este doctor no existe')
  }
  const hasLink = await MedicalBookletRepository.getLink(doctorId, medicalInsuranceId, moment())
  if (hasLink) {
    throw errors.newBadRequestError('El doctor ya pertenece a esta obra social')
  }
}

module.exports = { validateDoctorIsAbleToLink }