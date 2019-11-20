const { Pharmacist } = require('../domain/pharmacist')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')
const { PHARMACIST, RECEPTION } = require('./tablesNames')
const knex = require('../init/knexConnection')

class PharmacistRepository {
  create(_pharmacist) {
    const pharmacist = Pharmacist.fromObject(_pharmacist)
    if (pharmacist.id) {
      throw newEntityAlreadyCreated('Pharmacist allready created')
    }
    const insertablePharmacist = pharmacist.toPlainObject()
    insertablePharmacist.password = pharmacist.password
    delete insertablePharmacist.entryDate
    delete insertablePharmacist.leavingDate

    return knex(PHARMACIST)
      .insert(insertablePharmacist)
      .then(([id]) => id)
  }

  async getById(id) {
    const res = await knex
      .select()
      .from(PHARMACIST)
      .where({ id })
      .first()
    if (!res) {
      throw newNotFoundError(`No affiliate was found with id ${id}`)
    }
    const pharmacist = Pharmacist.fromObject(res)
    return pharmacist
  }

  userNameExists(userName) {
    return knex
      .select('id')
      .from(PHARMACIST)
      .where({ userName })
      .limit(1)
      .first()
      .then(obj => !!(obj && obj.id))
  }

  matriculationExists(matriculation) {
    return knex
      .select('id')
      .from(PHARMACIST)
      .where({ matriculation })
      .limit(1)
      .first()
      .then(obj => !!(obj && obj.id))
  }

  confirm(id) {
    return knex
      .table(PHARMACIST)
      .update({ confirmed: true })
      .where({ id })
      .then(updates => !!updates)
  }

  getByMedicalInsurance(idMedicalInsurance) {
    return knex
      .select(`${PHARMACIST}.*`)
      .from(RECEPTION)
      .where({ idMedicalInsurance })
      .whereNull(`${RECEPTION}.leaving_date`)
      .leftJoin(PHARMACIST, `${RECEPTION}.id_pharmacist`, `${PHARMACIST}.id`)
      .then(response => response.map(pharmacist => Pharmacist.fromObject(pharmacist)))
  }

  getByNicNumberAndGender(nicNumber, gender) {
    return knex
      .select()
      .from(PHARMACIST)
      .where({ nicNumber, gender })
      .then(pharmacists => pharmacists.map(pharmacist => Pharmacist.fromJson(pharmacist)))
  }

  getByMatriculation(matriculation) {
    return knex
      .select()
      .from(PHARMACIST)
      .where({ matriculation })
      .then(pharmacists => pharmacists.map(pharmacist => Pharmacist.fromJson(pharmacist)))
  }
}

module.exports = {
  PharmacistRepository: new PharmacistRepository()
}
