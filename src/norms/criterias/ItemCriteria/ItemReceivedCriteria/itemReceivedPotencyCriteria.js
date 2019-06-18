const lang = require('lodash/lang')
const { ItemReceivedCriteria } = require('./ItemReceivedCriteria')

class ItemReceivedPotencyCriteria extends ItemReceivedCriteria {
  getAttribute() {
    return 'POTENCY'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].received.medicine.potencyDescription
    }
    return null
  }
}

module.exports = { ItemReceivedPotencyCriteria }