const { MedicalInsuranceRepository } = require('../../repositories/medicalInsuranceRepository')

// Hago la llamada al repositorio por que si no existe el mismo tira una excepcion
const validateMedicalInsuranceExists = medicalInsuranceId => MedicalInsuranceRepository.getById(medicalInsuranceId)

module.exports = { validateMedicalInsuranceExists }