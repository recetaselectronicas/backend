/* eslint-disable class-methods-use-this */
const { DOCTOR_REQUEST, MEDICAL_INSURANCE } = require('./tablesNames')
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
      .leftJoin(MEDICAL_INSURANCE, `${DOCTOR_REQUEST}.id_medical_insurance`, `${MEDICAL_INSURANCE}.id`)
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

  getRequestsByMedicalInsurance(idMedicalInsurance) {
    return knex
      .select()
      .from(DOCTOR_REQUEST)
      .where({
        idMedicalInsurance,
      })
  }

  updateStatus(id, { status, reason = null }) {
    return knex
      .update({ status, reason })
      .from(DOCTOR_REQUEST)
      .where({ id })
  }

  getRequest(requestId) {
    return knex
      .select('*')
      .from(DOCTOR_REQUEST)
      .where({ id: requestId })
      .first()
  }
}

module.exports = {
  DoctorRequestRepository: new DoctorRequestRepository()
}
