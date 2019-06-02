const moment = require('moment')
const { formats } = require('../utils/utils')

class Plan {

    constructor() {
        this.id = null
        this.description = null
        this.entryDate = null
        this.leavingDate = null
        this.percentage = null
        this.idMedicalInsurance = null
    }

    setEntryDate(date) {
        if (moment.isMoment(date)) {
            this.entryDate = date
        } else {
            this.entryDate = moment(date, formats.dateFormat)
            if (!this.entryDate.isValid()) {
                this.entryDate = null
            }
        }
    }
    getEntryDate() {
        return moment.isMoment(this.entryDate) ? this.entryDate.format(formats.dateFormat) : this.entryDate
    }


    setLeavingDate(date) {
        if (moment.isMoment(date)) {
            this.leavingDate = date
        } else {
            this.leavingDate = moment(date, formats.dateFormat)
            if (!this.leavingDate.isValid()) {
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
            description: this.description,
            entryDate: this.getEntryDate(),
            leavingDate: this.getLeavingDate(),
            percentage: this.percentage,
            idMedicalInsurance: this.idMedicalInsurance
        })
    }

    static fromJson(json = '{}') {
        let object = typeof json === 'object' ? json : JSON.parse(json)
        const plan = new Plan()
        plan.id = object.id
        plan.description = object.description
        plan.setEntryDate(object.entryDate)
        plan.setLeavingDate(object.leavingDate)
        plan.percentage = object.percentage
        plan.idMedicalInsurance = object.idMedicalInsurance
        return plan
    }

}
module.exports = { Plan }