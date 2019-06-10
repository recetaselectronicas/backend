const lang = require('lodash/lang')
const filtersModel = require('./model/filters')
const availableStates = require('./availableStates')
const prescriptionFilters = require('./filters')

const doctorAvailableFilters = lang.cloneDeep(filtersModel)
doctorAvailableFilters.filters.id = lang.cloneDeep(prescriptionFilters.singles.id)
doctorAvailableFilters.filters.status = lang.cloneDeep(prescriptionFilters.singles.status)
doctorAvailableFilters.filters.status.values = [
  availableStates.ISSUED,
  availableStates.CANCELLED,
  availableStates.CONFIRMED,
  availableStates.INCOMPLETE,
  availableStates.AUDITED,
  availableStates.REJECTED,
  availableStates.PARTIALLY_REJECTED,
]
doctorAvailableFilters.filters.issueDateRange = lang.cloneDeep(prescriptionFilters.ranges.issueDateRange)
doctorAvailableFilters.filters.institution = lang.cloneDeep(prescriptionFilters.singles.institution)
doctorAvailableFilters.filters.medicalInsurance = lang.cloneDeep(prescriptionFilters.singles.medicalInsurance)
doctorAvailableFilters.filters.medicine = lang.cloneDeep(prescriptionFilters.singles.medicine)
doctorAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
doctorAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)

module.exports = doctorAvailableFilters
