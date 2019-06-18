const { DoctorCriteria } = require('./doctorCriteria')

class DoctorNationalMatriculationCriteria extends DoctorCriteria {
  getAttributeValue() {
    return this.prescription.doctor.nationalMatriculation
  }

  getAttribute() {
    return 'NATIONAL_MATRICULATION'
  }
}

module.exports = { DoctorNationalMatriculationCriteria }