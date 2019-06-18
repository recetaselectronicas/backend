const lang = require('lodash/lang')
const { ItemAuditedCriteria } = require('./ItemAuditedCriteria')

class ItemAuditedPotencyCriteria extends ItemAuditedCriteria {
  getAttribute() {
    return 'POTENCY'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].audited.medicine.potencyDescription
    }
    return null
  }
}

module.exports = { ItemAuditedPotencyCriteria }