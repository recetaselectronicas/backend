/* eslint-disable no-mixed-operators */
const { DoctorCriteria } = require('./doctorCriteria')

class DoctorSpecialtyCriteria extends DoctorCriteria {
  getAttributeValue() {
    // TODO: ver como se va a guardar la especialidad en el medico y dejar solo una implementacion
    return this.prescription.doctor.specialty.description || this.prescription.doctor.specialty
  }

  getAttribute() {
    return 'SPECIALTY'
  }
}

module.exports = { DoctorSpecialtyCriteria }