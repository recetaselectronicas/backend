const { AffiliateCriteria } = require('./affiliateCriteria')

class AffiliatePlanCriteria extends AffiliateCriteria {
  getAttributeValue() {
    if (this.prescription.affiliate.id) {
      return this.prescription.affiliate.plan.description
    }
    return ''
  }

  getAttribute() {
    return 'PLAN'
  }
}

module.exports = { AffiliatePlanCriteria }