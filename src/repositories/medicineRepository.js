const {Medicine} = require('../domain/medicine')
const {newNotFoundError, newEntityAlreadyCreated} = require('../utils/errors')

class MedicineRepository {
    constructor() {
        this.medicines = []
    }

    create(_medicine){
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

    getAll() {
        return new Promise((resolve, reject) => {
            return resolve([...this.medicines])
        })
    }

    getByQuery(query) {
        return new Promise((resolve, reject) => {
            return resolve(this.medicines.filter(medicine => medicine.description.includes(query.description || '')))
        })
    }

    getById(id){
        id = +id
        return new Promise((resolve, reject) => {
            const medicine = this.medicines.find((medicine) => {
                return medicine.id === id
            })
            if (medicine){
                return resolve(Medicine.fromObject(medicine))
            }
            return reject(newNotFoundError(`No medicine was found with id ${id}`))
        })
    }
}

module.exports = {
    MedicineRepository : new MedicineRepository()
}