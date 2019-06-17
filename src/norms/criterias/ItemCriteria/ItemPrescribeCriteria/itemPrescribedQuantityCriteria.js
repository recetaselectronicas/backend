const lang = require('lodash/lang')
const { ItemPresribedCriteria } = require('./ItemPrescribedCriteria')

class ItemPresribedQuantityCriteria extends ItemPresribedCriteria {
  getAttribute() {
    return 'QUANTITY'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].prescribed.quantity
    }
    return null
  }
}

module.exports = { ItemPresribedQuantityCriteria }