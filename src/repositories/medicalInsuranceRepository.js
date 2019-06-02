class MedicalInsuranceRepository {
  constructor() {
    this.medicalInsurances = []
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
