/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

const { Rule } = require('./rules/rule')
const { PrescriptionProlongedTreatmentCriteria, PrescriptionItemsCount, ItemPresribedQuantity } = require('./criterias/criteria')
const { IsConector, NotConector, AndConector } = require('./conectors/conector')
const { EqualOperator } = require('./operators/operator')
const { ExistsAtLeastQuantifier, ForAllQuantifier } = require('./quantifiers/quantifier')
const { Prescription } = require('../domain/prescription')

// Parece que no sirve, pero es parte de la closure que usa el generateRuleFrom
let actualPrescription = null

const rule3 = {
  description: 'regla boba',
  errorMessage: 'Debe marcar tratamiento prolongado',
  predicate: {
    type: 'CONECTOR',
    name: 'AND',
    predicates: [
      {
        type: 'CRITERIA',
        entity: 'PRESCRIPTION',
        attribute: 'PROLONGED_TREATMENT',
        operator: 'EQUAL',
        expectedValue: true
      },
      {
        type: 'CRITERIA',
        entity: 'ITEM_PRESCRIBE',
        attribute: 'QUANTITY',
        operator: 'EQUAL',
        expectedValue: 1,
        quantifier: 'EXISTS_AT_LEAST',
        quantity: 1
      },
      {
        type: 'CRITERIA',
        entity: 'ITEM_PRESCRIBE',
        attribute: 'QUANTITY',
        operator: 'EQUAL',
        expectedValue: 1,
        quantifier: 'FOR_ALL'
      }
    ]
  }
}

const types = {
  RULE: json => new Rule().initialize({
    ...json,
    predicate: loadPredicate(json)
  }),
  CONECTOR: {
    loadPredicate: json => types.CONECTOR[json.name](json),
    IS: json => new IsConector().initialize({ ...json, predicate: loadPredicate(json) }),
    NOT: json => new NotConector().initialize({ ...json, predicate: loadPredicate(json) }),
    OR: {},
    AND: json => new AndConector().initialize({ ...json, predicates: loadPredicates(json) }),
    IMPL: {},
    DOUBLE_IMPL: {}
  },
  QUANTIFIER: {
    // loadPredicate: json => types.QUANTIFIER[json.name](json),
    // getModel: json => ({ ...json, predicate: loadPredicate(json) }),
    EXISTS_AT_LEAST: json => new ExistsAtLeastQuantifier(),
    EXISTS_EXACTLY: {},
    EXISTS_AT_MOST: {},
    FOR_ALL: json => new ForAllQuantifier()
  },
  CRITERIA: {
    loadPredicate: json => types.CRITERIA[json.entity][json.attribute]({ ...json, prescription: actualPrescription }),
    getModel: json => ({ ...json, operator: types.OPERATOR[json.operator](json) }),
    getModelWithQuantifier: json => ({ ...json, operator: types.OPERATOR[json.operator](json), quantifier: types.QUANTIFIER[json.quantifier](json) }),
    PRESCRIPTION: {
      PROLONGED_TREATMENT: json => new PrescriptionProlongedTreatmentCriteria().initialize(types.CRITERIA.getModel(json)),
      DIAGNOSIS: {},
      ITEMS_COUNT: json => new PrescriptionItemsCount().initialize(types.CRITERIA.getModel(json))
    },
    ITEM_PRESCRIBE: {
      QUANTITY: json => new ItemPresribedQuantity().initialize(types.CRITERIA.getModelWithQuantifier(json)),
      DESCRIPTION: {},
      PHARMACEUTICAL_ACTION: {},
      TROQUEL: {},
      BARCODE: {},
      DRUG: {},
      SIZE: {},
      PRESENTATION: {},
      LABORATORY: {},
      POTENCY: {}
    },
    ITEM_RECEIVE: {
      QUANTITY: {},
      DESCRIPTION: {},
      PHARMACEUTICAL_ACTION: {},
      TROQUEL: {},
      BARCODE: {},
      DRUG: {},
      SIZE: {},
      PRESENTATION: {},
      LABORATORY: {},
      POTENCY: {}
    },
    ITEM_AUDIT: {
      QUANTITY: {},
      DESCRIPTION: {},
      PHARMACEUTICAL_ACTION: {},
      TROQUEL: {},
      BARCODE: {},
      DRUG: {},
      SIZE: {},
      PRESENTATION: {},
      LABORATORY: {},
      POTENCY: {}
    },
    AFFILIATE: {
      AGE: {},
      GENDER: {},
      NATIONALITY: {},
      CREDENTIAL: {},
      PLAN: {}
    },
    DOCTOR: {
      AGE: {},
      NATIONALITY: {},
      NATIONAL_MATRICULATION: {},
      PROVINCIAL_MATRICULATION: {},
      SPECIALTY: {}
    },
    INSTITUTION: {
      DESCRIPTION: {}
    },
    PHARMACIST: {
      AGE: {},
      NATIONALITY: {},
      MATRICULATION: {}
    }
  },
  OPERATOR: {
    EQUAL: json => new EqualOperator(),
    GREATER: {},
    LESSER: {},
    GREATER_OR_EQUAL: {},
    LESSER_OR_EQUAL: {},
    DISTINCT: {},
    IN: {},
    CONTAINS: {}
  }
}

const loadPredicates = (json) => {
  if (json.predicates) {
    return json.predicates.map(predicate => types[predicate.type].loadPredicate(predicate))
  }
  return null
}

const loadPredicate = (json) => {
  if (json.predicate) {
    return types[json.predicate.type].loadPredicate(json.predicate)
  }
  if (json.predicates) {
    return loadPredicates(json)
  }
  return null
}

const generateRuleFrom = (prescription, jsonRule) => {
  actualPrescription = prescription
  return types.RULE(jsonRule)
}

const generateJsonFrom = rule => rule.toJson()

module.exports = {
  types,
  generateRuleFrom,
  generateJsonFrom
}

const item1 = { prescribed: { quantity: 1, medicine: { id: 1 } } }
const item2 = { prescribed: { quantity: 1, medicine: { id: 1 } } }
const item3 = { prescribed: { quantity: 1, medicine: { id: 1 } } }
const prescription = Prescription.fromObject({ prolongedTreatment: true, items: [item1, item2, item3] })
const ruleObject = generateRuleFrom(prescription, rule3)
const ruleJson = generateJsonFrom(ruleObject)
const ruleObject2 = generateRuleFrom(prescription, ruleJson)
const ruleJson2 = generateJsonFrom(ruleObject2)
// console.log(ruleObject.satisfies())
console.log(JSON.stringify(ruleJson))
console.log(JSON.stringify(ruleJson2))