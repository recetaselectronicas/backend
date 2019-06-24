const { AffiliateCriteria } = require('./affiliateCriteria')

class AffiliateNationalityCriteria extends AffiliateCriteria {
  getAttributeValue() {
    console.log(this.prescription.affiliate.nationality)
    return this.prescription.affiliate.nationality
  }

  getAttribute() {
    return 'NATIONALITY'
  }
}

module.exports = { AffiliateNationalityCriteria }