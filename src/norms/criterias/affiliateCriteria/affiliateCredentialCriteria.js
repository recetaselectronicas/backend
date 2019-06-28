const { AffiliateCriteria } = require('./affiliateCriteria')

class AffiliateCredentialCriteria extends AffiliateCriteria {
  getAttributeValue() {
    if (this.prescription.affiliate.id) {
      return `${this.prescription.affiliate.code.padStart(15, '0')}/${this.prescription.affiliate.category.padStart(3, '0')}`
    }
    return ''
  }

  getAttribute() {
    return 'CREDENTIAL'
  }
}

module.exports = { AffiliateCredentialCriteria }