const moment = require('moment')
const { PharmacistCriteria } = require('./pharmacistCriteria')

class PharmacistAgeCriteria extends PharmacistCriteria {
  getAttribute() {
    return 'AGE'
  }

  doGetAttributeValue(index) {
    return +moment().diff(this.getPharmacistValue(index).birthDate, 'years') || NaN
  }
}

module.exports = { PharmacistAgeCriteria }