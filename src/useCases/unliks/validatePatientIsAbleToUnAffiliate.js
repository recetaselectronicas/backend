const errors = require('../../utils/errors')
const { AffiliateRepository } = require('../../repositories/affiliateRepository')

const validatePatientIsAbleToUnAffiliate = async (patientId, planId, datetime) => {
  const affiliate = await AffiliateRepository.getCurrentAffiliation(patientId, datetime)
  if (!affiliate || affiliate.plan.id !== planId) {
    throw errors.newBadRequestError('patient is not linked to plan')
  }
}
module.exports = { validatePatientIsAbleToUnAffiliate }