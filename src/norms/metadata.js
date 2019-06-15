/* eslint-disable no-use-before-define */

const { Rule } = require('./rules/rule')
const { PrescriptionProlongedTreatmentCriteria, PrescriptionItemsCount } = require('./criterias/criteria')
const { Conector, IsConector, NotConector, AndConector } = require('./conectors/conector')
const { Operator, EqualOperator } = require('./operators/operator')
const { Quantifier, ExistsAtLeastQuantifier } = require('./quantifiers/quantifier')
const { Prescription } = require('../domain/prescription')

// Parece que no sirve, pero es parte de la closure que usa el generateRuleFrom
let actualPrescription = null


const rule = {
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
        entity: 'PRESCRIPTION',
        attribute: 'ITEMS_COUNT',
        operator: 'EQUAL',
        expectedValue: 0
      }
    ]
  }
}

const rule2 = {
  description: 'regla boba',
  errorMessage: 'Debe marcar tratamiento prolongado',
  predicate: {
    type: 'CRITERIA',
    entity: 'PRESCRIPTION',
    attribute: 'PROLONGED_TREATMENT',
    operator: 'EQUAL',
    expectedValue: true
  }
}

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
        type: 'QUANTIFIER',
        name: 'EXISTS_AT_LEAST',
        quantity: 1,
        predicates: [
          {
            type: 'CRITERIA',
            entity: 'PRESCRIPTION',
            attribute: 'ITEMS_COUNT',
            operator: 'EQUAL',
            expectedValue: 0
          },
          {
            type: 'CRITERIA',
            entity: 'PRESCRIPTION',
            attribute: 'PROLONGED_TREATMENT',
            operator: 'EQUAL',
            expectedValue: false
          }
        ]
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
    loadPredicate: json => types.QUANTIFIER[json.name](json),
    getModel: json => ({ ...json, predicates: loadPredicates(json) }),
    EXISTS_AT_LEAST: json => new ExistsAtLeastQuantifier().initialize(types.QUANTIFIER.getModel(json)),
    EXISTS_EXACTLY: {},
    EXISTS_AT_MOST: {},
    FOR_ALL: {}
  },
  CRITERIA: {
    loadPredicate: json => types.CRITERIA[json.entity][json.attribute]({ ...json, prescription: actualPrescription }),
    getModel: json => ({ ...json, operator: types.OPERATOR[json.operator](json) }),
    PRESCRIPTION: {
      PROLONGED_TREATMENT: json => new PrescriptionProlongedTreatmentCriteria().initialize(types.CRITERIA.getModel(json)),
      DIAGNOSIS: {},
      ITEMS_COUNT: json => new PrescriptionItemsCount().initialize(types.CRITERIA.getModel(json))
    },
    ITEM_PRESCRIBE: {
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

module.exports = {
  types,
  generateRuleFrom
}

console.log(generateRuleFrom(Prescription.fromObject({ prolongedTreatment: true }), rule3).getError())