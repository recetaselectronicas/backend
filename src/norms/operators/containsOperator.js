/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */

const object = require('lodash/object')
const { Operator } = require('./operator')

class ContainsOperator extends Operator {
  doValidate(model) {
    super.doValidate(model)
    if (!model.containedValue) {
      throw new Error('Error while assembling ContainsOperator. No containedValue given')
    }
  }

  doInitialize(model) {
    super.doInitialize(model)
    this.containedValue = model.containedValue.toString()
  }

  satisfies() {
    return this.attributeValue && this.attributeValue.toString().toLowerCase().includes(this.containedValue.toLowerCase()) || false
  }

  getName() {
    return 'CONTAINS'
  }

  getModelToJson() {
    return {
      containedValue: this.containedValue
    }
  }
}

module.exports = { ContainsOperator }