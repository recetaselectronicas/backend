/* eslint-disable no-mixed-operators */
const moment = require('moment')
const { AffiliateCriteria } = require('./affiliateCriteria')

class AffiliateActiveCriteria extends AffiliateCriteria {
  getAttributeValue() {
    if (this.prescription.affiliate.toDate) {
      return moment().isBefore(this.prescription.affiliate.toDate)
    }
    return true
  }

  getAttribute() {
    return 'ACTIVE'
  }
}

module.exports = { AffiliateActiveCriteria }