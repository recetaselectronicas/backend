const lang = require('lodash/lang')
const { ItemAuditedCriteria } = require('./ItemAuditedCriteria')

class ItemAuditedPharmaceuticalActionCriteria extends ItemAuditedCriteria {
  getAttribute() {
    return 'PHARMACEUTICAL_ACTION'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].audited.medicine.pharmaceuticalAction
    }
    return null
  }
}

module.exports = { ItemAuditedPharmaceuticalActionCriteria }