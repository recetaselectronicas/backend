const { DoctorCriteria } = require('./doctorCriteria')

class DoctorNationalityCriteria extends DoctorCriteria {
  getAttributeValue() {
    return this.prescription.doctor.nationality
  }

  getAttribute() {
    return 'NATIONALITY'
  }
}

module.exports = { DoctorNationalityCriteria }