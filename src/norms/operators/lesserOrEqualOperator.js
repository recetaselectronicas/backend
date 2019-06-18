/* eslint-disable no-unused-vars */

const object = require('lodash/object')
const { Operator } = require('./operator')

class LesserOrEqualOperator extends Operator {
  doValidate(model) {
    super.doValidate(model)
    if (!object.has(model, 'expectedValue')) {
      throw new Error('Error while assembling LesserOrEqualOperator. No expectedValue given')
    }
  }

  doInitialize(model) {
    super.doInitialize(model)
    this.expectedValue = model.expectedValue
  }

  satisfies() {
    return this.attributeValue <= this.expectedValue
  }

  getName() {
    return 'LESSER_OR_EQUAL'
  }

  getModelToJson() {
    return {
      expectedValue: this.expectedValue
    }
  }
}

module.exports = { LesserOrEqualOperator }