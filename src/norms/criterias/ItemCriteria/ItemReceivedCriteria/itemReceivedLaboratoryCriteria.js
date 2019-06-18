const lang = require('lodash/lang')
const { ItemReceivedCriteria } = require('./ItemReceivedCriteria')

class ItemReceivedLaboratoryCriteria extends ItemReceivedCriteria {
  getAttribute() {
    return 'LABORATORY'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].received.medicine.laboratoryDescription
    }
    return null
  }
}

module.exports = { ItemReceivedLaboratoryCriteria }