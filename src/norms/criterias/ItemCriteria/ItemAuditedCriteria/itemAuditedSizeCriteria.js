const lang = require('lodash/lang')
const { ItemAuditedCriteria } = require('./ItemAuditedCriteria')

class ItemAuditedSizeCriteria extends ItemAuditedCriteria {
  getAttribute() {
    return 'SIZE'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].audited.medicine.sizeDescription
    }
    return null
  }
}

module.exports = { ItemAuditedSizeCriteria }