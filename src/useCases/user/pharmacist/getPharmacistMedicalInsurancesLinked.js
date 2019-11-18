const { PharmacistRepository } = require('../../../repositories/pharmacistRepository')

const getPharmacistMedicalInsurancesLinked = pharmacist => PharmacistRepository.getMedicalInsurancesFrom(pharmacist.id)

module.exports = { getPharmacistMedicalInsurancesLinked }