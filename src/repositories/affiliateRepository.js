/* eslint-disable class-methods-use-this */
const { Affiliate } = require('../domain/affiliate')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')
const { AFFILIATE, PATIENT, PLAN } = require('./tablesNames')
const knex = require('../init/knexConnection')

class AffiliateRepository {
  constructor() {
    this.affiliates = []
  }

  create(_affiliate) {
    const affiliate = Affiliate.fromObject(_affiliate)
    if (affiliate.id) {
      throw newEntityAlreadyCreated('Affiliate allready created')
    }
    const plainAffiliate = affiliate.toPlainObject()

    const insertableAffiliate = {
      id_patient: plainAffiliate.idPatient,
      id_plan: plainAffiliate.plan.id,
      from_date: plainAffiliate.fromDate,
      to_date: plainAffiliate.toDate,
      code: plainAffiliate.code,
      category: plainAffiliate.category,
      image_credential: plainAffiliate.imageCredential
    }

    return knex(AFFILIATE)
      .insert(insertableAffiliate)
      .then(([id]) => id)
  }

  getAll() {
    return new Promise((resolve, reject) => resolve([...this.affiliates]))
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
      .select()
      .table(AFFILIATE)
      .where('id', id)
      .first()
      .catch((error) => {
        console.log('error getting by id affiliate', error)
        throw newNotFoundError(`No affiliate was found with id ${id}`)
      })
  }
}
module.exports = {
  AffiliateRepository: new AffiliateRepository()
}
