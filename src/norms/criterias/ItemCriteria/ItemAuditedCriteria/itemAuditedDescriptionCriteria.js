const lang = require('lodash/lang')
const { ItemAuditedCriteria } = require('./ItemAuditedCriteria')

class ItemAuditedDescriptionCriteria extends ItemAuditedCriteria {
  getAttribute() {
    return 'DESCRIPTION'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].audited.medicine.description
    }
    return null
  }
}

module.exports = { ItemAuditedDescriptionCriteria }