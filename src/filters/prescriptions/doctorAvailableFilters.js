const lang = require('lodash/lang')
const filtersModel = require('./model/filters')
const availableStates = require('./availableStates')
const prescriptionFilters = require('./filters')

const doctorAvailableFilters = lang.cloneDeep(filtersModel)
doctorAvailableFilters.filters.id = lang.cloneDeep(prescriptionFilters.id)
doctorAvailableFilters.filters.status = lang.cloneDeep(prescriptionFilters.status)
doctorAvailableFilters.filters.status.values = [
  availableStates.ISSUED,
  availableStates.CANCELLED,
  availableStates.CONFIRMED,
  availableStates.INCOMPLETE,
  availableStates.AUDITED,
  availableStates.REJECTED,
  availableStates.PARTIALLY_REJECTED,
]
doctorAvailableFilters.filters.issueDateRange = lang.cloneDeep(prescriptionFilters.issueDateRange)
doctorAvailableFilters.filters.institution = lang.cloneDeep(prescriptionFilters.institution)
doctorAvailableFilters.filters.medicalInsurance = lang.cloneDeep(prescriptionFilters.medicalInsurance)
doctorAvailableFilters.filters.medicine = lang.cloneDeep(prescriptionFilters.medicine)
doctorAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
doctorAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)

module.exports = doctorAvailableFilters
