const { ItemCriteria } = require('../itemCriteria')

class ItemReceivedCriteria extends ItemCriteria {
  getEntity() {
    return 'ITEM_RECEIVED'
  }
}

module.exports = { ItemReceivedCriteria }