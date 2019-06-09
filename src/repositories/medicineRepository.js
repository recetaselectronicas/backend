const {Medicine} = require('../domain/medicine')
const {newEntityAlreadyCreated} = require('../utils/errors')

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
}

module.exports = {
    MedicineRepository : new MedicineRepository()
}