const moment = require('moment')
const { unlinkMedicalInsuranceAffiliate } = require('./unlinkMedicalInsuranceAffiliate')
const { validateUnlinkMedicalInsuranceAffiliate } = require('./validateUnlinkMedicalInsuranceAffiliate')

const unlinkMedicalInsurance = async (medicalInsuranceId, body) => {
  const datetime = moment()
  if (body.affiliate) {
    await validateUnlinkMedicalInsuranceAffiliate(medicalInsuranceId, body.affiliate, datetime)
    await unlinkMedicalInsuranceAffiliate(body.affiliate.patient.id, datetime)
  }
}

module.exports = { unlinkMedicalInsurance }