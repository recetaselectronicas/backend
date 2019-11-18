/* eslint-disable class-methods-use-this */
const knex = require('../init/knexConnection')
const { MEDICAL_BOOKLET, MEDICAL_INSURANCE } = require('./tablesNames')
const { MedicalInsurance } = require('../domain/medicalInsurance')
const { dateTimeFormat } = require('../utils/utils')

class MedicalBookletRepository {
  getMedicalInsurancesFrom(idDoctor) {
    return knex
      .select()
      .table(MEDICAL_BOOKLET)
      .where({ idDoctor })
      .whereNull('to_date')
      .leftJoin(MEDICAL_INSURANCE, `${MEDICAL_BOOKLET}.id_medical_insurance`, `${MEDICAL_INSURANCE}.id`)
      .then(response => response.map(medicalInsurance => MedicalInsurance.fromObject(medicalInsurance)))
  }

  getLink(idDoctor, idMedicalInsurance, datetime) {
    return knex
      .select()
      .table(MEDICAL_BOOKLET)
      .where({ idDoctor, idMedicalInsurance })
      .whereNull('to_date')
      .first()
  }

  unlink(idDoctor, idMedicalInsurance, toDate) {
    return knex
      .table(MEDICAL_BOOKLET)
      .update({
        toDate
      })
      .where({
        idDoctor, idMedicalInsurance
      })
  }

  link(link, fromDate) {
    return knex(MEDICAL_BOOKLET)
      .insert({ ...link, fromDate })
  }
}

module.exports = {
  MedicalBookletRepository: new MedicalBookletRepository(),
}
