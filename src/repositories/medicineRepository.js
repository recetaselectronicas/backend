const { Medicine } = require('../domain/medicine')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')

class MedicineRepository {
    constructor() {
        this.medicines = []
    }


    create(_medicine) {
        return new Promise((resolve, reject) => {
            const medicine = Medicine.fromObject(_medicine)
            if (medicine.id) {
                return reject(newEntityAlreadyCreated('Medicine allready created'))
            }
            medicine.id = Math.floor(Math.random() * 10000)
            this.medicines.push(medicine)
            return resolve(medicine)
        })
    }
    update(_medicine) {
        return new Promise((resolve, reject) => {
            const medicine = Medicine.fromObject(_medicine)
            if (!medicine.id || !this.medicines.some((med) => { return medicine.id === med.id })) {
                return reject(newNotFoundError('Medicine not found'))
            }
            this.medicines = this.medicines.filter((med) => {
                return med.id !== medicine.id
            })
            const newMedicine = Medicine.fromJson(medicine.toJson())
            this.medicines.push(newMedicine)
            return resolve(newMedicine)
        })
    }

    getById(id) {
        id = +id
        return new Promise((resolve, reject) => {
            const medicine = this.medicines.find((medicine) => {
                return medicine.id === id
            })
            if (medicine) {
                return resolve(Medicine.fromObject(medicine))
            }
            return reject(newNotFoundError(`No medicine was found with id ${id}`))
        })
    }

    getByExample(_medicine) {
        return new Promise((resolve, reject) => {
            const searchMedicine = Medicine.fromObject(_medicine)
            const medicines = this.medicines.filter((aMedicine) => {
                return searchMedicine.description && searchMedicine.description === aMedicine.description ||
                    searchMedicine.trquel && searchMedicine.troquel === aMedicine.troquel ||
                    searchMedicine.pharmaceuticalAction && searchMedicine.pharmaceuticalAction === aMedicine.pharmaceuticalAction ||
                    searchMedicine.entryDate && searchMedicine.entryDate === aMedicine.entryDate ||
                    searchMedicine.leavingDate && searchMedicine.leavingDate === aMedicine.leavingDate ||
                    searchMedicine.barCode && searchMedicine.barCode === aMedicine.barCode ||
                    searchMedicine.brandDescription && searchMedicine.brandDescription === aMedicine.brandDescription ||
                    searchMedicine.sizeDescription && searchMedicine.sizeDescription === aMedicine.sizeDescription ||
                    searchMedicine.presentationDescription && searchMedicine.presentationDescription === aMedicine.presentationDescription ||
                    searchMedicine.drugDescription && searchMedicine.drugDescription === aMedicine.drugDescription ||
                    searchMedicine.laboratoryDescription && searchMedicine.laboratoryDescription === aMedicine.laboratoryDescription ||
                    searchMedicine.potencyDescription && searchMedicine.potencyDescription === aMedicine.potencyDescription
            })
            return resolve(medicines)
        })
    }
    getAll() {
        return new Promise((resolve, reject) => {
            return resolve([...this.medicines])
        })
    }

    getByQuery(query) {
        return new Promise((resolve, reject) => {
            return resolve(this.medicines.filter(medicine => medicine.description.includes(query.description)))
        })
    }
}

module.exports = {
    MedicineRepository: new MedicineRepository()
}