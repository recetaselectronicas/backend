const { AffiliateCriteria } = require('./affiliateCriteria')

class AffiliateCredentialCriteria extends AffiliateCriteria {
  getAttributeValue() {
    return `${this.prescription.affiliate.code.padStart(15, '0')}/${this.prescription.affiliate.category.padStart(3, '0')}`
  }

  getAttribute() {
    return 'CREDENTIAL'
  }
}

module.exports = { AffiliateCredentialCriteria }