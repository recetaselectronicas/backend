/* eslint-disable class-methods-use-this */
const { DOCTOR_REQUEST } = require('./tablesNames')
const knex = require('../init/knexConnection')
const { requestStatus } = require('./defaults')

class DoctorRequestRepository {
  create(linkRequest) {
    return knex
      .table(DOCTOR_REQUEST)
      .insert(linkRequest)
  }

  getRequests(idDoctor) {
    return knex
      .select('*')
      .from(DOCTOR_REQUEST)
      .where({ idDoctor })
  }

  hasPendingRequest(idDoctor, idMedicalInsurance) {
    return knex
      .select('id')
      .from(DOCTOR_REQUEST)
      .where({
        idDoctor,
        idMedicalInsurance,
        status: requestStatus.PENDING
      })
      .limit(1)
      .first()
      .then(ret => !!ret)
  }
}

module.exports = {
  DoctorRequestRepository: new DoctorRequestRepository()
}
