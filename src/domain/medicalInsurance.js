const moment = require('moment')
const { formats } = require('../utils/utils')

class MedicalInsurance {
    constructor() {
        this.id = null
        this.description = null
        this.userName = null
        this.corporateName = null
        this.email = null
        this.address = null
        this.contactNumber = null
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            description: this.description,
            userName: this.userName,
            corporateName: this.corporateName,
            email: this.email,
            address: this.address,
            contactNumber: this.contactNumber
        })
    }

    static fromJson(json = '{}') {
        let object = typeof json === 'object' ? json : JSON.parse(json)
        const medicalInsurance = new MedicalInsurance()
        medicalInsurance.id = object.id
        medicalInsurance.description = object.description
        medicalInsurance.userName = object.userName
        medicalInsurance.corporateName = object.corporateName
        medicalInsurance.email = object.email
        medicalInsurance.address = object.address
        medicalInsurance.contactNumber = object.contactNumber
        return medicalInsurance
    }

}
module.exports = { MedicalInsurance }