/* eslint-disable no-unused-vars */

const { EqualOperator } = require('../operators/equalOperator')
const { GreaterOperator } = require('../operators/greaterOperator')
const { LesserOperator } = require('../operators/lesserOperator')
const { GreaterOrEqualOperator } = require('../operators/greaterOrEqualOperator')
const { LesserOrEqualOperator } = require('../operators/lesserOrEqualOperator')
const { DistinctOperator } = require('../operators/distinctOperator')
const { InOperator } = require('../operators/inOperator')
const { ContainsOperator } = require('../operators/containsOperator')
const { IsNullOperator } = require('../operators/isNullOperator')
const { IsNotNullOperator } = require('../operators/isNotNullOperator')

const OPERATOR_METADATA = {
  EQUAL: json => new EqualOperator(),
  GREATER: json => new GreaterOperator(),
  LESSER: json => new LesserOperator(),
  GREATER_OR_EQUAL: json => new GreaterOrEqualOperator(),
  LESSER_OR_EQUAL: json => new LesserOrEqualOperator(),
  DISTINCT: json => new DistinctOperator(),
  IN: json => new InOperator(),
  CONTAINS: json => new ContainsOperator(),
  IS_NULL: json => new IsNullOperator(),
  IS_NOT_NULL: json => new IsNotNullOperator()
}

module.exports = { OPERATOR_METADATA }