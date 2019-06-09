const {Prescription} = require('../domain/prescription')
const {newNotFoundError, newEntityAlreadyCreated} = require('../utils/errors')
const {AffiliateRepository} = require('../repositories/affiliateRepository')
const {InstitutionRepository} = require('../repositories/institutionRepository')
const {MedicalInsuranceRepository} = require('../repositories/medicalInsuranceRepository')
const {MedicineRepository} = require('../repositories/medicineRepository')
const {DoctorRepository} = require('../repositories/doctorRepository')
const {PharmacistRepository} = require('../repositories/pharmacistRepository')
const {generateNewSequencer} = require('../utils/utils')

const sequencer = generateNewSequencer()

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
        return new Promise(async (resolve, reject) => {
            const prescription = Prescription.fromObject(_prescription).clone()
            if (prescription.id){
                return reject(newEntityAlreadyCreated('Prescription allready created'))
            }
            const errors = []
            try {
                prescription.setAffiliate(prescription.affiliate.id && await AffiliateRepository.getById(prescription.affiliate.id) || prescription.affiliate)
            } catch (error){errors.push(error)}
            try {
                prescription.setInstitution(prescription.institution.id && await InstitutionRepository.getById(prescription.institution.id || prescription.institution))
            } catch (error){errors.push(error)}
            try {
                prescription.setMedicalInsurance(prescription.medicalInsurance.id && await MedicalInsuranceRepository.getById(prescription.medicalInsurance.id || prescription.medicalInsurance))
            } catch (error){errors.push(error)}
            try {
                prescription.setDoctor(prescription.doctor.id && await DoctorRepository.getById(prescription.doctor.id || prescription.doctor))
            } catch (error){errors.push(error)}
            for(const item of prescription.items){
                try {
                    item.prescribed.medicine = item.prescribed.medicine.id && await MedicineRepository.getById(item.prescribed.medicine.id) || item.prescribed.medicine
                } catch (error){errors.push(error)}
                try {
                    item.received.medicine = item.received.medicine.id && await MedicineRepository.getById(item.received.medicine.id) || item.received.medicine
                } catch (error){errors.push(error)}
                try {
                    item.received.pharmacist = item.received.pharmacist.id && await PharmacistRepository.getById(item.received.pharmacist.id) || item.received.pharmacist
                } catch (error){errors.push(error)}
                try {
                    item.audited.medicine = item.audited.medicine.id && await MedicineRepository.getById(item.audited.medicine.id) || item.audited.medicine
                } catch (error){errors.push(error)}
            }
            if (errors.length){
                return reject(errors)
            }
            prescription.id = sequencer.nextValue()
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
        id = +id
        return new Promise((resolve, reject) => {
            const prescription = this.prescriptions.find((prescription) => {
                return prescription.id === id
            })
            if (prescription){
                return resolve(Prescription.fromObject(prescription))
            }
            return reject(newNotFoundError(`No prescription was found with id ${id}`))
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