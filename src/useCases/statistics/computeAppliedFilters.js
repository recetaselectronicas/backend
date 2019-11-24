const computeAppliedFilters = (availableFilters, query) => {
  if (!query || !query.appliedFilters || !query.appliedFilters.length) {
    return []
  }
  return query.appliedFilters.reduce((appliedFilters, filter) => {
    const actualFilter = availableFilters.find(fil => fil.key === filter.key)
    if (actualFilter) {
      if (actualFilter.type === 'equal' && filter.value !== undefined && filter.value !== '') {
        appliedFilters.push({ ...actualFilter, value: filter.value })
      } else if (actualFilter.type === 'like' && filter.value !== undefined && filter.value !== '') {
        appliedFilters.push({ ...actualFilter, value: filter.value })
      } else if (actualFilter.type === 'in' && actualFilter.availableValues.includes(filter.value)) {
        appliedFilters.push({ ...actualFilter, value: filter.value })
      }
    }
    return appliedFilters
  }, [])
}

module.exports = { computeAppliedFilters }