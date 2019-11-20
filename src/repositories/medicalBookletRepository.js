/* eslint-disable class-methods-use-this */
const knex = require('../init/knexConnection')
const { MEDICAL_BOOKLET, MEDICAL_INSURANCE, DOCTOR } = require('./tablesNames')
const { MedicalInsurance } = require('../domain/medicalInsurance')
const { Doctor } = require('../domain/doctor')
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

  getDoctorsFrom(idMedicalInsurance) {
    return knex
      .select()
      .table(MEDICAL_BOOKLET)
      .where({ idMedicalInsurance })
      .whereNull('to_date')
      .leftJoin(DOCTOR, `${MEDICAL_BOOKLET}.id_doctor`, `${DOCTOR}.id`)
      .then(response => response.map(doctor => Doctor.fromObject(doctor)))
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

  hasOrHadAnyLinkUp(idDoctor) {
    return knex
      .select('id_doctor')
      .table(MEDICAL_BOOKLET)
      .where({ idDoctor })
      .limit(1)
      .first()
      .then(id => !!id)
  }
}

module.exports = {
  MedicalBookletRepository: new MedicalBookletRepository(),
}
