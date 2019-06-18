/* eslint-disable no-unused-vars */

const object = require('lodash/object')
const { Operator } = require('./operator')

// Clase que representa una operacion de desigualdad
// Satisface cuando el valor que se recibió y el esperado son
// distintos ya sea en tipo o valor
class DistinctOperator extends Operator {
  doValidate(model) {
    super.doValidate(model)
    if (!object.has(model, 'expectedValue')) {
      throw new Error('Error while assembling DistinctOperator. No expectedValue given')
    }
  }

  doInitialize(model) {
    super.doInitialize(model)
    this.expectedValue = model.expectedValue
  }

  satisfies() {
    return this.attributeValue !== this.expectedValue
  }

  getName() {
    return 'DISTINCT'
  }

  getModelToJson() {
    return {
      expectedValue: this.expectedValue
    }
  }
}

module.exports = { DistinctOperator }