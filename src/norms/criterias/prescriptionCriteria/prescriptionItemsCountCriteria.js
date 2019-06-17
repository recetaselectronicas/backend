const { PrescriptionCriteria } = require('./prescriptionCriteria')

// Criterio Prescription.itemsCount
// Satisface cuando el operador que contiene satisface
// Es el criterio que solo valida la cantidad de items en la receta
class PrescriptionItemsCountCriteria extends PrescriptionCriteria {
  getAttributeValue() {
    return this.prescription.items.length
  }

  getAttribute() {
    return 'ITEMS_COUNT'
  }
}

module.exports = { PrescriptionItemsCountCriteria }