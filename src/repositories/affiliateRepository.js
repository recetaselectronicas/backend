const {Affiliate} = require('../domain/affiliate')
const {newEntityAlreadyCreated} = require('../utils/errors')

class AffiliateRepository {
    constructor() {
        this.affiliates = []
    }

    create(_affiliate){
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

    getAll() {
        return new Promise((resolve, reject) => {
            return resolve([...this.affiliates])
        })
    }

    getByQuery(query) {
        return new Promise((resolve, reject) => {
            return resolve(this.affiliates.filter(affiliate => affiliate.code.includes(query.credential || '')))
        })
    }
}
module.exports = {
    AffiliateRepository: new AffiliateRepository()
}