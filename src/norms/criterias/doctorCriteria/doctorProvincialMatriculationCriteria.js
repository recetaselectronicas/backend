const { DoctorCriteria } = require('./doctorCriteria')

class DoctorProvincialMatriculationCriteria extends DoctorCriteria {
  getAttributeValue() {
    return this.prescription.doctor.provincialMatriculation
  }

  getAttribute() {
    return 'PROVINCIAL_MATRICULATION'
  }
}

module.exports = { DoctorProvincialMatriculationCriteria }