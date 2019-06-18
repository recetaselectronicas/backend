const { AffiliateCriteria } = require('./affiliateCriteria')

class AffiliateNationalityCriteria extends AffiliateCriteria {
  getAttributeValue() {
    return this.prescription.affiliate.nationality
  }

  getAttribute() {
    return 'NATIONALITY'
  }
}

module.exports = { AffiliateNationalityCriteria }