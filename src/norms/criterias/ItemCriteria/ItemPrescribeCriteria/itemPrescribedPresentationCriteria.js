const lang = require('lodash/lang')
const { ItemPresribedCriteria } = require('./ItemPrescribedCriteria')

class ItemPresribedPresentationCriteria extends ItemPresribedCriteria {
  getAttribute() {
    return 'PRESENTATION'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].prescribed.medicine.presentationDescription
    }
    return null
  }
}

module.exports = { ItemPresribedPresentationCriteria }