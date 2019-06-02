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
        if (!json){
            return new MedicalInsurance()
        }
        let object = typeof json === 'object' ? json : JSON.parse(json)
        const medicalInsurance = new MedicalInsurance()
        medicalInsurance.id = object.id || medicalInsurance.id
        medicalInsurance.description = object.description || medicalInsurance.description
        medicalInsurance.userName = object.userName || medicalInsurance.userName
        medicalInsurance.corporateName = object.corporateName || medicalInsurance.corporateName
        medicalInsurance.email = object.email || medicalInsurance.email
        medicalInsurance.address = object.address || medicalInsurance.address
        medicalInsurance.contactNumber = object.contactNumber || medicalInsurance.contactNumber
        return medicalInsurance
    }

    static fromObject(object){
        if (!(object instanceof MedicalInsurance)){
            return MedicalInsurance.fromJson(object)
        }
        return object 
    }

}
module.exports = { MedicalInsurance }