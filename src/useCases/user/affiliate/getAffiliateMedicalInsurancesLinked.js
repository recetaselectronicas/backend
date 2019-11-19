const moment = require('moment')
const { AffiliateRepository } = require('../../../repositories/affiliateRepository')
const { MedicalInsurance } = require('../../../domain/medicalInsurance')

const getAffiliateMedicalInsurancesLinked = async (affiliate) => {
  const medicalInsurance = await AffiliateRepository.getCurrentAffiliationWithAllData(affiliate.id, moment())

  return medicalInsurance ? [MedicalInsurance.fromJson({
    ...medicalInsurance,
    plans: [{ id: medicalInsurance.idPlan }]

  })] : []
}

module.exports = { getAffiliateMedicalInsurancesLinked }