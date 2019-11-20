const { PLAN } = require('./tablesNames')
const { Plan } = require('../domain/plan')
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

  getAllPlansFor(idMedicalInsurance) {
    return knex
      .select()
      .from(PLAN)
      .where({
        idMedicalInsurance
      })
      .then(plans => plans.map(plan => Plan.fromJson(plan)))
  }
}

module.exports = { PlanRepository: new PlanRepository() }