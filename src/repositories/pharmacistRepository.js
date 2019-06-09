const {Pharmacist} = require('../domain/pharmacist')
const {newNotFoundError, newEntityAlreadyCreated} = require('../utils/errors')
const {generateNewSequencer} = require('../utils/utils')

const sequencer = generateNewSequencer()

class PharmacistRepository {
    constructor() {
        this.pharmacists = []
    }

    create(_pharmacist){
        return new Promise((resolve, reject) => {
            const pharmacist = Pharmacist.fromObject(_pharmacist)
            if (pharmacist.id) {
              return reject(newEntityAlreadyCreated('Pharmacist allready created'))
            }
            pharmacist.id = sequencer.nextValue()
            this.pharmacists.push(pharmacist)
            return resolve(pharmacist)
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            return resolve([...this.pharmacists])
        })
    }

    getById(id) {
        id = +id
        return new Promise((resolve, reject) => {
            const pharmacist = this.pharmacists.find((pharmacist) => {
                return pharmacist.id === id
            })
            if (pharmacist) {
                return resolve(Pharmacist.fromObject(pharmacist))
            }
            return reject(newNotFoundError(`No pharmacist was found with id ${id}`))
        })
    }
}
module.exports = {
    PharmacistRepository: new PharmacistRepository()
}