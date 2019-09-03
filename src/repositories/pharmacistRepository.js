const { Pharmacist } = require('../domain/pharmacist')
const { newNotFoundError, newEntityAlreadyCreated, newInvalidUsernameOrPasswordError } = require('../utils/errors')
const { generateNewSequencer } = require('../utils/utils')
const { PHARMACIST } = require('./tablesNames')
const knex = require('../init/knexConnection')

const sequencer = generateNewSequencer()

class PharmacistRepository {
  constructor() {
    this.pharmacists = []
  }

  create(_pharmacist) {
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
    return new Promise((resolve, reject) => resolve([...this.pharmacists]))
  }

  async getById(id) {
    const res = await knex.select()
      .from(PHARMACIST)
      .where({
        [`${PHARMACIST}.id`]: id,
      })
      .first()
    if (!res) {
      throw newNotFoundError(`No affiliate was found with id ${id}`)
    }
    const pharmacist = Pharmacist.fromObject(res)
    return pharmacist
  }
}

module.exports = {
  PharmacistRepository: new PharmacistRepository()
}
