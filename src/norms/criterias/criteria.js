const { Predicate } = require('../predicates/predicate')
const { Operator } = require('../operators/operator')
const { Prescription } = require('../../domain/prescription')

// Clase base para los criterios
class Criteria extends Predicate {
  doValidate(model) {
    if (!model.prescription || !(model.prescription instanceof Prescription)) {
      throw new Error('Error while assembling Criteria. No prescription given or not a Prescription.')
    }
    if (!model.operator || !(model.operator instanceof Operator)) {
      throw new Error('Error while assembling Criteria. No operator given or not an Operator')
    }
  }

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

  satisfies() {
    return this.operator.satisfies()
  }

  toJson() {
    return {
      type: 'CRITERIA',
      entity: this.getEntity(),
      attribute: this.getAttribute(),
      ...this.operator.toJson()
    }
  }

  getEntity() {
    throw new Error('Template method. Please override!')
  }

  getAttribute() {
    throw new Error('Template method. Please override!')
  }
}

module.exports = { Criteria }