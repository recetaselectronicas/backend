const { ItemCriteria } = require('../itemCriteria')

class ItemPresribedCriteria extends ItemCriteria {
  getEntity() {
    return 'ITEM_PRESCRIBED'
  }
}

module.exports = { ItemPresribedCriteria }