const { ReceptionRepository } = require('../../../repositories/receptionRepository')

const getPharmacistMedicalInsurancesLinked = pharmacist => ReceptionRepository.getMedicalInsurancesFrom(pharmacist.id)

module.exports = { getPharmacistMedicalInsurancesLinked }