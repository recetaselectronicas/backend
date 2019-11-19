const moment = require('moment')
const { PharmacistRepository } = require('../../../../repositories/pharmacistRepository')
const { ReceptionRepository } = require('../../../../repositories/receptionRepository')
const errors = require('../../../../utils/errors')

const validatePharmacistIsAbleToLink = async (pharmacistId, medicalInsuranceId) => {
  const pharmacist = await PharmacistRepository.getById(pharmacistId)
  if (!pharmacist) {
    throw errors.newBadRequestError('Este farmaceutico no existe')
  }
  const hasLink = await ReceptionRepository.getLink(pharmacistId, medicalInsuranceId, moment())
  if (hasLink) {
    throw errors.newBadRequestError('El farmaceutico ya pertenece a esta obra social')
  }
}

module.exports = { validatePharmacistIsAbleToLink }