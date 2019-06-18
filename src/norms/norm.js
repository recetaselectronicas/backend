/* eslint-disable no-mixed-operators */
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
  console.log(JSON.stringify(generateJsonFromNorm(generateNormFromJson(dummyPrescription, states.ISSUED.status, generateJsonFromNorm(generateNormFromJson(dummyPrescription, states.ISSUED.status, norm))))))
}

module.exports = {
  generateJsonFromRule,
  generateRuleFromJson,
  generateJsonFromNorm,
  generateNormFromJson,
  validateNorm
}