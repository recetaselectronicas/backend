/* eslint-disable no-restricted-globals */

const object = require('lodash/object')
const lang = require('lodash/lang')
const { Quantifier } = require('./quantifier')

// Clase base para los cuantificadores de existencia EXISTS_AT_LEAST y EXIST_EXACTLY
class ExistsQuantifier extends Quantifier {
  doValidate(model) {
    super.doValidate(model)
    if (!object.has(model, 'quantity') || !lang.isNumber(model.quantity)) {
      throw new Error('Error while assembling ExistsQuantifier. No quantity given or not a Number.')
    }
    if (isNaN(model.quantity)) {
      throw new Error('Error while assembling ExistsQuantifier. Quantity given is NaN')
    }
  }

  doInitialize(model) {
    super.doInitialize(model)
    this.quantity = model.quantity
  }

  toJson() {
    return {
      ...super.toJson(),
      quantity: this.quantity
    }
  }
}

module.exports = { ExistsQuantifier }