const lang = require('lodash/lang')
const filtersModel = require('./model/filters')
const availableStates = require('./availableStates')
const prescriptionFilters = require('./filters')

const doctorAvailableFilters = lang.cloneDeep(filtersModel)
doctorAvailableFilters.filters.id = lang.cloneDeep(prescriptionFilters.id)
doctorAvailableFilters.filters.status = lang.cloneDeep(prescriptionFilters.status)
doctorAvailableFilters.filters.status.values = [
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
doctorAvailableFilters.filters.issueDateRange = lang.cloneDeep(prescriptionFilters.issueDateRange)
doctorAvailableFilters.filters.institution = lang.cloneDeep(prescriptionFilters.institution)
doctorAvailableFilters.filters.medicalInsurance = lang.cloneDeep(prescriptionFilters.medicalInsurance)
doctorAvailableFilters.filters.medicine = lang.cloneDeep(prescriptionFilters.medicine)
doctorAvailableFilters.orders = lang.cloneDeep(prescriptionFilters.orders)
doctorAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
doctorAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)

module.exports = doctorAvailableFilters
