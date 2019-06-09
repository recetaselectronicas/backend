const { Affiliate } = require('../domain/affiliate')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')

class AffiliateRepository {
    constructor() {
        this.affiliates = []
    }

    create(_affiliate) {
        return new Promise((resolve, reject) => {
            const affiliate = Affiliate.fromObject(_affiliate)
            if (affiliate.id) {
                return reject(newEntityAlreadyCreated('Affiliate allready created'))
            }
            affiliate.id = Math.floor(Math.random() * 10000)
            this.affiliates.push(affiliate)
            return resolve(affiliate)
        })
    }
    update(_affiliate) {
        return new Promise((resolve, reject) => {
            const affiliate = Affiliate.fromObject(_affiliate)
            if (!affiliate.id || !this.affiliates.some((aff) => { return affiliate.id === aff.id })) {
                return reject(newNotFoundError('Affiliate not found'))
            }
            this.affiliates = this.affiliates.filter((aff) => {
                return aff.id !== affiliate.id
            })
            const newAffiliate = Affiliate.fromJson(affiliate.toJson())
            this.affiliates.push(newAffiliate)
            return resolve(newAffiliate)
        })
    }

    getById(id) {
        id = +id
        return new Promise((resolve, reject) => {
            const affiliates = this.affiliates.find((affiliate) => {
                return affiliate.id === id
            })
            if (affiliate) {
                return resolve(Affiliate.fromObject(affiliate))
            }
            return reject(newNotFoundError(`No Affiliate was found with id ${id}`))
        })
    }

    getByExample(_affiliate) {
        return new Promise((resolve, reject) => {
            const searchAffiliate = Affiliate.fromObject(_affiliate)
            const affiliates = this.affiliates.filter((aAffiliate) => {
                return searchAffiliate.idPatient && searchAffiliate.idPatient === aAffiliate.idPatient ||
                    searchAffiliate.name && searchAffiliate.name === aAffiliate.name ||
                    searchAffiliate.surname && searchAffiliate.surname === aAffiliate.surname ||
                    searchAffiliate.userName && searchAffiliate.userName === aAffiliate.userName ||
                    searchAffiliate.birthDate && searchAffiliate.birthDate === aAffiliate.birthDate ||
                    searchAffiliate.code && searchAffiliate.code === aAffiliate.code ||
                    searchAffiliate.plan && searchAffiliate.plan.id === aAffiliate.plan.id
            })
            return resolve(affiliates)
        })
    }
    getAll() {
        return new Promise((resolve, reject) => {
            return resolve([...this.affiliates])
        })
    }

    getByQuery(query) {
        return new Promise((resolve, reject) => {
            return resolve(this.affiliates.filter(affiliate => affiliate.code.includes(query.credential)))
        })
    }
}
module.exports = {
    AffiliateRepository: new AffiliateRepository()
}