const lang = require('lodash/lang')
const filtersModel = require('./model/filters')
const availableStates = require('./availableStates')
const prescriptionFilters = require('./filters')

const affiliateAvailableFilters = lang.cloneDeep(filtersModel)
affiliateAvailableFilters.filters.id = lang.cloneDeep(prescriptionFilters.singles.id)
affiliateAvailableFilters.filters.status = lang.cloneDeep(prescriptionFilters.singles.status)
affiliateAvailableFilters.filters.status.values = [
  availableStates.CONFIRMED,
  availableStates.EXPIRED,
  availableStates.RECEIVED,
  // availableStates.PARTIALLY_RECEIVED,
]
affiliateAvailableFilters.filters.issueDateRange = lang.cloneDeep(prescriptionFilters.ranges.issueDateRange)
affiliateAvailableFilters.filters.soldDateRange = lang.cloneDeep(prescriptionFilters.ranges.soldDateRange)
affiliateAvailableFilters.filters.institution = lang.cloneDeep(prescriptionFilters.singles.institution)
affiliateAvailableFilters.filters.medicalInsurance = lang.cloneDeep(prescriptionFilters.singles.medicalInsurance)
affiliateAvailableFilters.orders = lang.cloneDeep(prescriptionFilters.orders)
affiliateAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
affiliateAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)
affiliateAvailableFilters.orders.values.soldDate = lang.cloneDeep(prescriptionFilters.orders.values.soldDate)
module.exports = affiliateAvailableFilters
