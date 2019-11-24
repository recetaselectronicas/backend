

/* eslint-disable class-methods-use-this */
const { PHARMACIST_REQUEST, MEDICAL_INSURANCE, PHARMACIST } = require('./tablesNames')
const knex = require('../init/knexConnection')
const { requestStatus } = require('./defaults')
const { Pharmacist } = require('../domain/pharmacist')

class PharmacistRequestRepository {
  create(pharmacistRequest) {
    return knex
      .table(PHARMACIST_REQUEST)
      .insert(pharmacistRequest)
  }

  getRequests(idPharmacist) {
    return knex
      .select(`${PHARMACIST_REQUEST}.id as idRequest`)
      .select(`${PHARMACIST_REQUEST}.*`)
      .select(`${MEDICAL_INSURANCE}.*`)
      .from(PHARMACIST_REQUEST)
      .where({ idPharmacist })
      .leftJoin(MEDICAL_INSURANCE, `${PHARMACIST_REQUEST}.id_medical_insurance`, `${MEDICAL_INSURANCE}.id`)
  }

  getRequest(requestId) {
    return knex
      .select()
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
      .select(`${PHARMACIST_REQUEST}.id as idRequest`)
      .select(`${PHARMACIST_REQUEST}.*`)
      .select(`${PHARMACIST}.*`)
      .from(PHARMACIST_REQUEST)
      .where({
        idMedicalInsurance,
      })
      .leftJoin(PHARMACIST, `${PHARMACIST_REQUEST}.id_pharmacist`, `${PHARMACIST}.id`)
      .then(requests => requests.map(request => {
        const user = Pharmacist.fromJson(request)
        const { idRequest, status, reason, dateCreated } = request
        return {
          idRequest,
          status,
          reason,
          dateCreated,
          ...user.toPlainObject(),
        }
      }))
  }
}

module.exports = {
  PharmacistRequestRepository: new PharmacistRequestRepository()
}
