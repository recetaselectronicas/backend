/* eslint-disable class-methods-use-this */
const { MedicalInsurance } = require('../domain/medicalInsurance')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')
const knex = require('../init/knexConnection')
const { MEDICAL_INSURANCE, MEDICAL_BOOKLET } = require('./tablesNames')

class MedicalInsuranceRepository {
  constructor() {
    this.medicalInsurances = []
  }

  create(_medicalInsurance) {
    const medicalInsurance = MedicalInsurance.fromObject(_medicalInsurance)
    if (medicalInsurance.id) {
      throw newEntityAlreadyCreated('Medical Insurance allready created')
    }
    return knex(MEDICAL_INSURANCE)
      .insert({ ...medicalInsurance })
      .then(([id]) => id)
  }

  getAll() {
    return knex
      .select()
      .table(MEDICAL_INSURANCE)
      .then(response => response.map(medicalInsurance => MedicalInsurance.fromObject(medicalInsurance)))
  }

  getMedicalInsuranceByMedic(doctorId) {
    return knex
      .select()
      .table(MEDICAL_BOOKLET)
      .where(`${MEDICAL_BOOKLET}.id_doctor`, Number.parseInt(doctorId, 10))
      .leftJoin(MEDICAL_INSURANCE, `${MEDICAL_BOOKLET}.id_medical_insurance`, `${MEDICAL_INSURANCE}.id`)
      .then(response => response.map(medicalInsurance => MedicalInsurance.fromObject(medicalInsurance)))
  }

  getById(id) {
    return knex
      .select()
      .table(MEDICAL_INSURANCE)
      .where('id', id)
      .first()
      .catch((error) => {
        console.log('error getting by id medical insurance', error)
        throw newNotFoundError(`No medicalInsurance was found with id ${id}`)
      })
  }
}

module.exports = {
  MedicalInsuranceRepository: new MedicalInsuranceRepository()
}
