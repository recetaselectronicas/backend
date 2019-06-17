/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

const { getFunctions } = require('./utils')
const { Prescription } = require('../../domain/prescription')

const types = {
  RULE: null,
  CONECTOR: null,
  QUANTIFIER: null,
  CRITERIA: null,
  OPERATOR: null,
}

// Se generan las funciones que cargan los diferentes tipos y se las bindean
// a la constante types
const { loadPredicate, loadPredicates, loadAntecedentAndConsequent } = getFunctions(types)

// El motivo de los exports acá es para poder desde todos los metadata acceder
// a estas funiones loadPredicate, loadPredicates y loadAntecedentAndConsequent que
// relacionana los metadata entre si
exports.types = types
exports.loadPredicate = loadPredicate
exports.loadPredicates = loadPredicates
exports.loadAntecedentAndConsequent = loadAntecedentAndConsequent

const { EXECUTABLE_METADATA } = require('./executableMetadata')
const { CONECTOR_METADATA } = require('./conectorsMetadata')
const { CRITERIA_METADATA } = require('./criteriasMetadata')
const { OPERATOR_METADATA } = require('./operatorsMetadata')
const { QUANTIFIER_METADATA } = require('./quantifiersMetadata')

types.EXECUTABLE = EXECUTABLE_METADATA
types.CONECTOR = CONECTOR_METADATA
types.QUANTIFIER = QUANTIFIER_METADATA
types.CRITERIA = CRITERIA_METADATA
types.OPERATOR = OPERATOR_METADATA

const generateRuleFromJson = (prescription, jsonRule) => {
  types.CRITERIA.getActualPrescription = () => prescription
  return types.EXECUTABLE.loadPredicate(jsonRule)
}

const generateJsonFromRule = rule => rule.toJson()

const generateNormFromJson = (prescription, status, jsonNorm) => {
  types.CRITERIA.getActualPrescription = () => prescription
  types.EXECUTABLE.getActualStatus = () => status
  return types.EXECUTABLE.loadPredicate(jsonNorm)
}

const generateJsonFromNorm = norm => norm.toJson()

exports.generateJsonFromRule = generateJsonFromRule
exports.generateRuleFromJson = generateRuleFromJson
exports.generateJsonFromNorm = generateJsonFromNorm
exports.generateNormFromJson = generateNormFromJson