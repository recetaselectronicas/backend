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
      .whereRaw('(to_date is null or from_date <= ?)', [dateTimeFormat.toMysqlString(datetime)])
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
}

module.exports = {
  MedicalBookletRepository: new MedicalBookletRepository(),
}
