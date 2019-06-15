const { Predicate } = require('../predicates/predicate')
const { Operator } = require('../operators/operator')
const { Prescription } = require('../../domain/prescription')

// Clase base para los criterios
class Criteria extends Predicate {
  // Se valida que el modelo tenga una prescription
  // Se valida que el modelo tenga un operador
  doValidate(model) {
    if (!model.prescription || !(model.prescription instanceof Prescription)) {
      throw new Error('Error while assembling Criteria. No prescription given or not a Prescription.')
    }
    if (!model.operator || !(model.operator instanceof Operator)) {
      throw new Error('Error while assembling Criteria. No operator given or not an Operator')
    }
  }

  // Se guarda la prescription y el operador
  doInitialize(model) {
    this.prescription = model.prescription
    this.operator = model.operator
    // Se inizializa el operador y se valida su modelo
    this.operator.initialize(this.getOperatorModel(model))
  }

  // El modelo para el operador tiene que tener
  // el valor del atributo que va a chequear (ej true, 1, "string")
  // y alternativamente cero, uno o mas valores contra los que comparar (ej true, [1, 2, 4], o nada)
  getOperatorModel(model) {
    return {
      ...model,
      attributeValue: this.getAttributeValue()
    }
  }

  getAttributeValue() {
    throw new Error('Template method. Please override!')
  }

  // Satisface cuando satisface el operador
  satisfies() {
    return this.operator.satisfies()
  }
}

// Clase base para todos los criterios que sean de receta especificamente
// Satisfacen cuando satisface el operador
class PrescriptionCriteria extends Criteria {}

// Criterio Prescription.prolongedTreatment
// Satisface cuando el operador que contiene satisface
// Es el criterio que solo valida el tratamiento prolongado
class PrescriptionProlongedTreatmentCriteria extends PrescriptionCriteria {
  // Devuelve el valor del atributo
  // Este valor podría no coincidir con un atributo real de la receta (ej itemsCount)
  getAttributeValue() {
    return this.prescription.prolongedTreatment
  }
}

// Criterio Prescription.itemsCount
// Satisface cuando el operador que contiene satisface
// Es el criterio que solo valida la cantidad de items en la receta
class PrescriptionItemsCount extends PrescriptionCriteria {
  getAttributeValue() {
    return this.prescription.items.length
  }
}

module.exports = {
  Criteria,
  PrescriptionProlongedTreatmentCriteria,
  PrescriptionItemsCount
}