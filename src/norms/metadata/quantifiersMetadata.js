/* eslint-disable no-unused-vars */

const { ExistsAtLeastQuantifier } = require('../quantifiers/existsAtLeastQuantifier')
const { ForAllQuantifier } = require('../quantifiers/forAllQuantifier')

const QUANTIFIER_METADATA = {
  EXISTS_AT_LEAST: json => new ExistsAtLeastQuantifier(),
  EXISTS_EXACTLY: {},
  EXISTS_AT_MOST: {},
  FOR_ALL: json => new ForAllQuantifier()
}

module.exports = { QUANTIFIER_METADATA }