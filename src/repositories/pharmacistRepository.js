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

  getById(id) {
    id = +id
    return new Promise((resolve, reject) => {
      const pharmacist = this.pharmacists.find(pharmacist => pharmacist.id === id)
      if (pharmacist) {
        return resolve(Pharmacist.fromObject(pharmacist))
      }
      return reject(newNotFoundError(`No pharmacist was found with id ${id}`))
    })
  }

  login(username, password) {
    return knex
      .select()
      .from(PHARMACIST)
      .where(`${PHARMACIST}.user_name`, username)
      .andWhere(`${PHARMACIST}.password`, password)
      .first()
      .then((response) => {
        if (!response) {
          throw newInvalidUsernameOrPasswordError('Usuario y/o contraseña invalido')
        }
        return response
      })
  }
}
module.exports = {
  PharmacistRepository: new PharmacistRepository()
}
