const {dateTimeFormat} = require('../utils/utils')
const {Institution} = require('../domain/institution')
const {Doctor} = require('../domain/doctor')
const {MedicalInsurance} = require('../domain/medicalInsurance')
const {Affiliate} = require('../domain/affiliate')
const {Item} = require('../domain/item')

class Prescription {
    constructor(){
        this.id = null
        this.issuedDate = null
        this.soldDate = null
        this.auditedDate = null
        this.prolongedTreatment = false
        this.diagnosis = null
        this.ttl = null
        this.institution = null
        this.affiliate = null
        this.doctor = null
        this.medicalInsurance = null
        this.status = null
        this.norm = null
        this.items = []
    }

    addItem(item){
        this.items.push(Item.fromObject(item))
    }

    setIssuedDate(date){
        this.issuedDate = dateTimeFormat.toDate(date)
    }

    getIssuedDate(){
        return dateTimeFormat.toString(this.issuedDate)
    }

    setSoldDate(date){
        this.soldDate = dateTimeFormat.toDate(date)
    }

    getSoldDate(){
        return dateTimeFormat.toString(this.soldDate)
    }

    setAuditedDate(date){
        this.auditedDate = dateTimeFormat.toDate(date)
    }

    getAuditedDate(){
        return dateTimeFormat.toString(this.auditedDate)
    }

    setInstitution(institution){
        this.institution = Institution.fromObject(institution)
    }

    setDoctor(doctor){
        this.doctor = Doctor.fromObject(doctor)
    }

    setMedicalInsurance(medicalInsurance){
        this.medicalInsurance = MedicalInsurance.fromObject(medicalInsurance)
    }

    setAffiliate(affiliate){
        this.affiliate = Affiliate.fromObject(affiliate)
    }

    toJson(){
        return JSON.stringify({
            id: this.id,
            issuedDate: this.getIssuedDate(),
            soldDate: this.getSoldDate(),
            auditedDate: this.getAuditedDate(),
            prolongedTreatment: this.prolongedTreatment,
            diagnosis: this.diagnosis,
            ttl: this.ttl,
            institution: this.institution && this.institution.toPlainObject(),
            affiliate: this.affiliate && this.affiliate.toPlainObject(),
            doctor: this.doctor && this.doctor.toPlainObject(),
            medicalInsurance: this.medicalInsurance && this.medicalInsurance.toPlainObject(),
            status: this.status,
            norm: this.norm,
            items: this.items.length ? this.items.map(item => item.toPlainObject()) : this.items
        })
    }

    toPlainObject(){
        return JSON.parse(this.toJson())
    }

    static fromJson(json = '{}'){
        if (!json){
            return new Prescription()
        }
        let object = typeof json === 'object' ? json : JSON.parse(json)
        const prescription = new Prescription()
        prescription.id = object.id || prescription.id
        prescription.setIssuedDate(object.issuedDate)
        prescription.setSoldDate(object.soldDate)
        prescription.setAuditedDate(object.auditedDate)
        prescription.prolongedTreatment = object.prolongedTreatment
        prescription.diagnosis = object.diagnosis || prescription.diagnosis
        prescription.ttl = object.ttl || prescription.ttl
        prescription.setInstitution(object.institution)
        prescription.setAffiliate(object.affiliate)
        prescription.setDoctor(object.doctor)
        prescription.setMedicalInsurance(object.medicalInsurance)
        prescription.status = object.status || prescription.status
        prescription.norm = object.norm || prescription.norm
        if (object.items && object.items.length){
            object.items.forEach(item => prescription.addItem(item))
        }
        return prescription
    }

    static fromObject(object){
        if (!(object instanceof Prescription)){
            return Prescription.fromJson(object)
        }
        return object 
    }

    clone(){
        return Prescription.fromJson(this.toJson())
    }
}

module.exports = {Prescription}