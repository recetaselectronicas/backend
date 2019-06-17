/* eslint-disable no-unused-vars */

const { EqualOperator } = require('../operators/equalOperator')

const OPERATOR_METADATA = {
  EQUAL: json => new EqualOperator(),
  GREATER: {},
  LESSER: {},
  GREATER_OR_EQUAL: {},
  LESSER_OR_EQUAL: {},
  DISTINCT: {},
  IN: {},
  CONTAINS: {}
}

module.exports = { OPERATOR_METADATA }