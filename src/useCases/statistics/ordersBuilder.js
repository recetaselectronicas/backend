const getCommonOrder = fieldName => ({
  key: fieldName,
  orders: {
    asc: 'asc',
    desc: 'desc'
  }
})

module.exports = { getCommonOrder }