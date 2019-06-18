const lang = require('lodash/lang')
const { ItemAuditedCriteria } = require('./ItemAuditedCriteria')

class ItemAuditedQuantityCriteria extends ItemAuditedCriteria {
  getAttribute() {
    return 'QUANTITY'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].audited.quantity
    }
    return null
  }
}

module.exports = { ItemAuditedQuantityCriteria }