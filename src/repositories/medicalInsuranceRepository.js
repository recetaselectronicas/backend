const { MedicalInsurance } = require('../domain/medicalInsurance')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')
const {generateNewSequencer} = require('../utils/utils')

const sequencer = generateNewSequencer()

class MedicalInsuranceRepository {
    constructor() {
        this.medicalInsurances = []
    }

    create(_medicalInsurance) {
        return new Promise((resolve, reject) => {
            const medicalInsurance = MedicalInsurance.fromObject(_medicalInsurance)
            if (medicalInsurance.id) {
                return reject(newEntityAlreadyCreated('Medical Insurance allready created'))
            }
            medicalInsurance.id = sequencer.nextValue()
            this.medicalInsurances.push(medicalInsurance)
            return resolve(medicalInsurance)
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            return resolve([...this.medicalInsurances])
        })
    }
    getMedicalInsuranceByMedic(doctorId) {
        return new Promise((resolve, reject) => {
            return resolve([...this.medicalInsurances])
        })
    }

    getById(id) {
        id = +id
        return new Promise((resolve, reject) => {
            const medicalInsurance = this.medicalInsurances.find((medicalInsurance) => {
                return medicalInsurance.id === id
            })
            if (medicalInsurance) {
                return resolve(MedicalInsurance.fromObject(medicalInsurance))
            }
            return reject(newNotFoundError(`No medicalInsurance was found with id ${id}`))
        })
    }
}

module.exports = {
    MedicalInsuranceRepository: new MedicalInsuranceRepository()
}
