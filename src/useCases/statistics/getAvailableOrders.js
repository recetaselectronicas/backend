const { getCommonOrder } = require('./ordersBuilder')

const getAvailableOrders = () => ([
  getCommonOrder('prescriptionId'),
  getCommonOrder('prescriptionIssuedDate'),
  getCommonOrder('itemSoldDate'),
  getCommonOrder('prescriptionAuditedDate'),
  getCommonOrder('prescriptionStatus')
])

module.exports = { getAvailableOrders }