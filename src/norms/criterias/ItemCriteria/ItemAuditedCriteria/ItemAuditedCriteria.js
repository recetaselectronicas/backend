const { ItemCriteria } = require('../itemCriteria')

class ItemAuditedCriteria extends ItemCriteria {
  getEntity() {
    return 'ITEM_AUDITED'
  }
}

module.exports = { ItemAuditedCriteria }