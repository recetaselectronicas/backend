const { AffiliateRequestRepository } = require('../../repositories/affiliateRequestRepository')

const createLinkUpPatientRequest = async (patientId, body) => {
  const affiliateRequest = {
    idPlan: body.medicalInsurance.plan.id,
    idPatient: patientId,
    code: body.code,
    category: body.category,
    imageCredential: body.imageCredential
  }
  return AffiliateRequestRepository.create(affiliateRequest)
}

module.exports = { createLinkUpPatientRequest }