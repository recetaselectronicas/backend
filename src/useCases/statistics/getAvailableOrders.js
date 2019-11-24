const { getCommonOrder } = require('./ordersBuilder')

const getAvailableOrders = () => ([
  getCommonOrder('prescriptionId'),
  getCommonOrder('itemId'),
  getCommonOrder('prescriptionIssuedDate'),
  getCommonOrder('itemSoldDate'),
  getCommonOrder('prescriptionAuditedDate'),
  getCommonOrder('prescriptionStatus')
])

module.exports = { getAvailableOrders }