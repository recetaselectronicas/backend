const {Prescription} = require('../../../src/domain/prescription')
const {Item} = require('../../../src/domain/item')
const {formats} = require('../../../src/utils/utils')
const moment = require('moment')

const affiliate = 1
const issuedDate = '01/01/1992 12:45'
const soldDate = '02/01/1992 12:45'
const auditedDate = '03/01/1992 12:45'
const diagnosis = 'asdf'
const id = 1
const institution = null
const items = ['1']
const medicalInsurance = 1
const norm = 1
const prolongedTreatment = true
const status = 'EMITIDA'
const ttl = 12
const testPrescription = {affiliate, auditedDate, diagnosis, id, institution, issuedDate, items, medicalInsurance, norm, prolongedTreatment, soldDate, status, ttl}

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
        expect(prescription.diagnosis).toBeNull() 
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

    it('can be transformed to json', () => {
        expect(prescription.toJson()).toEqual("{\"id\":null,\"issuedDate\":null,\"soldDate\":null,\"auditedDate\":null,\"prolongedTreatment\":false,\"diagnosis\":null,\"ttl\":null,\"institution\":null,\"affiliate\":null,\"medicalInsurance\":null,\"status\":null,\"norm\":null,\"items\":[]}")
    })

    it('can be obtained from json', () => {
        prescription = Prescription.fromJson(JSON.stringify(testPrescription))
        expect(prescription.id).toEqual(id)
        expect(prescription.getIssuedDate()).toEqual(issuedDate)
        expect(prescription.getSoldDate()).toEqual(soldDate)
        expect(prescription.getAuditedDate()).toEqual(auditedDate)
        expect(prescription.prolongedTreatment).toEqual(prolongedTreatment)
        expect(prescription.diagnosis).toEqual(diagnosis)
        expect(prescription.ttl).toEqual(ttl)
        expect(prescription.institution).toEqual(institution)
        expect(prescription.affiliate).toEqual(affiliate)
        expect(prescription.medicalInsurance).toEqual(medicalInsurance)
        expect(prescription.status).toEqual(status)
        expect(prescription.norm).toEqual(norm)
        expect(prescription.items).toEqual(items)
    })

    //TODO: Testear asignarle un afiliado, un medico, una obra social, items, etc..
})