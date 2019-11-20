const { validateLinkUpMedicalInsuranceAffiliate } = require('./validateLinkUpMedicalInsuranceAffiliate')
const { createLinkUpMedicalInsuranceAffiliate } = require('./createLinkUpMedicalInsuranceAffiliate')
const { validateLinkUpDoctor } = require('../doctor/validations/validateLinkUpDoctor')
const { validateLinkUpPharmacist } = require('../pharmacist/validations/validateLinkUpPharmacist')
const { MedicalBookletRepository } = require('../../../repositories/medicalBookletRepository')
const { ReceptionRepository } = require('../../../repositories/receptionRepository')
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

  if (body.pharmacist) {
    const idPharmacist = body.pharmacist.id
    await validateLinkUpPharmacist(idPharmacist, { medicalInsurance: { id: idMedicalInsurance } })
    await ReceptionRepository.link({
      idMedicalInsurance,
      idPharmacist
    }, moment())
  }
}

module.exports = { linkUpMedicalInsurance }