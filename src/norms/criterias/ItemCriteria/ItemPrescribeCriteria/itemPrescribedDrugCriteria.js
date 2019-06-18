const lang = require('lodash/lang')
const { ItemPresribedCriteria } = require('./ItemPrescribedCriteria')

class ItemPresribedDrugCriteria extends ItemPresribedCriteria {
  getAttribute() {
    return 'DRUG'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].prescribed.medicine.drugDescription
    }
    return null
  }
}

module.exports = { ItemPresribedDrugCriteria }