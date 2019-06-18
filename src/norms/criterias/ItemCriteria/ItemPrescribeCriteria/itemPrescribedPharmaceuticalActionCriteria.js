const lang = require('lodash/lang')
const { ItemPresribedCriteria } = require('./ItemPrescribedCriteria')

class ItemPresribedPharmaceuticalActionCriteria extends ItemPresribedCriteria {
  getAttribute() {
    return 'PHARMACEUTICAL_ACTION'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].prescribed.medicine.pharmaceuticalAction
    }
    return null
  }
}

module.exports = { ItemPresribedPharmaceuticalActionCriteria }