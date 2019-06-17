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
const { loadPredicate, loadPredicates } = getFunctions(types)

// El motivo de los exports acá es porder desde todos los metadata poder accede
// a estas funiones loadPredicate y loadPredicates que relacionana los metadata
// entre si
exports.types = types
exports.loadPredicate = loadPredicate
exports.loadPredicates = loadPredicates

const { RULE_METADATA } = require('./rulesMetadata')
const { CONECTOR_METADATA } = require('./conectorsMetadata')
const { CRITERIA_METADATA } = require('./criteriasMetadata')
const { OPERATOR_METADATA } = require('./operatorsMetadata')
const { QUANTIFIER_METADATA } = require('./quantifiersMetadata')

types.RULE = RULE_METADATA
types.CONECTOR = CONECTOR_METADATA
types.QUANTIFIER = QUANTIFIER_METADATA
types.CRITERIA = CRITERIA_METADATA
types.OPERATOR = OPERATOR_METADATA

const generateRuleFromJson = (prescription, jsonRule) => {
  types.CRITERIA.getActualPrescription = () => prescription
  return types.RULE(jsonRule)
}

const generateJsonFromRule = rule => rule.toJson()

exports.generateJsonFromRule = generateJsonFromRule
exports.generateRuleFromJson = generateRuleFromJson

// const rule3 = {
//   description: 'regla boba',
//   errorMessage: 'Debe marcar tratamiento prolongado',
//   predicate: {
//     type: 'CONECTOR',
//     name: 'AND',
//     predicates: [
//       {
//         type: 'CRITERIA',
//         entity: 'PRESCRIPTION',
//         attribute: 'PROLONGED_TREATMENT',
//         operator: 'EQUAL',
//         expectedValue: true
//       },
//       {
//         type: 'CRITERIA',
//         entity: 'ITEM_PRESCRIBED',
//         attribute: 'QUANTITY',
//         operator: 'EQUAL',
//         expectedValue: 1,
//         quantifier: 'EXISTS_AT_LEAST',
//         quantity: 1
//       },
//       {
//         type: 'CRITERIA',
//         entity: 'ITEM_PRESCRIBED',
//         attribute: 'QUANTITY',
//         operator: 'EQUAL',
//         expectedValue: 1,
//         quantifier: 'FOR_ALL'
//       }
//     ]
//   }
// }
// const item1 = { prescribed: { quantity: 1, medicine: { id: 1 } } }
// const item2 = { prescribed: { quantity: 1, medicine: { id: 1 } } }
// const item3 = { prescribed: { quantity: 1, medicine: { id: 1 } } }
// const prescription = Prescription.fromObject({ prolongedTreatment: true, items: [item1, item2, item3] })
// const ruleObject = generateRuleFromJson(prescription, rule3)
// const ruleJson = generateJsonFromRule(ruleObject)
// const ruleObject2 = generateRuleFromJson(prescription, ruleJson)
// const ruleJson2 = generateJsonFromRule(ruleObject2)
// // console.log(ruleObject.satisfies())
// console.log(JSON.stringify(ruleJson))
// console.log(JSON.stringify(ruleJson2))