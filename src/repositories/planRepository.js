const { PLAN } = require('./tablesNames')
const knex = require('../init/knexConnection')

class PlanRepository {
  planExists(planId, medicalInsuranceId) {
    return knex
      .select('id')
      .from(PLAN)
      .where({
        id: planId,
        idMedicalInsurance: medicalInsuranceId
      })
      .limit(1)
      .first()
      .then(obj => !!(obj && obj.id))
  }
}

module.exports = { PlanRepository: new PlanRepository() }