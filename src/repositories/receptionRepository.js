/* eslint-disable class-methods-use-this */
const knex = require('../init/knexConnection')
const { MedicalInsurance } = require('../domain/medicalInsurance')
const { RECEPTION, MEDICAL_INSURANCE } = require('./tablesNames')

class ReceptionRepository {
  getMedicalInsurancesFrom(id) {
    return knex
      .table(RECEPTION)
      .where({ id_pharmacist: id })
      .whereNull('leaving_date')
      .leftJoin(MEDICAL_INSURANCE, `${RECEPTION}.id_medical_insurance`, `${MEDICAL_INSURANCE}.id`)
      .then(response => response.map(medicalInsurance => MedicalInsurance.fromObject(medicalInsurance)))
  }


  linkPharmacist(link, entryDate) {
    return knex(RECEPTION)
      .insert({ ...link, entryDate })
  }

  getLink(idPharmacist, idMedicalInsurance) {
    return knex
      .select()
      .table(RECEPTION)
      .where({ idPharmacist, idMedicalInsurance })
      .whereNull('leaving_date')
      .first()
  }

  unlink(idPharmacist, idMedicalInsurance, leavingDate) {
    return knex
      .table(RECEPTION)
      .update({
        leavingDate
      })
      .where({
        idPharmacist, idMedicalInsurance
      })
  }

  link(link, entryDate) {
    return knex(RECEPTION)
      .insert({ ...link, entryDate })
  }

  hasOrHadAnyLinkUp(idPharmacist) {
    return knex
      .select('id_pharmacist')
      .table(RECEPTION)
      .where({ idPharmacist })
      .limit(1)
      .first()
      .then(id => !!id)
  }
}

module.exports = {
  ReceptionRepository: new ReceptionRepository(),
}
