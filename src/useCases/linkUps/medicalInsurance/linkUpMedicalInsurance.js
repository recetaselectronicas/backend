const { validateLinkUpMedicalInsuranceAffiliate } = require('./validateLinkUpMedicalInsuranceAffiliate')
const { createLinkUpMedicalInsuranceAffiliate } = require('./createLinkUpMedicalInsuranceAffiliate')

const linkUpMedicalInsurance = async (medicalInsuranceId, body) => {
  if (body.affiliate) {
    await validateLinkUpMedicalInsuranceAffiliate(medicalInsuranceId, body.affiliate)
    await createLinkUpMedicalInsuranceAffiliate(medicalInsuranceId, body.affiliate)
  }
}

module.exports = { linkUpMedicalInsurance }