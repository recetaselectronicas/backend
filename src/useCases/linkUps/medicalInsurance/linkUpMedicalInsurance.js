const { validateLinkUpMedicalInsuranceAffiliate } = require('./validateLinkUpMedicalInsuranceAffiliate')
const { createLinkUpMedicalInsuranceAffiliate } = require('./createLinkUpMedicalInsuranceAffiliate')
const { validateLinkUpDoctor } = require('../doctor/validations/validateLinkUpDoctor')
const { MedicalBookletRepository } = require('../../../repositories/medicalBookletRepository')
const moment = require('moment')

const linkUpMedicalInsurance = async (idMedicalInsurance, body) => {
  if (body.affiliate) {
    await validateLinkUpMedicalInsuranceAffiliate(idMedicalInsurance, body.affiliate)
    await createLinkUpMedicalInsuranceAffiliate(idMedicalInsurance, body.affiliate)
  }
  if (body.doctor) {
    const idDoctor = body.doctor.id
    await validateLinkUpDoctor(idDoctor, { medicalInsurance: { id: idMedicalInsurance } })
    await MedicalBookletRepository.link({
      idMedicalInsurance,
      idDoctor
    }, moment())
  }
}

module.exports = { linkUpMedicalInsurance }