const {Prescription} = require('../domain/prescription')
const {newNotFoundError, newEntityAlreadyCreated} = require('../utils/errors')

class PrescriptionRepository {
    constructor(){
        this.prescriptions = []
    }

    reset(){
        return new Promise((resolve, reject) => {
            this.prescriptions = []
            return resolve()
        })
    }

    create(_prescription){
        return new Promise((resolve, reject) => {
            const prescription = Prescription.fromObject(_prescription)
            if (prescription.id){
                return reject(newEntityAlreadyCreated('Prescription allready created'))
            }
            prescription.id = Math.floor(Math.random() * 10000)
            this.prescriptions.push(prescription)
            return resolve(prescription)
        })
    }

    update(_prescription){
        return new Promise((resolve, reject) => {
            const prescription = Prescription.fromObject(_prescription)
            if (!prescription.id || !this.prescriptions.some((pres) => {return prescription.id === pres.id})){
                return reject(newNotFoundError('Prescription not found'))
            }
            this.prescriptions = this.prescriptions.filter((pres) => {
                return pres.id !== prescription.id
            })
            const newPrescription = Prescription.fromJson(prescription.toJson())
            this.prescriptions.push(newPrescription)
            return resolve(newPrescription)
        })
    }

    count(){
        return new Promise((resolve, reject) => {
            return resolve(this.prescriptions.length)
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

    getByStatus(status){
        return new Promise((resolve, reject) => {
            const prescriptions = this.prescriptions.filter((prescription) => {
                return prescription.status === status
            })
            return resolve(prescriptions)
        })
    }

    getByQuery(query){
        return new Promise((resolve, reject) => {
            return resolve([...this.prescriptions])
        })
    }
}

module.exports = {PrescriptionRepository: new PrescriptionRepository()}