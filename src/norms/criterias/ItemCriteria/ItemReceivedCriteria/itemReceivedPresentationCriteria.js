const lang = require('lodash/lang')
const { ItemReceivedCriteria } = require('./ItemReceivedCriteria')

class ItemReceivedPresentationCriteria extends ItemReceivedCriteria {
  getAttribute() {
    return 'PRESENTATION'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].received.medicine.presentationDescription
    }
    return null
  }
}

module.exports = { ItemReceivedPresentationCriteria }