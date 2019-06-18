/* eslint-disable no-unused-vars */

const { ExistsAtLeastQuantifier } = require('../quantifiers/existsAtLeastQuantifier')
const { ExistsExactlyQuantifier } = require('../quantifiers/existsExactlyQuantifier')
const { ExistsAtMostQuantifier } = require('../quantifiers/existsAtMostQuantifier')
const { ForAllQuantifier } = require('../quantifiers/forAllQuantifier')

const QUANTIFIER_METADATA = {
  EXISTS_AT_LEAST: json => new ExistsAtLeastQuantifier(),
  EXISTS_EXACTLY: json => new ExistsExactlyQuantifier(),
  EXISTS_AT_MOST: json => new ExistsAtMostQuantifier(),
  FOR_ALL: json => new ForAllQuantifier()
}

module.exports = { QUANTIFIER_METADATA }