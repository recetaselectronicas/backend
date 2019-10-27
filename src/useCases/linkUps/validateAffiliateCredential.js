const errors = require('../../utils/errors')
const { AffiliateRepository } = require('../../repositories/affiliateRepository')

const validateAffiliateCredential = async (code, category) => {
  const exists = await AffiliateRepository.credentialExists(code, category)
  if (exists) {
    throw errors.newBadRequestError('credential all ready registered')
  }
}

module.exports = { validateAffiliateCredential }