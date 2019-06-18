const { AffiliateCriteria } = require('./affiliateCriteria')

class AffiliateGenderCriteria extends AffiliateCriteria {
  getAttributeValue() {
    return this.prescription.affiliate.gender
  }

  getAttribute() {
    return 'GENDER'
  }
}

module.exports = { AffiliateGenderCriteria }