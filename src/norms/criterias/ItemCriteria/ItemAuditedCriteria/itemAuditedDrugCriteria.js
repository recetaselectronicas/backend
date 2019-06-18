const lang = require('lodash/lang')
const { ItemAuditedCriteria } = require('./ItemAuditedCriteria')

class ItemAuditedDrugCriteria extends ItemAuditedCriteria {
  getAttribute() {
    return 'DRUG'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].audited.medicine.drugDescription
    }
    return null
  }
}

module.exports = { ItemAuditedDrugCriteria }