/* eslint-disable no-mixed-operators */
const moment = require('moment')
const { DoctorCriteria } = require('./doctorCriteria')

class DoctorAgeCriteria extends DoctorCriteria {
  getAttributeValue() {
    return this.prescription.doctor.birthDate && +this.prescription.doctor.birthDate.diff(moment(), 'years') || NaN
  }

  getAttribute() {
    return 'AGE'
  }
}

module.exports = { DoctorAgeCriteria }