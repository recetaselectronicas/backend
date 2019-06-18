const moment = require('moment')
const { PharmacistCriteria } = require('./pharmacistCriteria')

class PharmacistAgeCriteria extends PharmacistCriteria {
  getAttribute() {
    return 'AGE'
  }

  doGetAttributeValue(index) {
    return +this.getPharmacistValue(index).birthDate.diff(moment(), 'years') || NaN
  }
}

module.exports = { PharmacistAgeCriteria }