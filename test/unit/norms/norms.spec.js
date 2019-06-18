/* eslint-disable no-undef */
const { PrescriptionProlongedTreatmentCriteria } = require('../../../src/norms/criterias/prescriptionCriteria/prescriptionProlongedTreatmentCriteria')
const { EqualOperator } = require('../../../src/norms/operators/equalOperator')
const { Prescription } = require('../../../src/domain/prescription')

const getPrescription = () => Prescription.fromObject({})

let predicate = null
let prescription = null
let operator = null
let expectedValue = null
let model = null

describe('PrescriptionProlongedTreatmentCriteria predicate', () => {
  beforeEach(() => {
    predicate = new PrescriptionProlongedTreatmentCriteria()
  })

  describe('when null model given', () => {
    beforeEach(() => {
      model = null
    })

    it('throws error', () => {
      expect(() => predicate.initialize(model)).toThrow('Error while assembling Predicate. No model given or not an Object.')
    })
  })

  describe('when empty model given', () => {
    beforeEach(() => {
      model = {}
    })

    it('throws error', () => {
      expect(() => predicate.initialize(model)).toThrow('Error while assembling Criteria. No prescription given or not a Prescription.')
    })
  })

  describe('when model with prescription given but nothing else', () => {
    beforeEach(() => {
      model = {
        prescription: getPrescription()
      }
    })

    it('throws error', () => {
      expect(() => predicate.initialize(model)).toThrow('Error while assembling Criteria. No operator given or not an Operator')
    })
  })

  describe('when model with prescription and operator given and nothing else', () => {
    beforeEach(() => {
      model = {
        prescription: getPrescription(),
        operator: new EqualOperator()
      }
    })

    it('throws error', () => {
      expect(() => predicate.initialize(model)).toThrow('Error while assembling EqualOperator. No expectedValue given')
    })
  })

  describe('when model with prescription, operator and expectedValue given', () => {
    beforeEach(() => {
      model = {
        prescription: getPrescription(),
        operator: new EqualOperator(),
        expectedValue: true
      }
    })

    it('doesnt throws error', () => {
      expect(() => predicate.initialize(model)).not.toThrow()
    })
  })

  describe('when prescription has prolonged treatment set to true', () => {
    beforeEach(() => {
      prescription = getPrescription()
      prescription.prolongedTreatment = true
    })

    describe('and operator is EqualOperator', () => {
      beforeEach(() => {
        operator = new EqualOperator()
      })

      describe('and expected value is true', () => {
        beforeEach(() => {
          expectedValue = true
        })

        describe('and it initializes with that model', () => {
          beforeEach(() => {
            model = {
              prescription,
              operator,
              expectedValue
            }
            predicate.initialize(model)
          })

          it('satisfies the predicate', () => {
            expect(predicate.satisfies()).toBeTruthy()
          })
        })
      })

      describe('and expected value is false', () => {
        beforeEach(() => {
          expectedValue = false
        })

        describe('and it initializes with that model', () => {
          beforeEach(() => {
            model = {
              prescription,
              operator,
              expectedValue
            }
            predicate.initialize(model)
          })

          it('doesnt satisfies the predicate', () => {
            expect(predicate.satisfies()).not.toBeTruthy()
          })
        })
      })
    })
  })
})

// const rule3 = {
//   type: 'EXECUTABLE',
//   name: 'RULE',
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
// const norm1 = {
//   type: 'EXECUTABLE',
//   name: 'NORM',
//   description: 'Norma falsa',
//   dateCreated: '',
//   states: [
//     {
//       type: 'EXECUTABLE',
//       name: 'NORM_STATE',
//       status: 'EMITIDA',
//       description: 'Normas para emitidass',
//       rules: [
//         {
//           type: 'EXECUTABLE',
//           name: 'RULE',
//           description: 'regla boba',
//           errorMessage: 'Debe marcar tratamiento prolongado',
//           predicate: {
//             type: 'CONECTOR',
//             name: 'AND',
//             predicates: [
//               {
//                 type: 'CRITERIA',
//                 entity: 'PRESCRIPTION',
//                 attribute: 'PROLONGED_TREATMENT',
//                 operator: 'EQUAL',
//                 expectedValue: true
//               },
//               {
//                 type: 'CRITERIA',
//                 entity: 'ITEM_PRESCRIBED',
//                 attribute: 'QUANTITY',
//                 operator: 'EQUAL',
//                 expectedValue: 1,
//                 quantifier: 'EXISTS_AT_LEAST',
//                 quantity: 1
//               },
//               {
//                 type: 'CRITERIA',
//                 entity: 'ITEM_PRESCRIBED',
//                 attribute: 'QUANTITY',
//                 operator: 'EQUAL',
//                 expectedValue: 1,
//                 quantifier: 'FOR_ALL'
//               }
//             ]
//           }
//         }
//       ]
//     }
//   ]
// }
// const item1 = { prescribed: { quantity: 1, medicine: { id: 1 } } }
// const item2 = { prescribed: { quantity: 1, medicine: { id: 1 } } }
// const item3 = { prescribed: { quantity: 2, medicine: { id: 1 } } }
// const prescription = Prescription.fromObject({ prolongedTreatment: true, items: [item1, item2, item3] })
// const ruleObject = generateRuleFromJson(prescription, rule3)
// const ruleJson = generateJsonFromRule(ruleObject)
// const ruleObject2 = generateRuleFromJson(prescription, ruleJson)
// const ruleJson2 = generateJsonFromRule(ruleObject2)
// const normObject = generateNormFromJson(prescription, 'EMITIDA', norm1)
// const normJson = generateJsonFromNorm(normObject)
// const normObject2 = generateNormFromJson(prescription, 'EMITIDA', normJson)
// const normJson2 = generateJsonFromNorm(normObject2)
// console.log(ruleObject.satisfies())
// console.log(JSON.stringify(ruleJson))
// console.log(JSON.stringify(ruleJson2))
// console.log(JSON.stringify(normJson))
// console.log(JSON.stringify(normJson2))
// console.log(normObject.executeAndGetError())