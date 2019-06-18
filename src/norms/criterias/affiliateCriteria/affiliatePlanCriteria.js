const { AffiliateCriteria } = require('./affiliateCriteria')

class AffiliatePlanCriteria extends AffiliateCriteria {
  getAttributeValue() {
    return this.prescription.affiliate.plan.description
  }

  getAttribute() {
    return 'PLAN'
  }
}

module.exports = { AffiliatePlanCriteria }