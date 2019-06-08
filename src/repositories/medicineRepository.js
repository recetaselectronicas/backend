class MedicineRepository {
    constructor() {
        this.medicines = []
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
    MedicineRepository : new MedicineRepository()
}