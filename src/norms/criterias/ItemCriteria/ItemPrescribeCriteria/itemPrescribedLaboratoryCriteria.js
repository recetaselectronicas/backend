const lang = require('lodash/lang')
const { ItemPresribedCriteria } = require('./ItemPrescribedCriteria')

class ItemPresribedLaboratoryCriteria extends ItemPresribedCriteria {
  getAttribute() {
    return 'LABORATORY'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].prescribed.medicine.laboratoryDescription
    }
    return null
  }
}

module.exports = { ItemPresribedLaboratoryCriteria }