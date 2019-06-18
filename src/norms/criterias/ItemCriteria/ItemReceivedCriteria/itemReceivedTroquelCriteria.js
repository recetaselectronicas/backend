const lang = require('lodash/lang')
const { ItemReceivedCriteria } = require('./ItemReceivedCriteria')

class ItemReceivedTroquelCriteria extends ItemReceivedCriteria {
  getAttribute() {
    return 'TROQUEL'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].received.medicine.troquel
    }
    return null
  }
}

module.exports = { ItemReceivedTroquelCriteria }