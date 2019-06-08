class AffiliateRepository {
    constructor() {
        this.affiliates = []
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