/* eslint-disable class-methods-use-this */
const { Affiliate } = require('../domain/affiliate')
const { Plan } = require('../domain/plan')
const { newNotFoundError } = require('../utils/errors')
const { AFFILIATE, PATIENT, PLAN } = require('./tablesNames')
const knex = require('../init/knexConnection')
const { logger } = require('../utils/utils')

class AffiliateRepository {
  create(affiliate) {
    return knex
      .insert(affiliate)
      .into(AFFILIATE)
      .then(([id]) => id)
  }

  getByQuery(query) {
    const { medicalInsurance, code } = query
    return knex
      .select(`${AFFILIATE}.id`, `${AFFILIATE}.code`, `${AFFILIATE}.category `, `${PATIENT}.name`, `${PATIENT}.nic_number`, `${PATIENT}.surname`, `${PLAN}.id_medical_insurance`)
      .table(AFFILIATE)
      .where('code', 'like', `%${code}%`)
      .leftJoin(PATIENT, `${AFFILIATE}.id_patient`, `${PATIENT}.id`)
      .leftJoin(PLAN, `${AFFILIATE}.id_plan`, `${PLAN}.id`)
      .where(`${PLAN}.id_medical_insurance`, medicalInsurance)
      .then(response => response.map(affiliate => Affiliate.fromObject(affiliate)))
  }

  getById(id) {
    return knex
      .select(
        `${AFFILIATE}.id`,
        `${AFFILIATE}.from_date`,
        `${AFFILIATE}.to_date`,
        `${AFFILIATE}.code`,
        `${AFFILIATE}.category`,
        `${PATIENT}.id as id_patient`,
        `${PATIENT}.user_name`,
        `${PATIENT}.password`,
        `${PATIENT}.contact_number`,
        `${PATIENT}.name`,
        `${PATIENT}.surname`,
        `${PATIENT}.birth_date`,
        `${PATIENT}.gender`,
        `${PATIENT}.email`,
        `${PATIENT}.address`,
        `${PATIENT}.nationality`,
        `${PATIENT}.nic_number`,
        `${PATIENT}.nic_issue_date`,
        `${PATIENT}.nic_type`,
        `${PATIENT}.nic_exemplary`,
        `${PATIENT}.nic_photo`,
        `${PLAN}.id as id_plan`,
        `${PLAN}.description`,
        `${PLAN}.entry_date`,
        `${PLAN}.leaving_date`,
        `${PLAN}.percentage`,
        `${PLAN}.id_medical_insurance`
      )
      .from(AFFILIATE)
      .innerJoin(PATIENT, `${AFFILIATE}.id_patient`, `${PATIENT}.id`)
      .innerJoin(PLAN, `${AFFILIATE}.id_plan`, `${PLAN}.id`)
      .where({
        [`${AFFILIATE}.id`]: id
      })
      .first()
      .then((res) => {
        if (!res) {
          throw newNotFoundError(`No affiliate was found with id ${id}`)
        }
        const plan = { ...res }
        plan.id = res.idPlan
        plan.entryDate = res.entryDate
        plan.leavingDate = res.leavingDate
        const affiliate = Affiliate.fromObject(res)
        affiliate.plan = Plan.fromObject(plan)
        return affiliate
      })
      .catch((error) => {
        logger.error('error getting by id affiliate', error)
        throw newNotFoundError(`No affiliate was found with id ${id}`)
      })
  }
}

module.exports = {
  AffiliateRepository: new AffiliateRepository()
}
