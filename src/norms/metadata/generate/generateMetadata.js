const { CONECTOR_METADATA } = require('./conectorGenerateMetadata')
const { CRITERIA_METADATA } = require('./criteriaGenerateMetadata')
const { OPERATOR_BY_TYPE, OPERATOR_METADATA } = require('./operatorGenerateMetadata')
const { QUANTIFIER_METADATA } = require('./quantifierGenerateMetadata')

const RULE_METADATA = {
  conectors: CONECTOR_METADATA,
  criterias: CRITERIA_METADATA,
  operators: OPERATOR_METADATA,
  operatorsByType: OPERATOR_BY_TYPE,
  quantifiers: QUANTIFIER_METADATA
}

module.exports = { RULE_METADATA }