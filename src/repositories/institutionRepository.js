/* eslint-disable class-methods-use-this */
const { Institution } = require('../domain/institution')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')
const knex = require('../init/knexConnection')
const { INSTITUTION } = require('./tablesNames')

class InstitutionRepository {
  constructor() {
    this.institutions = []
  }

  create(_institution) {
    const institution = Institution.fromObject(_institution)
    if (institution.id) {
      throw newEntityAlreadyCreated('Institution allready created')
    }
    return knex(INSTITUTION)
      .insert(institution.toPlainObject())
      .then(([id]) => id)
  }

  getAll() {
    return knex
      .select()
      .table(INSTITUTION)
      .then(response => response.map(medicalInsurance => Institution.fromObject(medicalInsurance)))
  }

  getById(id) {
    throw 'should implement this method !'
  }
}

module.exports = {
  InstitutionRepository: new InstitutionRepository(),
}
