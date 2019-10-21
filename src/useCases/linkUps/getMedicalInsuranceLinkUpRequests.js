const { AffiliateRequestRepository } = require('../../repositories/affiliateRequestRepository')

const getMedicalInsuranceLinkUpRequests = async (medicalInsurance) => {
  const affiliateRequests = await AffiliateRequestRepository.getRequestsByMedicalInsurance(medicalInsurance.id)
  const requests = {
    affiliateRequests
  }
  return requests
}

module.exports = { getMedicalInsuranceLinkUpRequests }