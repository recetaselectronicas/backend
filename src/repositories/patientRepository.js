/* eslint-disable class-methods-use-this */
const { Patient } = require('../domain/patient')
const { newEntityAlreadyCreated } = require('../utils/errors')
const { PATIENT, AFFILIATE } = require('./tablesNames')
const knex = require('../init/knexConnection')
const { dateTimeFormat } = require('../utils/utils')

class PatientRepository {
  create(_patient) {
    const patient = Patient.fromObject(_patient)
    if (patient.id) {
      throw newEntityAlreadyCreated('Patient allready created')
    }
    const insertablePatient = patient.toPlainObject()
    insertablePatient.password = patient.password

    return knex(PATIENT)
      .insert(insertablePatient)
      .then(([id]) => id)
  }

  userNameExists(userName) {
    return knex
      .select('id')
      .from(PATIENT)
      .where({ userName })
      .limit(1)
      .first()
      .then(obj => !!(obj && obj.id))
  }

  confirm(id) {
    return knex
      .table(PATIENT)
      .update({ confirmed: true })
      .where({ id })
      .then(updates => !!updates)
  }

  isAbleToAffiliate(patientId, datetime) {
    return knex
      .select('id')
      .from(AFFILIATE)
      .where({
        idPatient: patientId,
      })
      .whereRaw('(to_date is null or from_date >= ?)', [dateTimeFormat.toMysqlString(datetime)])
      .limit(1)
      .first()
      .then(obj => !(obj && obj.id))
  }

  getById(patientId) {
    return knex
      .select('*')
      .from(PATIENT)
      .where({ id: patientId })
      .limit(1)
      .first()
      .then((patient) => {
        if (patient) {
          return Patient.fromObject(patient)
        }
        return patient
      })
  }
}

module.exports = {
  PatientRepository: new PatientRepository()
}
