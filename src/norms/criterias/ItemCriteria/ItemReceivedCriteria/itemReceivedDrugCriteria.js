const lang = require('lodash/lang')
const { ItemReceivedCriteria } = require('./ItemReceivedCriteria')

class ItemReceivedDrugCriteria extends ItemReceivedCriteria {
  getAttribute() {
    return 'DRUG'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].received.medicine.drugDescription
    }
    return null
  }
}

module.exports = { ItemReceivedDrugCriteria }