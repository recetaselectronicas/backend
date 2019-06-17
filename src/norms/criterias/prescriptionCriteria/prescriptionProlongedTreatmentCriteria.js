const { PrescriptionCriteria } = require('./prescriptionCriteria')

// Criterio Prescription.prolongedTreatment
// Satisface cuando el operador que contiene satisface
// Es el criterio que solo valida el tratamiento prolongado
class PrescriptionProlongedTreatmentCriteria extends PrescriptionCriteria {
  getAttributeValue() {
    return this.prescription.prolongedTreatment
  }

  getAttribute() {
    return 'PROLONGED_TREATMENT'
  }
}

module.exports = { PrescriptionProlongedTreatmentCriteria }