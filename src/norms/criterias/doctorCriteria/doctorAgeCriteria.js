/* eslint-disable no-mixed-operators */
const moment = require('moment')
const { DoctorCriteria } = require('./doctorCriteria')

class DoctorAgeCriteria extends DoctorCriteria {
  getAttributeValue() {
    return this.prescription.doctor.birthDate && +moment().diff(this.prescription.doctor.birthDate, 'years') || NaN
  }

  getAttribute() {
    return 'AGE'
  }
}

module.exports = { DoctorAgeCriteria }