const errors = require('../../../../utils/errors')
const { MedicalBookletRepository } = require('../../../../repositories/medicalBookletRepository')

const validateDoctorIsAbleToUnlink = async (doctorId, medicalInsuranceId, datetime) => {
  const hasLink = await MedicalBookletRepository.getLink(doctorId, medicalInsuranceId, datetime)
  if (!hasLink) {
    throw errors.newBadRequestError('El doctor NO pertenece a esta obra social')
  }
}
module.exports = { validateDoctorIsAbleToUnlink }