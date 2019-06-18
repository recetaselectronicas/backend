const lang = require('lodash/lang')
const { ItemAuditedCriteria } = require('./ItemAuditedCriteria')

class ItemAuditedBarcodeCriteria extends ItemAuditedCriteria {
  getAttribute() {
    return 'BARCODE'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].audited.medicine.barCode
    }
    return null
  }
}

module.exports = { ItemAuditedBarcodeCriteria }