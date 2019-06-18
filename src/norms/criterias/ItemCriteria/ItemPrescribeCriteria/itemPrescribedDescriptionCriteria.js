const lang = require('lodash/lang')
const { ItemPresribedCriteria } = require('./ItemPrescribedCriteria')

class ItemPresribedDescriptionCriteria extends ItemPresribedCriteria {
  getAttribute() {
    return 'DESCRIPTION'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].prescribed.medicine.description
    }
    return null
  }
}

module.exports = { ItemPresribedDescriptionCriteria }