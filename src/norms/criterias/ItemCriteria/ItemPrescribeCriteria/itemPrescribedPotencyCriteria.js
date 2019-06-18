const lang = require('lodash/lang')
const { ItemPresribedCriteria } = require('./ItemPrescribedCriteria')

class ItemPresribedPotencyCriteria extends ItemPresribedCriteria {
  getAttribute() {
    return 'POTENCY'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].prescribed.medicine.potencyDescription
    }
    return null
  }
}

module.exports = { ItemPresribedPotencyCriteria }