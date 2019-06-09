const { MedicalInsurance } = require('../domain/medicalInsurance')
const {newEntityAlreadyCreated} = require('../utils/errors')

class MedicalInsuranceRepository {
  constructor() {
    this.medicalInsurances = []
  }

  create(_medicalInsurance) {
    return new Promise((resolve, reject) => {
      const medicalInsurance = MedicalInsurance.fromObject(_medicalInsurance)
      if (medicalInsurance.id) {
        return reject(newEntityAlreadyCreated('Medical Insurance allready created'))
      }
      medicalInsurance.id = Math.floor(Math.random() * 10000)
      this.medicalInsurances.push(medicalInsurance)
      return resolve(medicalInsurance)
    })
  }

  getAll() {
    return new Promise((resolve, reject) => {
      return resolve([...this.medicalInsurances])
    })
  }
  getMedicalInsuranceByMedic(doctorId) {
    return new Promise((resolve, reject) => {
      return resolve([...this.medicalInsurances])
    })
  }
}

module.exports = {
  MedicalInsuranceRepository: new MedicalInsuranceRepository()
}
