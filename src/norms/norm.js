/* eslint-disable no-mixed-operators */
const errors = require('../utils/errors')
const {
  generateJsonFromRule,
  generateRuleFromJson,
  generateJsonFromNorm,
  generateNormFromJson
} = require('./metadata/metadata')
const { Prescription } = require('../domain/prescription')
const { states } = require('../state-machine/state')

const item1 = { prescribed: { quantity: 1, medicine: { id: 1 } } }
const item2 = { prescribed: { quantity: 2, medicine: { id: 1 } } }
const item3 = { prescribed: { quantity: 3, medicine: { id: 1 } } }
const dummyPrescription = Prescription.fromObject({ items: [item1, item2, item3] })

const validateNorm = (norm) => {
  console.log(JSON.stringify(generateJsonFromNorm(generateNormFromJson(dummyPrescription, states.ISSUED.id, generateJsonFromNorm(generateNormFromJson(dummyPrescription, states.ISSUED.id, norm))))))
}
const normalizeNorm = (norm) => {
  return generateJsonFromNorm(generateNormFromJson(dummyPrescription, states.ISSUED.id, norm))
}

const validateRulesOnPrescription = (prescription, status, norm) => {
  const generatedNorm = generateNormFromJson(prescription, status, norm)
  const error = generatedNorm.executeAndGetError()
  if (error) {
    throw errors.newNormRuleFailed(error)
  }
}

module.exports = {
  generateJsonFromRule,
  generateRuleFromJson,
  generateJsonFromNorm,
  generateNormFromJson,
  validateNorm,
  normalizeNorm,
  validateRulesOnPrescription
}