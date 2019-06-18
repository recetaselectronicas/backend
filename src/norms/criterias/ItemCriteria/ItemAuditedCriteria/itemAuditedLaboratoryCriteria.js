const lang = require('lodash/lang')
const { ItemAuditedCriteria } = require('./ItemAuditedCriteria')

class ItemAuditedLaboratoryCriteria extends ItemAuditedCriteria {
  getAttribute() {
    return 'LABORATORY'
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].audited.medicine.laboratoryDescription
    }
    return null
  }
}

module.exports = { ItemAuditedLaboratoryCriteria }