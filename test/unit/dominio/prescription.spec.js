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

    it('when you set a valid issue date to a prescription it stores it like a moment', () => {
        const issuedDate = '01/01/1998 23:00'
        expect(prescription.issuedDate).toBeNull()
        prescription.setIssuedDate(issuedDate)
        expect(moment.isMoment(prescription.issuedDate)).toBeTruthy()
        expect(prescription.issuedDate.format(formats.dateTimeFormat)).toEqual(issuedDate)
    })

    it('when you set an invalid issue date to a prescription it stores a null', () => {
        const issuedDate = '30/02/1998 23:00'
        expect(prescription.issuedDate).toBeNull()
        prescription.setIssuedDate(issuedDate)
        expect(prescription.issuedDate).toBeNull()
    })

    it('when you get the issued date from a prescription that has an issued date it returns a string representation', () => {
        const issuedDate = '01/01/1998 23:00'
        prescription.setIssuedDate(issuedDate)
        expect(prescription.getIssuedDate()).toEqual(issuedDate)
    })

    it('when you get the issued date from a prescription that hasn´t an issued date it returns a null', () => {
        prescription.setIssuedDate(null)
        expect(prescription.getIssuedDate()).toBeNull()
    })

    it('when you set a valid sold date to a prescription it stores it like a moment', () => {
        const soldDate = '01/01/1998 23:00'
        expect(prescription.soldDate).toBeNull()
        prescription.setSoldDate(soldDate)
        expect(moment.isMoment(prescription.soldDate)).toBeTruthy()
        expect(prescription.soldDate.format(formats.dateTimeFormat)).toEqual(soldDate)
    })

    it('when you set an invalid sold date to a prescription it stores a null', () => {
        const soldDate = '30/02/1998 23:00'
        expect(prescription.soldDate).toBeNull()
        prescription.setSoldDate(soldDate)
        expect(prescription.soldDate).toBeNull()
    })

    it('when you get the sold date from a prescription that has a sold date it returns a string representation', () => {
        const soldDate = '01/01/1998 23:00'
        prescription.setSoldDate(soldDate)
        expect(prescription.getSoldDate()).toEqual(soldDate)
    })

    it('when you get the sold date from a prescription that hasn´t a sold date it returns a null', () => {
        prescription.setSoldDate(null)
        expect(prescription.getSoldDate()).toBeNull()
    })

    it('when you set a valid audited date to a prescription it stores it like a moment', () => {
        const auditedDate = '01/01/1998 23:00'
        expect(prescription.auditedDate).toBeNull()
        prescription.setAuditedDate(auditedDate)
        expect(moment.isMoment(prescription.auditedDate)).toBeTruthy()
        expect(prescription.auditedDate.format(formats.dateTimeFormat)).toEqual(auditedDate)
    })

    it('when you set an invalid audited date to a prescription it stores a null', () => {
        const auditedDate = '30/02/1998 23:00'
        expect(prescription.auditedDate).toBeNull()
        prescription.setAuditedDate(auditedDate)
        expect(prescription.auditedDate).toBeNull()
    })

    it('when you get the audited date from a prescription that has an audited date it returns a string representation', () => {
        const auditedDate = '01/01/1998 23:00'
        prescription.setAuditedDate(auditedDate)
        expect(prescription.getAuditedDate()).toEqual(auditedDate)
    })

    it('when you get the audited date from a prescription that hasn´t an audited date it returns a null', () => {
        prescription.setAuditedDate(null)
        expect(prescription.getAuditedDate()).toBeNull()
    })

    //TODO: Testear asignarle un afiliado, un medico, una obra social, items, etc..
})