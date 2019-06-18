const lang = require('lodash/lang')
const { ItemPresribedCriteria } = require('./ItemPrescribedCriteria')

class ItemPresribedTroquelCriteria extends ItemPresribedCriteria {
  getAttribute() {
    return 'TROQUEL'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].prescribed.medicine.troquel
    }
    return null
  }
}

module.exports = { ItemPresribedTroquelCriteria }