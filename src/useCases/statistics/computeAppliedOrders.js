const computeAppliedOrders = (availableOrders, query) => {
  if (!query || !query.appliedOrders || !query.appliedOrders.length) {
    return []
  }
  return query.appliedOrders.reduce((appliedOrders, order) => {
    const actualOrder = availableOrders.find(fil => fil.key === order.key)
    if (order.order === actualOrder.orders.asc || order.order === actualOrder.orders.desc) {
      appliedOrders.push({ ...actualOrder, order: order.order })
    }
    return appliedOrders
  }, [])
}

module.exports = { computeAppliedOrders }