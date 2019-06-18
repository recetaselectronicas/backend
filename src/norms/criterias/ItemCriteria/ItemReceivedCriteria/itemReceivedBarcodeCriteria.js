const lang = require('lodash/lang')
const { ItemReceivedCriteria } = require('./ItemReceivedCriteria')

class ItemReceivedBarcodeCriteria extends ItemReceivedCriteria {
  getAttribute() {
    return 'BARCODE'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].received.medicine.barCode
    }
    return null
  }
}

module.exports = { ItemReceivedBarcodeCriteria }