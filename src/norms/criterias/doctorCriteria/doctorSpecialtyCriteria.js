/* eslint-disable no-mixed-operators */
const { DoctorCriteria } = require('./doctorCriteria')

class DoctorSpecialtyCriteria extends DoctorCriteria {
  getAttributeValue() {
    // TODO: ver como se va a guardar la especialidad en el medico y dejar solo una implementacion
    if (this.prescription.doctor.id) {
      return this.prescription.doctor.specialty.description || this.prescription.doctor.specialty
    }
    return ''
  }

  getAttribute() {
    return 'SPECIALTY'
  }
}

module.exports = { DoctorSpecialtyCriteria }