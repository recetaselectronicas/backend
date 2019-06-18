const lang = require('lodash/lang')
const { ItemPresribedCriteria } = require('./ItemPrescribedCriteria')

class ItemPresribedBarcodeCriteria extends ItemPresribedCriteria {
  getAttribute() {
    return 'BARCODE'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].prescribed.medicine.barCode
    }
    return null
  }
}

module.exports = { ItemPresribedBarcodeCriteria }