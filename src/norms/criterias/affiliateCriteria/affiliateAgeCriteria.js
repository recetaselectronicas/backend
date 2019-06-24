/* eslint-disable no-mixed-operators */
const moment = require('moment')
const { AffiliateCriteria } = require('./affiliateCriteria')

class AffiliateAgeCriteria extends AffiliateCriteria {
  getAttributeValue() {
    return this.prescription.affiliate.birthDate && +moment().diff(this.prescription.affiliate.birthDate, 'years') || NaN
  }

  getAttribute() {
    return 'AGE'
  }
}

module.exports = { AffiliateAgeCriteria }