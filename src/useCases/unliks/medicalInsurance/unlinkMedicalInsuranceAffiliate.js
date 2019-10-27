const { AffiliateRepository } = require('../../../repositories/affiliateRepository')

const unlinkMedicalInsuranceAffiliate = async (patientId, datetime) => {
  const affiliate = await AffiliateRepository.getCurrentAffiliation(patientId, datetime)
  await AffiliateRepository.unAffiliate(affiliate.id, datetime)
}

module.exports = { unlinkMedicalInsuranceAffiliate }