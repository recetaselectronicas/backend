const lang = require('lodash/lang')
const filtersModel = require('./model/filters')
const availableStates = require('./availableStates')
const prescriptionFilters = require('./filters')

const pharmacistAvailableFilters = lang.cloneDeep(filtersModel)
pharmacistAvailableFilters.filters.id = lang.cloneDeep(prescriptionFilters.singles.id)
pharmacistAvailableFilters.filters.status = lang.cloneDeep(prescriptionFilters.singles.status)
pharmacistAvailableFilters.filters.status.values = [
  availableStates.RECEIVED,
  availableStates.PARTIALLY_RECEIVED,
  availableStates.INCOMPLETE,
  availableStates.AUDITED,
  availableStates.REJECTED,
  availableStates.PARTIALLY_REJECTED,
]
pharmacistAvailableFilters.filters.issueDateRange = lang.cloneDeep(prescriptionFilters.ranges.issueDateRange)
pharmacistAvailableFilters.filters.soldDateRange = lang.cloneDeep(prescriptionFilters.ranges.soldDateRange)
pharmacistAvailableFilters.filters.institution = lang.cloneDeep(prescriptionFilters.singles.institution)
pharmacistAvailableFilters.filters.medicalInsurance = lang.cloneDeep(prescriptionFilters.singles.medicalInsurance)
pharmacistAvailableFilters.filters.medicine = lang.cloneDeep(prescriptionFilters.singles.medicine)
pharmacistAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
pharmacistAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)
pharmacistAvailableFilters.orders.values.soldDate = lang.cloneDeep(prescriptionFilters.orders.values.soldDate)
module.exports = pharmacistAvailableFilters
