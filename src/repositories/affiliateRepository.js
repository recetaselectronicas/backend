/* eslint-disable class-methods-use-this */
const { Affiliate } = require('../domain/affiliate')
const { Plan } = require('../domain/plan')
const { newNotFoundError } = require('../utils/errors')
const { AFFILIATE, PATIENT, PLAN, MEDICAL_INSURANCE } = require('./tablesNames')
const knex = require('../init/knexConnection')
const { logger } = require('../utils/utils')
const { dateTimeFormat } = require('../utils/utils')

class AffiliateRepository {
  create(affiliate) {
    return knex
      .insert(affiliate)
      .into(AFFILIATE)
      .then(([id]) => id)
  }

  getByQuery(query) {
    const { medicalInsurance, code, datetime } = query
    return knex
      .select(
        `${AFFILIATE}.id`,
        `${AFFILIATE}.code`,
        `${AFFILIATE}.category `,
        `${AFFILIATE}.from_date `,
        `${AFFILIATE}.to_date `,
        `${PATIENT}.id as id_patient`,
        `${PATIENT}.name`,
        `${PATIENT}.surname`,
        `${PATIENT}.userName`,
        `${PATIENT}.birthDate`,
        `${PATIENT}.gender`,
        `${PATIENT}.nic_number`,
        `${PLAN}.id_medical_insurance`
      ).table(AFFILIATE)
      .where('code', 'like', `%${code}%`)
      .andWhereRaw(`? between ${AFFILIATE}.from_date and IFNULL(${AFFILIATE}.to_date, ?)`, [dateTimeFormat.toMysqlString(datetime), dateTimeFormat.toMysqlString(datetime)])
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

  getCurrentAffiliation(patientId, datetime) {
    return knex
      .select('id')
      .from(AFFILIATE)
      .where({
        idPatient: patientId
      })
      .whereRaw('(? between from_date and IFNULL(to_date, ?))', [dateTimeFormat.toMysqlString(datetime), dateTimeFormat.toMysqlString(datetime)])
      .limit(1)
      .first()
      .then(res => (res && res.id && this.getById(res.id)) || null)
  }

  getCurrentAffiliationWithAllData(patientId, datetime) {
    return knex
      .select()
      .from(AFFILIATE)
      .where({
        idPatient: patientId
      })
      .whereRaw('(? between from_date and IFNULL(to_date, ?))', [dateTimeFormat.toMysqlString(datetime), dateTimeFormat.toMysqlString(datetime)])
      .leftJoin(PLAN, `${AFFILIATE}.id_plan`, `${PLAN}.id`)
      .leftJoin(MEDICAL_INSURANCE, `${PLAN}.id_medical_insurance`, `${MEDICAL_INSURANCE}.id`)
      .limit(1)
      .first()
  }

  unAffiliate(affiliateId, datetime) {
    return knex
      .table(AFFILIATE)
      .update({
        toDate: datetime
      })
      .where({
        id: affiliateId
      })
  }

  credentialExists(code, category) {
    return knex
      .select('id')
      .from(AFFILIATE)
      .where({
        code,
        category
      })
      .limit(1)
      .first()
      .then(id => !!id)
  }

  getAffiliations(patientId) {
    return knex
      .select(
        `${AFFILIATE}.id`,
        `${AFFILIATE}.id_patient`,
        `${AFFILIATE}.code`,
        `${AFFILIATE}.category `,
        `${AFFILIATE}.from_date `,
        `${AFFILIATE}.to_date `,
        `${PLAN}.id as id_plan`,
        `${PLAN}.id_medical_insurance`,
        `${PLAN}.percentage`,
      )
      .from(AFFILIATE)
      .leftJoin(PLAN, `${AFFILIATE}.id_plan`, `${PLAN}.id`)
      .where({
        idPatient: patientId
      })
      .orderBy('from_date', 'asc')
      .then(affiliates => affiliates.map((affiliate) => {
        // eslint-disable-next-line no-param-reassign
        affiliate.plan = {
          id: affiliate.idPlan,
          idMedicalInsurance: affiliate.idMedicalInsurance,
          percentage: affiliate.percentage
        }
        return affiliate
      }))
      .then(affiliates => affiliates.map(affiliate => Affiliate.fromObject(affiliate)))
  }

  hasOrHadAnyAffiliation(patientId) {
    return knex
      .select('id')
      .from(AFFILIATE)
      .where({ idPatient: patientId })
      .limit(1)
      .first()
      .then(id => !!id)
  }

  getByMedicalInsurance(idMedicalInsurance) {
    return knex
      .select()
      .from(PLAN)
      .where({ idMedicalInsurance })
      .whereNull('to_date')
      .rightJoin(AFFILIATE, `${AFFILIATE}.id_plan`, `${PLAN}.id`)
      .leftJoin(PATIENT, `${PATIENT}.id`, `${AFFILIATE}.id_patient`)
      .then(affiliates => affiliates.map((affiliate) => {
        // eslint-disable-next-line no-param-reassign
        affiliate.plan = {
          id: affiliate.idPlan,
        }
        return Affiliate.fromObject(affiliate)
      }))
  }
}

module.exports = {
  AffiliateRepository: new AffiliateRepository()
}
