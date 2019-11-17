const { AffiliateRequestRepository } = require('../../../repositories/affiliateRequestRepository')
const { DoctorRequestRepository } = require('../../../repositories/doctorRequestRepository')

const getMedicalInsuranceLinkUpRequests = async (medicalInsurance) => {
  const affiliateRequests = await AffiliateRequestRepository.getRequestsByMedicalInsurance(medicalInsurance.id)
  const doctorRequests = await DoctorRequestRepository.getRequestsByMedicalInsurance(medicalInsurance.id)
  const requests = {
    affiliateRequests,
    doctorRequests
  }
  return requests
}

module.exports = { getMedicalInsuranceLinkUpRequests }