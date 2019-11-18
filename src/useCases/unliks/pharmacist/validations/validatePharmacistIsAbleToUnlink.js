const errors = require('../../../../utils/errors')
const { ReceptionRepository } = require('../../../../repositories/receptionRepository')

const validatePharmacistIsAbleToUnlink = async (pharmacistId, medicalInsuranceId, datetime) => {
  const hasLink = await ReceptionRepository.getLink(pharmacistId, medicalInsuranceId, datetime)
  if (!hasLink) {
    throw errors.newBadRequestError('El farmaceutico NO pertenece a esta obra social')
  }
}
module.exports = { validatePharmacistIsAbleToUnlink }