const lang = require('lodash/lang')
const filtersModel = require('./model/filters')
const availableStates = require('./availableStates')
const prescriptionFilters = require('./filters')

const pharmacistAvailableFilters = lang.cloneDeep(filtersModel)
pharmacistAvailableFilters.filters.id = lang.cloneDeep(prescriptionFilters.id)
pharmacistAvailableFilters.filters.status = lang.cloneDeep(prescriptionFilters.status)
pharmacistAvailableFilters.filters.status.values = [
  availableStates.RECEIVED,
  availableStates.PARTIALLY_RECEIVED,
  availableStates.INCOMPLETE,
  availableStates.AUDITED,
  availableStates.REJECTED,
  availableStates.PARTIALLY_REJECTED,
  availableStates.CONFIRMED,
  availableStates.ISSUED,
  availableStates.CANCELLED,
  availableStates.EXPIRED
]
pharmacistAvailableFilters.filters.issueDateRange = lang.cloneDeep(prescriptionFilters.issueDateRange)
pharmacistAvailableFilters.filters.soldDateRange = lang.cloneDeep(prescriptionFilters.soldDateRange)
pharmacistAvailableFilters.filters.institution = lang.cloneDeep(prescriptionFilters.institution)
pharmacistAvailableFilters.filters.medicalInsurance = lang.cloneDeep(prescriptionFilters.medicalInsurance)
pharmacistAvailableFilters.filters.medicine = lang.cloneDeep(prescriptionFilters.medicine)
pharmacistAvailableFilters.orders = lang.cloneDeep(prescriptionFilters.orders)
pharmacistAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
pharmacistAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)
pharmacistAvailableFilters.orders.values.soldDate = lang.cloneDeep(prescriptionFilters.orders.values.soldDate)
module.exports = pharmacistAvailableFilters
