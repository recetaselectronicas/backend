const lang = require('lodash/lang')
const { ItemAuditedCriteria } = require('./ItemAuditedCriteria')

class ItemAuditedTroquelCriteria extends ItemAuditedCriteria {
  getAttribute() {
    return 'TROQUEL'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].audited.medicine.troquel
    }
    return null
  }
}

module.exports = { ItemAuditedTroquelCriteria }