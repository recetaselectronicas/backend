const lang = require('lodash/lang')
const filtersModel = require('./model/filters')
const availableStates = require('./availableStates')
const prescriptionFilters = require('./filters')

const medicalInsuranceAvailableFilters = lang.cloneDeep(filtersModel)
medicalInsuranceAvailableFilters.filters.id = lang.cloneDeep(prescriptionFilters.id)
medicalInsuranceAvailableFilters.filters.status = lang.cloneDeep(prescriptionFilters.status)
medicalInsuranceAvailableFilters.filters.status.values = [
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
medicalInsuranceAvailableFilters.filters.issueDateRange = lang.cloneDeep(prescriptionFilters.issueDateRange)
medicalInsuranceAvailableFilters.filters.soldDateRange = lang.cloneDeep(prescriptionFilters.soldDateRange)
medicalInsuranceAvailableFilters.filters.auditedDateRange = lang.cloneDeep(prescriptionFilters.auditedDateRange)
medicalInsuranceAvailableFilters.filters.institution = lang.cloneDeep(prescriptionFilters.institution)
medicalInsuranceAvailableFilters.filters.doctor = lang.cloneDeep(prescriptionFilters.doctor)
medicalInsuranceAvailableFilters.filters.affiliate = lang.cloneDeep(prescriptionFilters.affiliate)
medicalInsuranceAvailableFilters.filters.pharmacist = lang.cloneDeep(prescriptionFilters.pharmacist)
medicalInsuranceAvailableFilters.filters.medicine = lang.cloneDeep(prescriptionFilters.medicine)
medicalInsuranceAvailableFilters.orders = lang.cloneDeep(prescriptionFilters.orders)
medicalInsuranceAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
medicalInsuranceAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)
medicalInsuranceAvailableFilters.orders.values.soldDate = lang.cloneDeep(prescriptionFilters.orders.values.soldDate)
medicalInsuranceAvailableFilters.orders.values.auditedDate = lang.cloneDeep(prescriptionFilters.orders.values.auditedDate)

module.exports = medicalInsuranceAvailableFilters
