const lang = require('lodash/lang')
const { ItemPresribedCriteria } = require('./ItemPrescribedCriteria')

class ItemPresribedSizeCriteria extends ItemPresribedCriteria {
  getAttribute() {
    return 'SIZE'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].prescribed.medicine.sizeDescription
    }
    return null
  }
}

module.exports = { ItemPresribedSizeCriteria }