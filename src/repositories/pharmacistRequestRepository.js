

/* eslint-disable class-methods-use-this */
const { PHARMACIST_REQUEST } = require('./tablesNames')
const knex = require('../init/knexConnection')
const { requestStatus } = require('./defaults')

class PharmacistRequestRepository {
  create(pharmacistRequest) {
    return knex
      .table(PHARMACIST_REQUEST)
      .insert(pharmacistRequest)
  }

  getRequests(idPharmacist) {
    return knex
      .select('*')
      .from(PHARMACIST_REQUEST)
      .where({ idPharmacist })
  }

  getRequest(requestId) {
    return knex
      .select('*')
      .from(PHARMACIST_REQUEST)
      .where({ id: requestId })
      .first()
  }

  hasPendingRequest(idPharmacist) {
    return knex
      .select('id')
      .from(PHARMACIST_REQUEST)
      .where({
        idPharmacist,
        status: requestStatus.PENDING
      })
      .limit(1)
      .first()
      .then(ret => !!ret)
  }

  updateStatus(id, { status, reason = null }) {
    return knex
      .update({ status, reason })
      .from(PHARMACIST_REQUEST)
      .where({ id })
  }

  getRequestsByMedicalInsurance(idMedicalInsurance) {
    return knex
      .select()
      .from(PHARMACIST_REQUEST)
      .where({
        idMedicalInsurance,
      })
  }
}

module.exports = {
  PharmacistRequestRepository: new PharmacistRequestRepository()
}
