const lang = require('lodash/lang')
const { ItemAuditedCriteria } = require('./ItemAuditedCriteria')

class ItemAuditedPresentationCriteria extends ItemAuditedCriteria {
  getAttribute() {
    return 'PRESENTATION'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].audited.medicine.presentationDescription
    }
    return null
  }
}

module.exports = { ItemAuditedPresentationCriteria }