const moment = require('moment')
const {formats} = require('../utils/utils')

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
        this.medicalInsurance = null
        this.status = null
        this.norm = null
        this.items = []
    }

    addItem(item){
        this.items.push(item)
    }

    setIssuedDate(date){
        if (moment.isMoment(date)){
            this.issuedDate = date
        } else {
            this.issuedDate = moment(date, formats.dateTimeFormat)
            if (!this.issuedDate.isValid()){
                this.issuedDate = null
            }
        }
    }

    getIssuedDate(){
        return moment.isMoment(this.issuedDate) ? this.issuedDate.format(formats.dateTimeFormat) : this.issuedDate
    }

    setSoldDate(date){
        if (moment.isMoment(date)){
            this.soldDate = date
        } else {
            this.soldDate = moment(date, formats.dateTimeFormat)
        }
    }

    getSoldDate(){
        return moment.isMoment(this.soldDate) ? this.soldDate.format(formats.dateTimeFormat) : this.soldDate
    }

    setAuditedDate(date){
        if (moment.isMoment(date)){
            this.auditedDate = date
        } else {
            this.auditedDate = moment(date, formats.dateTimeFormat)
        }
    }

    getAuditedDate(){
        return moment.isMoment(this.auditedDate) ? this.auditedDate.format(formats.dateTimeFormat) : this.auditedDate
    }

    toJson(){
        return JSON.stringify({
            id: this.id,
            issuedDate: this.getIssuedDate(),
            soldDate: this.getAuditedDate(),
            auditedDate: this.getSoldDate(),
            prolongedTreatment: this.prolongedTreatment,
            diagnosis: this.diagnosis,
            ttl: this.ttl,
            institution: this.institution ? JSON.parse(this.institution.toJson()) : this.institution,
            affiliate: this.affiliate ? JSON.parse(this.affiliate.toJson()) : this.affiliate,
            medicalInsurance: this.medicalInsurance ? JSON.parse(this.medicalInsurance.toJson()) : this.medicalInsurance,
            status: this.status,
            norm: this.norm ? JSON.parse(this.norm.toJson()) : this.norm,
            items: this.items.length !== 0 ? JSON.parse(this.items.toJson()) : this.items
        })
    }

    static fromJson(json = '{}'){
        let object = typeof json === 'object' ? json : JSON.parse(json)
        const prescription = new Prescription()
        prescription.id = object.id
        prescription.issuedDate = object.issuedDate ? moment(object.issuedDate, formats.dateTimeFormat) : null
        prescription.soldDate = object.soldDate ? moment(object.soldDate, formats.dateTimeFormat) : null
        prescription.auditedDate = object.auditedDate ? moment(object.auditedDate, formats.dateTimeFormat) : null
        prescription.prolongedTreatment = object.prolongedTreatment
        prescription.diagnosis = object.diagnosis
        prescription.ttl = object.ttl
        prescription.institution = object.institution
        prescription.affiliate = object.affiliate
        prescription.medicalInsurance = object.medicalInsurance
        prescription.status = object.status
        prescription.norm = object.norm
        prescription.items = object.items
        return prescription
    }
}

module.exports = {Prescription}