const { MedicalBookletRepository } = require('../../../repositories/medicalBookletRepository')

const getDoctorMedicalInsurancesLinked = doctor => MedicalBookletRepository.getMedicalInsurancesFrom(doctor.id)

module.exports = { getDoctorMedicalInsurancesLinked }