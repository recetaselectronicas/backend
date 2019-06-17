/* eslint-disable no-unused-vars */

const object = require('lodash/object')
const { Operator } = require('./operator')

// Clase que representa una operacion de igualdad
// Satisface cuando el valor que se recibió y el esperado son
// iguales en tipo y valor
class EqualOperator extends Operator {
  doValidate(model) {
    super.doValidate(model)
    if (!object.has(model, 'expectedValue')) {
      throw new Error('Error while assembling EqualOperator. No expectedValue given')
    }
  }

  doInitialize(model) {
    super.doInitialize(model)
    this.expectedValue = model.expectedValue
  }

  satisfies() {
    return this.attributeValue === this.expectedValue
  }

  getName() {
    return 'EQUAL'
  }

  getModelToJson() {
    return {
      expectedValue: this.expectedValue
    }
  }
}

module.exports = { EqualOperator }