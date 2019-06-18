const { PrescriptionCriteria } = require('./prescriptionCriteria')

class PrescriptionDiagnosisCriteria extends PrescriptionCriteria {
  getAttributeValue() {
    return this.prescription.diagnosis
  }

  getAttribute() {
    return 'DIAGNOSIS'
  }
}

module.exports = { PrescriptionDiagnosisCriteria }