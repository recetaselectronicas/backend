/* eslint-disable no-unused-vars */

const object = require('lodash/object')
const { Predicate } = require('../predicates/predicate')

// Clase base para todos los operadores =, >, <, isNull, etc
class Operator extends Predicate {
  doValidate(model) {
    if (!object.has(model, 'attributeValue')) {
      throw new Error('Error while assembling Operator. No attributeValue given')
    }
  }

  doInitialize(model) {
    this.loadAttributeValue(model.attributeValue)
  }

  loadAttributeValue(attributeValue) {
    this.attributeValue = attributeValue
  }

  toJson() {
    return {
      operator: this.getName(),
      ...this.getModelToJson()
    }
  }

  getName() {
    throw new Error('Template method. Please override!')
  }

  getModelToJson() {
    throw new Error('Template method. Please override!')
  }
}

module.exports = { Operator }