const lang = require('lodash/lang')
const filtersModel = require('./model/filters')
const availableStates = require('./availableStates')
const prescriptionFilters = require('./filters')

const affiliateAvailableFilters = lang.cloneDeep(filtersModel)
affiliateAvailableFilters.filters.id = lang.cloneDeep(prescriptionFilters.id)
affiliateAvailableFilters.filters.status = lang.cloneDeep(prescriptionFilters.status)
affiliateAvailableFilters.filters.status.values = [
  availableStates.CONFIRMED,
  availableStates.EXPIRED,
  availableStates.RECEIVED,
  availableStates.PARTIALLY_RECEIVED,
]
affiliateAvailableFilters.filters.issueDateRange = lang.cloneDeep(prescriptionFilters.issueDateRange)
affiliateAvailableFilters.filters.soldDateRange = lang.cloneDeep(prescriptionFilters.soldDateRange)
affiliateAvailableFilters.filters.institution = lang.cloneDeep(prescriptionFilters.institution)
affiliateAvailableFilters.filters.medicalInsurance = lang.cloneDeep(prescriptionFilters.medicalInsurance)
affiliateAvailableFilters.filters.medicine = lang.cloneDeep(prescriptionFilters.medicine)
affiliateAvailableFilters.orders = lang.cloneDeep(prescriptionFilters.orders)
delete affiliateAvailableFilters.orders.values.auditedDate
affiliateAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
affiliateAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)
affiliateAvailableFilters.orders.values.soldDate = lang.cloneDeep(prescriptionFilters.orders.values.soldDate)
module.exports = affiliateAvailableFilters
