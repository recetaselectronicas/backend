const { PharmacistCriteria } = require('./pharmacistCriteria')

class PharmacistMatriculationCriteria extends PharmacistCriteria {
  getAttribute() {
    return 'MATRICULATION'
  }

  doGetAttributeValue(index) {
    return +this.getPharmacistValue(index).matriculation
  }
}

module.exports = { PharmacistMatriculationCriteria }