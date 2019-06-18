const lang = require('lodash/lang')
const { ItemReceivedCriteria } = require('./ItemReceivedCriteria')

class ItemReceivedDescriptionCriteria extends ItemReceivedCriteria {
  getAttribute() {
    return 'DESCRIPTION'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].received.medicine.description
    }
    return null
  }
}

module.exports = { ItemReceivedDescriptionCriteria }