const { AffiliateRepository } = require('../../../repositories/affiliateRepository')

const createLinkUpMedicalInsuranceAffiliate = async (medicalInsuranceId, body) => {
  const affiliate = {
    idPatient: body.patient.id,
    idPlan: body.plan.id,
    code: body.code,
    category: body.category,
    imageCredential: body.imageCredential
  }
  return AffiliateRepository.create(affiliate)
}

module.exports = { createLinkUpMedicalInsuranceAffiliate }