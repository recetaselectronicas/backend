const { AffiliateRequestRepository } = require('../../../repositories/affiliateRequestRepository')

const getPatientLinkUpRequests = (patient) => {
  return AffiliateRequestRepository.getRequests(patient.id)
}

module.exports = { getPatientLinkUpRequests }