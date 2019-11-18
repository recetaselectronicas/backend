const { AffiliateRequestRepository } = require('../../../repositories/affiliateRequestRepository')
const { DoctorRequestRepository } = require('../../../repositories/doctorRequestRepository')
const { PharmacistRequestRepository } = require('../../../repositories/pharmacistRequestRepository')

const getMedicalInsuranceLinkUpRequests = async (medicalInsurance) => {
  const affiliateRequests = await AffiliateRequestRepository.getRequestsByMedicalInsurance(medicalInsurance.id)
  const doctorRequests = await DoctorRequestRepository.getRequestsByMedicalInsurance(medicalInsurance.id)
  const pharmacistRequests = await PharmacistRequestRepository.getRequestsByMedicalInsurance(medicalInsurance.id)
  const requests = {
    affiliateRequests,
    doctorRequests,
    pharmacistRequests
  }
  return requests
}

module.exports = { getMedicalInsuranceLinkUpRequests }