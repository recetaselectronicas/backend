/* eslint-disable no-unused-vars */

const object = require('lodash/object')
const { Operator } = require('./operator')

class InOperator extends Operator {
  doValidate(model) {
    super.doValidate(model)
    if (!model.posibleValues || !(model.posibleValues instanceof Array)) {
      throw new Error('Error while assembling InOperator. No posibleValues given or not an Array.')
    }
  }

  doInitialize(model) {
    super.doInitialize(model)
    this.posibleValues = model.posibleValues
  }

  satisfies() {
    return !!this.posibleValues.find(posibleValue => posibleValue === this.attributeValue)
  }

  getName() {
    return 'IN'
  }

  getModelToJson() {
    return {
      posibleValues: this.posibleValues
    }
  }
}

module.exports = { InOperator }