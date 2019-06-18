/* eslint-disable no-unused-vars */

const object = require('lodash/object')
const { Operator } = require('./operator')

class LesserOperator extends Operator {
  doValidate(model) {
    super.doValidate(model)
    if (!object.has(model, 'expectedValue')) {
      throw new Error('Error while assembling LesserOperator. No expectedValue given')
    }
  }

  doInitialize(model) {
    super.doInitialize(model)
    this.expectedValue = model.expectedValue
  }

  satisfies() {
    return this.attributeValue < this.expectedValue
  }

  getName() {
    return 'LESSER'
  }

  getModelToJson() {
    return {
      expectedValue: this.expectedValue
    }
  }
}

module.exports = { LesserOperator }