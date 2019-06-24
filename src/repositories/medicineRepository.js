/* eslint-disable class-methods-use-this */
const { Medicine } = require('../domain/medicine')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')
const { MEDICINE, BRAND, SHAPE, SIZE, LABORATORY, POTENCY, DRUG } = require('./tablesNames')
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

  async getById(id) {
    const res = await knex
      .select().from(MEDICINE).debug(true)
      .join(BRAND, `${BRAND}.id`, `${MEDICINE}.id_brand`)
      .join(SHAPE, `${SHAPE}.id`, `${MEDICINE}.id_shape`)
      .join(SIZE, `${SIZE}.id`, `${MEDICINE}.id_size`)
      .join(LABORATORY, `${LABORATORY}.id`, `${MEDICINE}.id_laboratory`)
      .join(POTENCY, `${POTENCY}.id`, `${MEDICINE}.id_potency`)
      .join(DRUG, `${DRUG}.id`, `${MEDICINE}.id_drug`)
      .where({
        [`${MEDICINE}.id`]: id
      })
      .first()
      .debug(true)
    if (!res) {
      throw newNotFoundError(`No medicine was found with id ${id}`)
    }
    console.log(res)
    const medicine = Medicine.fromObject(res)
    return medicine
  }
}

module.exports = {
  MedicineRepository: new MedicineRepository()
}
