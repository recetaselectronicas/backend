const lang = require('lodash/lang')
const filtersModel = require('./model/filters')
const availableStates = require('./availableStates')
const prescriptionFilters = require('./filters')

const medicalInsuranceAvailableFilters = lang.cloneDeep(filtersModel)
medicalInsuranceAvailableFilters.filters.id = lang.cloneDeep(prescriptionFilters.singles.id)
medicalInsuranceAvailableFilters.filters.status = lang.cloneDeep(prescriptionFilters.singles.status)
medicalInsuranceAvailableFilters.filters.status.values = [
  availableStates.ISSUED,
  availableStates.CANCELLED,
  availableStates.CONFIRMED,
  availableStates.EXPIRED,
  availableStates.RECEIVED,
  availableStates.PARTIALLY_RECEIVED,
  availableStates.INCOMPLETE,
  availableStates.AUDITED,
  availableStates.REJECTED,
  availableStates.PARTIALLY_REJECTED,
]
medicalInsuranceAvailableFilters.filters.issueDateRange = lang.cloneDeep(prescriptionFilters.ranges.issueDateRange)
medicalInsuranceAvailableFilters.filters.soldDateRange = lang.cloneDeep(prescriptionFilters.ranges.soldDateRange)
medicalInsuranceAvailableFilters.filters.auditedDateRange = lang.cloneDeep(prescriptionFilters.ranges.auditedDateRange)
medicalInsuranceAvailableFilters.filters.institution = lang.cloneDeep(prescriptionFilters.singles.institution)
medicalInsuranceAvailableFilters.filters.doctor = lang.cloneDeep(prescriptionFilters.singles.doctor)
medicalInsuranceAvailableFilters.filters.affiliate = lang.cloneDeep(prescriptionFilters.singles.affiliate)
medicalInsuranceAvailableFilters.filters.pharmacist = lang.cloneDeep(prescriptionFilters.singles.pharmacist)
medicalInsuranceAvailableFilters.filters.medicine = lang.cloneDeep(prescriptionFilters.singles.medicine)
medicalInsuranceAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
medicalInsuranceAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)
medicalInsuranceAvailableFilters.orders.values.soldDate = lang.cloneDeep(prescriptionFilters.orders.values.soldDate)
medicalInsuranceAvailableFilters.orders.values.auditedDate = lang.cloneDeep(
  prescriptionFilters.orders.values.auditedDate,
)

module.exports = medicalInsuranceAvailableFilters
