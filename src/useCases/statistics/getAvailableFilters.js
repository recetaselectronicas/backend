const { getEqualFilter, getLikeFilter, getInFilter } = require('./filtersBuilder')

const getAvailableFilters = () => ([
  getEqualFilter('prescriptionId'),
  getLikeFilter('patientName'),
  getEqualFilter('affiliateCredential'),
  getLikeFilter('doctorName'),
  getEqualFilter('doctorNationalMatriculation'),
  getLikeFilter('pharmacistName'),
  getEqualFilter('pharmacistMatriculation'),
  getInFilter('prescriptionStatus', ['AUDITED', 'CANCELLED', 'CONFIRMED', 'EXPIRED', 'INCOMPLETE', 'ISSUED', 'PARTIALLY_RECEIVED', 'PARTIALLY_REJECTED', 'RECEIVED', 'REJECTED'])
])

module.exports = { getAvailableFilters }