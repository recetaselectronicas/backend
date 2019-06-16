const { Affiliate } = require('../domain/affiliate')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')
const { generateNewSequencer } = require('../utils/utils')

const sequencer = generateNewSequencer()

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
      affiliate.id = sequencer.nextValue()
      this.affiliates.push(affiliate)
      return resolve(affiliate)
    })
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
