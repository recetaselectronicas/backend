/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */

const { Operator } = require('./operator')

class IsNullOperator extends Operator {
  satisfies() {
    return this.attributeValue === null || this.attributeValue === undefined
  }

  getName() {
    return 'IS_NULL'
  }

  getModelToJson() {
    return {}
  }
}

module.exports = { IsNullOperator }