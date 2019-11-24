/* eslint-disable class-methods-use-this */
const { AFFILIATE_REQUEST, MEDICAL_INSURANCE, PLAN, PATIENT } = require('./tablesNames')
const knex = require('../init/knexConnection')
const { requestStatus } = require('./defaults')
const { Patient } = require('../domain/patient')

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
      .select(`${AFFILIATE_REQUEST}.id as idRequest`)
      .select(`${AFFILIATE_REQUEST}.*`)
      .select(`${MEDICAL_INSURANCE}.*`)
      .from(AFFILIATE_REQUEST)
      .where({ idPatient: patientId })
      .leftJoin(PLAN, `${AFFILIATE_REQUEST}.id_plan`, `${PLAN}.id`)
      .leftJoin(MEDICAL_INSURANCE, `${PLAN}.id_medical_insurance`, `${MEDICAL_INSURANCE}.id`)
  }

  getRequestsByMedicalInsurance(medicalInsuranceId) {
    return knex
      .select(`${PATIENT}.*`)
      .select(`${AFFILIATE_REQUEST}.id as idRequest`)
      .select(`${AFFILIATE_REQUEST}.*`)
      .from(AFFILIATE_REQUEST)
      .leftJoin(PATIENT, `${AFFILIATE_REQUEST}.id_patient`, `${PATIENT}.id`)
      .leftJoin(PLAN, `${AFFILIATE_REQUEST}.id_plan`, `${PLAN}.id`)
      .leftJoin(MEDICAL_INSURANCE, `${PLAN}.id_medical_insurance`, `${MEDICAL_INSURANCE}.id`)
      .where(`${MEDICAL_INSURANCE}.id`, medicalInsuranceId)
      .then(requests => requests.map(request => {
        const user = Patient.fromJson(request)
        const { idRequest, code, status, reason, imageCredential, category, dateCreated } = request
        return {
          idRequest,
          code,
          status,
          reason,
          imageCredential,
          category,
          dateCreated,
          ...user.toPlainObject()
        }
      }))
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
