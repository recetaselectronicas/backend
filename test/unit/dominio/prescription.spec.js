const {Prescription} = require('../../../src/domain/prescription')
const {Item} = require('../../../src/domain/item')
const {formats} = require('../../../src/utils/utils')
const moment = require('moment')
const {Affiliate} = require('../../../src/domain/affiliate')
const {Doctor} = require('../../../src/domain/doctor')
const {MedicalInsurance} = require('../../../src/domain/medicalInsurance')
const {Institution} = require('../../../src/domain/institution')
const {states} = require('../../../src/state-machine/state')

const affiliate = new Affiliate()
affiliate.id = 12
const doctor = new Doctor()
doctor.id = 23
const issuedDate = '01/01/1992 12:45'
const soldDate = '02/01/1992 12:45'
const auditedDate = '03/01/1992 12:45'
const diagnosis = 'asdf'
const id = 1
const institution = new Institution()
institution.id = 13
const item = new Item()
item.id = 13
const items = [item]
const medicalInsurance = new MedicalInsurance()
medicalInsurance.id = 44
const norm = 1
const prolongedTreatment = true
const status = states.ISSUED.status
const ttl = 12
const testPrescription = {affiliate, doctor, auditedDate, diagnosis, id, institution, issuedDate, items, medicalInsurance, norm, prolongedTreatment, soldDate, status, ttl}

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
        expect(prescription).toHaveProperty('doctor')
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
        expect(prescription.doctor).toBeNull()
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
        expect(prescription.toJson()).toEqual("{\"id\":null,\"issuedDate\":null,\"soldDate\":null,\"auditedDate\":null,\"prolongedTreatment\":false,\"diagnosis\":null,\"ttl\":null,\"institution\":null,\"affiliate\":null,\"doctor\":null,\"medicalInsurance\":null,\"status\":null,\"norm\":null,\"items\":[]}")
        expect(Prescription.fromJson(testPrescription).toJson()).toEqual("{\"id\":1,\"issuedDate\":\"01/01/1992 12:45\",\"soldDate\":\"03/01/1992 12:45\",\"auditedDate\":\"02/01/1992 12:45\",\"prolongedTreatment\":true,\"diagnosis\":\"asdf\",\"ttl\":12,\"institution\":{\"id\":13,\"description\":null,\"address\":null},\"affiliate\":{\"id\":12,\"idPatient\":null,\"name\":null,\"surname\":null,\"userName\":null,\"birthDate\":null,\"gender\":null,\"contactNumber\":null,\"email\":null,\"address\":null,\"nationality\":null,\"nicNumber\":null,\"nicIssueDate\":null,\"nicType\":null,\"nicExemplary\":null,\"nicPhoto\":null,\"fromDate\":null,\"toDate\":null,\"code\":null,\"category\":null,\"imageCredential\":null,\"plan\":{\"id\":null,\"description\":null,\"entryDate\":null,\"leavingDate\":null,\"percentage\":null,\"idMedicalInsurance\":null}},\"doctor\":{\"id\":23,\"name\":null,\"lastName\":null,\"userName\":null,\"birthDate\":null,\"entryDate\":null,\"leavingDate\":null,\"contactNumber\":null,\"nationality\":null,\"address\":null,\"email\":null,\"nationalMatriculation\":null,\"provincialMatriculation\":null},\"medicalInsurance\":{\"id\":44,\"description\":null,\"userName\":null,\"corporateName\":null,\"email\":null,\"address\":null,\"contactNumber\":null},\"status\":\"EMITIDA\",\"norm\":1,\"items\":[{\"id\":13,\"prescribed\":{\"quantity\":null,\"medicine\":{\"id\":null}},\"received\":{\"quantity\":null,\"soldDate\":null,\"medicine\":{\"id\":null},\"pharmacist\":{\"id\":null}},\"audited\":{\"quantity\":null,\"medicine\":{\"id\":null}}}]}")
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
        expect(prescription.doctor).toEqual(doctor)
        expect(prescription.medicalInsurance).toEqual(medicalInsurance)
        expect(prescription.status).toEqual(status)
        expect(prescription.norm).toEqual(norm)
        expect(prescription.items).toEqual(items)
    })

    it('can be obtained from an unknown object', () => {
        prescription = Prescription.fromObject(testPrescription)
        expect(prescription.id).toEqual(id)
        expect(prescription.getIssuedDate()).toEqual(issuedDate)
        expect(prescription.getSoldDate()).toEqual(soldDate)
        expect(prescription.getAuditedDate()).toEqual(auditedDate)
        expect(prescription.prolongedTreatment).toEqual(prolongedTreatment)
        expect(prescription.diagnosis).toEqual(diagnosis)
        expect(prescription.ttl).toEqual(ttl)
        expect(prescription.institution).toEqual(institution)
        expect(prescription.affiliate).toEqual(affiliate)
        expect(prescription.doctor).toEqual(doctor)
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