/* eslint-disable class-methods-use-this */
const { AFFILIATE_REQUEST, PATIENT, PLAN } = require('./tablesNames')
const knex = require('../init/knexConnection')
const { requestStatus } = require('./defaults')

class AffiliateRequestRepository {
  create(affiliateRequest) {
    return knex
      .table(AFFILIATE_REQUEST)
      .insert(affiliateRequest)
  }

  hasPendingRequest(patientId) {
    return knex
      .select('id')
      .from(AFFILIATE_REQUEST)
      .where({
        idPatient: patientId,
        status: requestStatus.PENDING
      })
      .limit(1)
      .first()
      .then(ret => !!ret)
  }

  getRequests(patientId) {
    return knex
      .select('*')
      .from(AFFILIATE_REQUEST)
      .where({ idPatient: patientId })
  }

  getRequestsByMedicalInsurance(medicalInsuranceId) {
    return knex
      .raw(`select af.* from ${AFFILIATE_REQUEST} af, ${PLAN} p where p.id_medical_insurance = ${medicalInsuranceId} and af.id_plan = p.id`)
      .then(res => (res && res.length && res[0]) || res)
  }

  updateStatus(id, { status, reason = null }) {
    return knex
      .update({ status, reason })
      .from(AFFILIATE_REQUEST)
      .where({ id })
  }

  requestBelongsTo(requestId, patientId) {
    return knex
      .select('id')
      .from(AFFILIATE_REQUEST)
      .where({ id: requestId, idPatient: patientId })
      .limit(1)
      .first()
      .then(val => !!val)
  }

  getRequest(requestId) {
    return knex
      .select('*')
      .from(AFFILIATE_REQUEST)
      .where({ id: requestId })
      .limit(1)
      .first()
  }
}

module.exports = {
  AffiliateRequestRepository: new AffiliateRequestRepository()
}
