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
  }

  getAll() {
    return new Promise((resolve, reject) => resolve([...this.medicines]))
  }

  getByQuery(query) {
    const { description } = query
    return knex(MEDICINE)
      .select()
      .where('description', 'like', `%${description}%`)
      .then(response => response.map(medicine => Medicine.fromObject(medicine)))
  }

  getByTroquel(troquel) {
    return knex(MEDICINE)
      .select()
      .where('troquel', troquel)
      .first()
      .then((response) => {
        if (response) {
          return Medicine.fromObject(response)
        }
        throw newNotFoundError(`No se encontro la medicina con el troquel ${troquel}`)
      })
  }

  getById(id) {
    return knex(MEDICINE)
      .where('id', id)
      .first()
      .catch((error) => {
        throw newNotFoundError(`No medicine was found with id ${id}`)
      })
  }
}

module.exports = {
  MedicineRepository: new MedicineRepository()
}
