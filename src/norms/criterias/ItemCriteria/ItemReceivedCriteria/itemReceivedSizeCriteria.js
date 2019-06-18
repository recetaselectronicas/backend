const lang = require('lodash/lang')
const { ItemReceivedCriteria } = require('./ItemReceivedCriteria')

class ItemReceivedSizeCriteria extends ItemReceivedCriteria {
  getAttribute() {
    return 'SIZE'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].received.medicine.sizeDescription
    }
    return null
  }
}

module.exports = { ItemReceivedSizeCriteria }