const {Prescription} = require('../../../src/domain/prescription')
const {Item} = require('../../../src/domain/item')

describe('Prescription', () => {
    let prescription = new Prescription()

    beforeEach(() => {
        prescription = new Prescription()
    })

    it('has all this properties', () => {
        expect(prescription).toHaveProperty('id')
        expect(prescription).toHaveProperty('issuedDate')
        expect(prescription).toHaveProperty('soldDate')
        expect(prescription).toHaveProperty('auditedDate')
        expect(prescription).toHaveProperty('prolongedTreatment')
        expect(prescription).toHaveProperty('diagnosis')
        expect(prescription).toHaveProperty('ttl')
        expect(prescription).toHaveProperty('institution')
        expect(prescription).toHaveProperty('affiliate')
        expect(prescription).toHaveProperty('medicalInsurance')
        expect(prescription).toHaveProperty('status')
        expect(prescription).toHaveProperty('norm')
        expect(prescription).toHaveProperty('items')
    })

    it('has this properties default values', () => {
        expect(prescription.id).toBeNull()
        expect(prescription.issuedDate).toBeNull()
        expect(prescription.soldDate).toBeNull()
        expect(prescription.auditedDate).toBeNull()
        expect(prescription.prolongedTreatment).toBeFalsy()
        expect(prescription.diagnosis).toEqual('')
        expect(prescription.ttl).toBeNull()
        expect(prescription.institution).toBeNull()
        expect(prescription.affiliate).toBeNull()
        expect(prescription.medicalInsurance).toBeNull()
        expect(prescription.status).toBeNull()
        expect(prescription.norm).toBeNull()
        expect(prescription.items).toEqual([])
    })

    it('can add item to prescription', () => {
        const item = new Item()
        prescription.addItem(item)
        expect(prescription.items).toContain(item)
    })
})