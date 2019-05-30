const {Prescription} = require('../domain/prescription')

class PrescriptionRepository {
    constructor(){
        this.prescriptions = []
    }

    create(_prescription){
        return new Promise((resolve, reject) => {
            const prescription = Prescription.fromObject(_prescription)
            if (prescription.id){
                return reject({error: 'Prescription allready created'})
            }
            prescription.id = Math.floor(Math.random() * 1000)
            this.prescriptions.push(prescription)
            return resolve(prescription)
        })
    }

    update(_prescription){
        return new Promise((resolve, reject) => {
            const prescription = Prescription.fromObject(_prescription)
            return resolve(prescription)
        })
    }

    getAll(){
        return new Promise((resolve, reject) => {
            return resolve([...this.prescriptions])
        })
    }

    getById(id){
        return new Promise((resolve, reject) => {
            const prescription = this.prescriptions.find((prescription) => {
                return prescription.id === id
            })
            if (prescription){
                return resolve(prescription)
            }
            return reject()
        })
    }

    getByExample(_prescription){
        return new Promise((resolve, reject) => {
            const searchedPrescription = Prescription.fromObject(_prescription)
            const prescriptions = this.prescriptions.filter((aPrescription) => {
                return searchedPrescription.issueDate && searchedPrescription.issueDate === aPrescription.issueDate ||
                    searchedPrescription.soldDate && searchedPrescription.soldDate === aPrescription.soldDate ||
                    searchedPrescription.auditedDate && searchedPrescription.auditedDate === aPrescription.auditedDate ||
                    searchedPrescription.institution && searchedPrescription.institution.id === aPrescription.institution.id ||
                    searchedPrescription.affiliate && searchedPrescription.affiliate.id === aPrescription.affiliate.id ||
                    searchedPrescription.doctor && searchedPrescription.doctor.id === aPrescription.doctor.id ||
                    searchedPrescription.medicalInsurance && searchedPrescription.medicalInsurance.id === aPrescription.medicalInsurance.id
            })
            return resolve(prescriptions)
        })
    }
}

module.exports = {PrescriptionRepository: new PrescriptionRepository()}