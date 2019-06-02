const moment = require('moment')
const { formats } = require('../utils/utils')

class Doctor {

    constructor() {
        this.id = null
        this.name = null
        this.lastName = null
        this.userName = null
        this.birthDate = null
        this.entryDate = null
        this.leavingDate = null
        this.contactNumber = null
        this.nationality = null
        this.address = null
        this.email = null
        this.nationalMatriculation = null
        this.provincialMatriculation = null

    }

    setBirthDate(date) {
        if (moment.isMoment(date)){
            this.birthDate = date
        } else {
            this.birthDate = moment(date, formats.dateFormat)
            if (!this.birthDate.isValid()){
                this.birthDate = null
            }
        }
    }
    getBirthDate() {
        return moment.isMoment(this.birthDate) ? this.birthDate.format(formats.dateFormat) : this.birthDate
    }

    setEntryDate(date) {
        if (moment.isMoment(date)){
            this.entryDate = date
        } else {
            this.entryDate = moment(date, formats.dateFormat)
            if (!this.entryDate.isValid()){
                this.entryDate = null
            }
        }
    }
    getEntryDate() {
        return moment.isMoment(this.entryDate) ? this.entryDate.format(formats.dateFormat) : this.entryDate
    }


    setLeavingDate(date) {
        if (moment.isMoment(date)){
            this.leavingDate = date
        } else {
            this.leavingDate = moment(date, formats.dateFormat)
            if (!this.leavingDate.isValid()){
                this.leavingDate = null
            }
        }
    }
    getLeavingDate() {
        return moment.isMoment(this.leavingDate) ? this.leavingDate.format(formats.dateFormat) : this.leavingDate
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            lastName: this.lastName,
            userName: this.userName,
            birthDate: this.getBirthDate(),
            entryDate: this.getEntryDate(),
            leavingDate: this.getLeavingDate(),
            contactNumber: this.contactNumber,
            nationality: this.nationality,
            address: this.address,
            email: this.email,
            nationalMatriculation: this.nationalMatriculation,
            provincialMatriculation: this.provincialMatriculation

        })
    }

    static fromJson(json = '{}') {
        if (!json){
            return new Doctor()
        }
        let object = typeof json === 'object' ? json : JSON.parse(json)
        const doctor = new Doctor()
        doctor.id = object.id || doctor.id
        doctor.setBirthDate (object.birthDate) 
        doctor.setEntryDate ( object.entryDate) 
        doctor.setLeavingDate( object.leavingDate)
        doctor.name = object.name || doctor.name
        doctor.lastName = object.lastName || doctor.lastName
        doctor.userName = object.userName || doctor.userName
        doctor.contactNumber = object.contactNumber || doctor.contactNumber
        doctor.nationality = object.nationality || doctor.nationality
        doctor.address = object.address || doctor.address
        doctor.email = object.email || doctor.email
        doctor.nationalMatriculation = object.nationalMatriculation || doctor.nationalMatriculation
        doctor.provincialMatriculation= object.provincialMatriculation || doctor.provincialMatriculation
        return doctor
    }

    static fromObject(object){
        if (!(object instanceof Doctor)){
            return Doctor.fromJson(object)
        }
        return object 
    }

}
module.exports = { Doctor }