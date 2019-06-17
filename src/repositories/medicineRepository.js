/* eslint-disable class-methods-use-this */
const { Medicine } = require('../domain/medicine')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')
const { MEDICINE } = require('./tablesNames')
const knex = require('../init/knexConnection')

class MedicineRepository {
  create(_medicine) {
    const medicine = Medicine.fromObject(_medicine)
    if (medicine.id) {
      throw newEntityAlreadyCreated('Medicine allready created')
    }

    const insertableMedicine = medicine.toPlainObject()
    delete insertableMedicine.brandDescription
    delete insertableMedicine.drugDescription
    delete insertableMedicine.laboratoryDescription
    delete insertableMedicine.potencyDescription
    delete insertableMedicine.presentationDescription
    delete insertableMedicine.sizeDescription

    return knex(MEDICINE)
      .insert(insertableMedicine)
      .then(([id]) => id)
      .catch(error => console.log('fatal error', error))
  }

  getAll() {
    return new Promise((resolve, reject) => resolve([...this.medicines]))
  }

  getByQuery(query) {
    return new Promise((resolve, reject) => resolve(this.medicines.filter(medicine => medicine.description.includes(query.description || ''))))
  }

  getById(id) {
    return knex(MEDICINE)
      .where('id', id)
      .first()
      .catch((error) => {
        console.log('fatal error', error)
        throw newNotFoundError(`No medicine was found with id ${id}`)
      })
  }
}

module.exports = {
  MedicineRepository: new MedicineRepository(),
}
