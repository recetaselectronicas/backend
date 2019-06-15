const { states } = require('../../../src/state-machine/state')
const { Prescription } = require('../../../src/domain/prescription')
const { _errors } = require('../../../src/utils/errors')
const { codes } = require('../../../src/codes/entities-codes')

test('State ISSUED has a status defined', () => {
  expect(states.ISSUED.status).toBeDefined()
  expect(states.ISSUED.status).toBeTruthy()
})
const getNewPrescription = () => {
  const prescription = new Prescription()
  return prescription
}
const getNewFullForIssued = () => {
  const prescription = new Prescription()
  prescription.id = null
  prescription.setIssuedDate('01/01/2000 10:10')
  prescription.setSoldDate('02/01/2000 10:10')
  prescription.setAuditedDate('03/01/2000 10:10')
  prescription.prolongedTreatment = false
  prescription.diagnosis = 'diagnostico'
  prescription.ttl = 30
  prescription.institution = { id: 1 }
  prescription.affiliate = { id: 1 }
  prescription.doctor = { id: 1 }
  prescription.medicalInsurance = { id: 1 }
  prescription.status = states.ISSUED.status
  prescription.norm = { id: 1 }
  prescription.addItem({
    prescribed: {
      quantity: 99,
      medicine: {
        id: 1,
      },
    },
  })
  return prescription
}
const getNewPrescriptionForIssued = () => {
  const prescription = new Prescription()
  prescription.setIssuedDate('01/01/2000 10:10')
  prescription.prolongedTreatment = false
  prescription.ttl = 30
  prescription.institution = { id: 1 }
  prescription.affiliate = { id: 1 }
  prescription.doctor = { id: 1 }
  prescription.medicalInsurance = { id: 1 }
  prescription.norm = { id: 1 }
  prescription.addItem({
    prescribed: {
      quantity: 99,
      medicine: {
        id: 1,
      },
    },
  })
  return prescription
}
describe('when state ISSUED has to validate a prescription', () => {
  describe('and prescription is null, undefined or not truthy', () => {
    it('it throws an error', () => {
      expect(() => { states.ISSUED.validate() }).toThrow()
      expect(() => { states.ISSUED.validate(null) }).toThrow()
      expect(() => { states.ISSUED.validate('') }).toThrow()
    })
  })

  describe('and prescription has a status setted', () => {
    const prescription = getNewPrescriptionForIssued()
    prescription.status = 'XXX'
    it('it throws an error that specifies an error on field', () => {
      expect(() => { states.ISSUED.validate(prescription) }).toThrow()
      try {
        states.ISSUED.validate(prescription)
      } catch (errors) {
        expect(errors.length).toBe(1)
        const error = errors[0]
        expect(error.code).toBe(_errors.INVALID_VALUE_ERROR.code)
        expect(error.cause.entity).toBe(codes.PRESCRIPTION.name)
        expect(error.cause.field).toBe(codes.PRESCRIPTION.fields.status)
      }
    })
  })

  describe('and prescription hasn`t an issuedDate', () => {
    const prescription = getNewPrescriptionForIssued()
    prescription.setIssuedDate(null)
    it('it throws an error that specifies an error on field', () => {
      expect(() => { states.ISSUED.validate(prescription) }).toThrow()
      try {
        states.ISSUED.validate(prescription)
      } catch (errors) {
        expect(errors.length).toBe(1)
        const error = errors[0]
        expect(error.code).toBe(_errors.NULL_OR_EMPTY_VALUE_ERROR.code)
        expect(error.cause.entity).toBe(codes.PRESCRIPTION.name)
        expect(error.cause.field).toBe(codes.PRESCRIPTION.fields.issuedDate)
      }
    })
  })

  describe('and prescription hasn`t a ttl', () => {
    const prescription = getNewPrescriptionForIssued()
    prescription.ttl = null
    it('it throws an error that specifies an error on field', () => {
      expect(() => { states.ISSUED.validate(prescription) }).toThrow()
      try {
        states.ISSUED.validate(prescription)
      } catch (errors) {
        expect(errors.length).toBe(1)
        const error = errors[0]
        expect(error.code).toBe(_errors.NULL_OR_EMPTY_VALUE_ERROR.code)
        expect(error.cause.entity).toBe(codes.PRESCRIPTION.name)
        expect(error.cause.field).toBe(codes.PRESCRIPTION.fields.ttl)
      }
    })
  })

  describe('and prescription hasn`t an affiliate', () => {
    const prescription = getNewPrescriptionForIssued()
    prescription.affiliate = null
    it('it throws an error that specifies an error on field', () => {
      expect(() => { states.ISSUED.validate(prescription) }).toThrow()
      try {
        states.ISSUED.validate(prescription)
      } catch (errors) {
        expect(errors.length).toBe(2)
        // const error = errors[0]
        // expect(error.code).toBe(_errors.NULL_OR_EMPTY_VALUE_ERROR.code)
        // expect(error.cause.entity).toBe(codes.PRESCRIPTION.name)
        // expect(error.cause.field).toBe(codes.PRESCRIPTION.fields.affiliate)
      }
    })
  })

  describe('and prescription hasn`t a doctor', () => {
    const prescription = getNewPrescriptionForIssued()
    prescription.doctor = null
    it('it throws an error that specifies an error on field', () => {
      expect(() => { states.ISSUED.validate(prescription) }).toThrow()
      try {
        states.ISSUED.validate(prescription)
      } catch (errors) {
        expect(errors.length).toBe(2)
        // const error = errors[0]
        // expect(error.code).toBe(_errors.NULL_OR_EMPTY_VALUE_ERROR.code)
        // expect(error.cause.entity).toBe(codes.PRESCRIPTION.name)
        // expect(error.cause.field).toBe(codes.PRESCRIPTION.fields.doctor)
      }
    })
  })

  describe('and prescription hasn`t a medicalInsurance', () => {
    const prescription = getNewPrescriptionForIssued()
    prescription.medicalInsurance = null
    it('it throws an error that specifies an error on field', () => {
      expect(() => { states.ISSUED.validate(prescription) }).toThrow()
      try {
        states.ISSUED.validate(prescription)
      } catch (errors) {
        expect(errors.length).toBe(2)
        // const error = errors[0]
        // expect(error.code).toBe(_errors.NULL_OR_EMPTY_VALUE_ERROR.code)
        // expect(error.cause.entity).toBe(codes.PRESCRIPTION.name)
        // expect(error.cause.field).toBe(codes.PRESCRIPTION.fields.medicalInsurance)
      }
    })
  })

  describe('and prescription hasn`t a norm', () => {
    const prescription = getNewPrescriptionForIssued()
    prescription.norm = null
    it('it throws an error that specifies an error on field', () => {
      expect(() => { states.ISSUED.validate(prescription) }).toThrow()
      try {
        states.ISSUED.validate(prescription)
      } catch (errors) {
        expect(errors.length).toBe(1)
        const error = errors[0]
        expect(error.code).toBe(_errors.NULL_OR_EMPTY_VALUE_ERROR.code)
        expect(error.cause.entity).toBe(codes.PRESCRIPTION.name)
        expect(error.cause.field).toBe(codes.PRESCRIPTION.fields.norm)
      }
    })
  })

  describe('and prescription has no items setted', () => {
    const prescription = getNewPrescriptionForIssued()
    prescription.items = []
    it('it throws an error that specifies an error on field', () => {
      expect(() => { states.ISSUED.validate(prescription) }).toThrow()
      try {
        states.ISSUED.validate(prescription)
      } catch (errors) {
        expect(errors.length).toBe(1)
        const error = errors[0]
        expect(error.code).toBe(_errors.NULL_OR_EMPTY_VALUE_ERROR.code)
        expect(error.cause.entity).toBe(codes.PRESCRIPTION.name)
        expect(error.cause.field).toBe(codes.PRESCRIPTION.fields.items)
      }
    })
  })

  describe('and prescription has a soldDate', () => {
    const prescription = getNewPrescriptionForIssued()
    prescription.setSoldDate('02/01/01 10:10')
    it('it throws an error that specifies an error on field', () => {
      expect(() => { states.ISSUED.validate(prescription) }).toThrow()
      try {
        states.ISSUED.validate(prescription)
      } catch (errors) {
        expect(errors.length).toBe(1)
        const error = errors[0]
        expect(error.code).toBe(_errors.INVALID_VALUE_ERROR.code)
        expect(error.cause.entity).toBe(codes.PRESCRIPTION.name)
        expect(error.cause.field).toBe(codes.PRESCRIPTION.fields.soldDate)
      }
    })
  })

  describe('and prescription has a auditedDate', () => {
    const prescription = getNewPrescriptionForIssued()
    prescription.setAuditedDate('03/01/01 10:10')
    it('it throws an error that specifies an error on field', () => {
      expect(() => { states.ISSUED.validate(prescription) }).toThrow()
      try {
        states.ISSUED.validate(prescription)
      } catch (errors) {
        expect(errors.length).toBe(1)
        const error = errors[0]
        expect(error.code).toBe(_errors.INVALID_VALUE_ERROR.code)
        expect(error.cause.entity).toBe(codes.PRESCRIPTION.name)
        expect(error.cause.field).toBe(codes.PRESCRIPTION.fields.auditedDate)
      }
    })
  })

  describe('and prescription has various errors', () => {
    const prescription = getNewPrescriptionForIssued()
    prescription.status = states.ISSUED.status
    prescription.setIssuedDate(null)
    it('it throws an error that specifies all errors', () => {
      expect(() => { states.ISSUED.validate(prescription) }).toThrow()
      try {
        states.ISSUED.validate(prescription)
      } catch (errors) {
        expect(errors.length).toBe(2)
      }
    })
  })

  describe('and prescription is ok', () => {
    const prescription = getNewPrescriptionForIssued()
    it('it validates the prescription and leaves it untouched', () => {
      expect(() => { states.ISSUED.validate(prescription) }).not.toThrow()
      expect(prescription).toEqual(getNewPrescriptionForIssued())
    })
  })
})
