/* eslint-disable class-methods-use-this */
const knex = require('../init/knexConnection')
const { MEDICAL_BOOKLET, MEDICAL_INSURANCE } = require('./tablesNames')
const { MedicalInsurance } = require('../domain/medicalInsurance')

class MedicalBookletRepository {
  getMedicalInsurancesFrom(idDoctor) {
    return knex
      .select()
      .table(MEDICAL_BOOKLET)
      .where({ idDoctor })
      .leftJoin(MEDICAL_INSURANCE, `${MEDICAL_BOOKLET}.id_medical_insurance`, `${MEDICAL_INSURANCE}.id`)
      .then(response => response.map(medicalInsurance => MedicalInsurance.fromObject(medicalInsurance)))
  }
}

module.exports = {
  MedicalBookletRepository: new MedicalBookletRepository(),
}
