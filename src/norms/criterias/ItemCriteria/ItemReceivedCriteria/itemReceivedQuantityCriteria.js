const lang = require('lodash/lang')
const { ItemReceivedCriteria } = require('./ItemReceivedCriteria')

class ItemReceivedQuantityCriteria extends ItemReceivedCriteria {
  getAttribute() {
    return 'QUANTITY'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].received.quantity
    }
    return null
  }
}

module.exports = { ItemReceivedQuantityCriteria }