const errors = require('../../utils/errors')
const { AffiliateRepository } = require('../../repositories/affiliateRepository')

const validateAffiliateCredential = async (code, category) => {
  const exists = await AffiliateRepository.credentialExists(code, category)
  if (exists) {
    throw errors.newBadRequestError('La credencial ya se encuentra registrada')
  }
}

module.exports = { validateAffiliateCredential }