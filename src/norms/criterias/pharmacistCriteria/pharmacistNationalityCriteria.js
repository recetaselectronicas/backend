const { PharmacistCriteria } = require('./pharmacistCriteria')

class PharmacistNationalityCriteria extends PharmacistCriteria {
  getAttribute() {
    return 'NATIONALITY'
  }

  doGetAttributeValue(index) {
    return this.getPharmacistValue(index).nationality
  }
}

module.exports = { PharmacistNationalityCriteria }