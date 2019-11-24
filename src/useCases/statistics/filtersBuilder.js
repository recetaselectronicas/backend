const getEqualFilter = fieldName => ({
  key: fieldName,
  type: 'equal'
})

const getLikeFilter = fieldName => ({
  key: fieldName,
  type: 'like'
})

const getInFilter = (fieldName, values) => ({
  key: fieldName,
  type: 'in',
  availableValues: values
})

module.exports = { getEqualFilter, getLikeFilter, getInFilter }