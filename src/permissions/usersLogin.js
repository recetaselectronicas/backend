const { MedicalInsuranceRepository } = require('../repositories/medicalInsuranceRepository')
const { AffiliateRepository } = require('../repositories/affiliateRepository')
const { PharmacistRepository } = require('../repositories/pharmacistRepository')
const { DoctorRepository } = require('../repositories/doctorRepository')

module.exports = {
  affiliate: {
    login: AffiliateRepository.login
  },
  medicalInsurance: {
    login: MedicalInsuranceRepository.login
  },
  pharmacist: {
    login: PharmacistRepository.login
  },
  doctor: {
    login: DoctorRepository.login
  }
}
