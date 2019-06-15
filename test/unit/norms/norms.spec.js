/* eslint-disable no-undef */
const { PrescriptionProlongedTreatmentCriteria, PrescriptionItemsCount } = require('../../../src/norms/criterias/criteria')
const { IsConector, NotConector, AndConector } = require('../../../src/norms/conectors/conector')
const { EqualOperator } = require('../../../src/norms/operators/operator')
const { ExistsAtLeastQuantifier, ExistsQuantifier, ForAllQuantifier } = require('../../../src/norms/quantifiers/quantifier')
const { Prescription } = require('../../../src/domain/prescription')
const { _causes } = require('../../../src/utils/errors')

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