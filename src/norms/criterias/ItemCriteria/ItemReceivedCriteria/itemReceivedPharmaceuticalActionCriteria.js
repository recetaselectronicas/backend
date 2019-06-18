const lang = require('lodash/lang')
const { ItemReceivedCriteria } = require('./ItemReceivedCriteria')

class ItemReceivedPharmaceuticalActionCriteria extends ItemReceivedCriteria {
  getAttribute() {
    return 'PHARMACEUTICAL_ACTION'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].received.medicine.pharmaceuticalAction
    }
    return null
  }
}

module.exports = { ItemReceivedPharmaceuticalActionCriteria }