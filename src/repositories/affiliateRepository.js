/* eslint-disable class-methods-use-this */
const { Affiliate } = require('../domain/affiliate')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')
const { AFFILIATE } = require('./tablesNames')
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
      image_credential: plainAffiliate.imageCredential,
    }

    return knex(AFFILIATE).insert(insertableAffiliate)
  }

  getAll() {
    return new Promise((resolve, reject) => resolve([...this.affiliates]))
  }

  getByQuery(query) {
    return new Promise((resolve, reject) => resolve(this.affiliates.filter(affiliate => affiliate.code.includes(query.credential || ''))))
  }

  getById(id) {
    id = +id
    return new Promise((resolve, reject) => {
      const affiliate = this.affiliates.find(affiliate => affiliate.id === id)
      if (affiliate) {
        return resolve(Affiliate.fromObject(affiliate))
      }
      return reject(newNotFoundError(`No affiliate was found with id ${id}`))
    })
  }
}
module.exports = {
  AffiliateRepository: new AffiliateRepository(),
}
