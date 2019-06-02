const moment = require('moment')
const { formats } = require('../utils/utils')
const { Plan } = require('./plan')

class Affiliate {

    constructor() {
        this.id = null
        this.idPatient = null
        this.name = null
        this.surname = null
        this.userName = null
        this.birthDate = null
        this.gender = null
        this.contactNumber = null
        this.email = null
        this.address = null
        this.nationality = null
        this.nicNumber = null
        this.nicIssueDate = null
        this.nicType = null
        this.nicExemplary = null
        this.nicPhoto = null
        this.fromDate = null
        this.toDate = null
        this.code = null
        this.category = null
        this.imageCredential = null
        this.plan = new Plan()
    }

    setFromDate(date) {
        if (moment.isMoment(date)) {
            this.fromDate = date
        } else {
            this.fromDate = moment(date, formats.dateFormat)
            if (!this.fromDate.isValid()) {
                this.fromDate = null
            }
        }
    }
    getFromDate() {
        return moment.isMoment(this.fromDate) ? this.fromDate.format(formats.dateFormat) : this.fromDate
    }

    setToDate(date) {
        if (moment.isMoment(date)) {
            this.toDate = date
        } else {
            this.toDate = moment(date, formats.dateFormat)
            if (!this.toDate.isValid()) {
                this.toDate = null
            }
        }
    }
    getToDate() {
        return moment.isMoment(this.toDate) ? this.toDate.format(formats.dateFormat) : this.toDate
    }

    setBirthDate(date) {
        if (moment.isMoment(date)) {
            this.birthDate = date
        } else {
            this.birthDate = moment(date, formats.dateFormat)
            if (!this.birthDate.isValid()) {
                this.birthDate = null
            }
        }
    }
    getBirthDate() {
        return moment.isMoment(this.birthDate) ? this.birthDate.format(formats.dateFormat) : this.birthDate
    }

    setNicIssueDate(date) {
        if (moment.isMoment(date)) {
            this.nicIssueDate = date
        } else {
            this.nicIssueDate = moment(date, formats.dateFormat)
            if (!this.nicIssueDate.isValid()) {
                this.nicIssueDate = null
            }
        }
    }
    getNicIssueDate() {
        return moment.isMoment(this.nicIssueDate) ? this.nicIssueDate.format(formats.dateFormat) : this.nicIssueDate
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            idPatient: this.idPatient,
            name: this.name,
            surname: this.surname,
            userName: this.userName,
            birthDate: this.getBirthDate(),
            gender: this.gender,
            contactNumber: this.contactNumber,
            email: this.email,
            address: this.address,
            nationality: this.nationality,
            nicNumber: this.nicNumber,
            nicIssueDate: this.getNicIssueDate(),
            nicType: this.nicType,
            nicExemplary: this.nicExemplary,
            nicPhoto: this.nicPhoto,
            fromDate: this.getFromDate(),
            toDate: this.getToDate(),
            code: this.code,
            category: this.category,
            imageCredential: this.imageCredential,
            plan: this.plan ? JSON.parse(this.plan.toJson()) : this.plan
        })
    }

    static fromJson(json = '{}') {
        if (!json){
            return new Affiliate()
        }
        let object = typeof json === 'object' ? json : JSON.parse(json)
        const affiliate = new Affiliate()
        affiliate.id = object.id || affiliate.id
        affiliate.idPatient = object.idPatient || affiliate.idPatient
        affiliate.name = object.name || affiliate.name
        affiliate.surname = object.surname || affiliate.surname
        affiliate.userName = object.userName || affiliate.userName
        affiliate.setBirthDate(object.birthDate)
        affiliate.gender = object.gender || affiliate.gender
        affiliate.contactNumber = object.contactNumber || affiliate.contactNumber
        affiliate.email = object.email || affiliate.email
        affiliate.address = object.address || affiliate.address
        affiliate.nationality = object.nationality || affiliate.nationality
        affiliate.nicNumber = object.nicNumber || affiliate.nicNumber
        affiliate.setNicIssueDate(object.nicIssueDate)
        affiliate.nicType = object.nicType || affiliate.nicType
        affiliate.nicExemplary = object.nicExemplary || affiliate.nicExemplary
        affiliate.nicPhoto = object.nicPhoto || affiliate.nicPhoto
        affiliate.setFromDate(object.fromDate)
        affiliate.setToDate(object.toDate)
        affiliate.code = object.code || affiliate.code
        affiliate.category = object.category || affiliate.category
        affiliate.imageCredential = object.imageCredential || affiliate.imageCredential
        affiliate.plan = Plan.fromJson(object.plan)
        return affiliate

    }

    static fromObject(object){
        if (!(object instanceof Affiliate)){
            return Affiliate.fromJson(object)
        }
        return object 
    }

}

module.exports = { Affiliate }