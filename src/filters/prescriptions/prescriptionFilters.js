const lang = require('lodash/lang')
const prescriptionFilters = require('./filters')
const pharmacistAvailableFilters = require('./pharmacistAvailableFilters')
const affiliateAvailableFilters = require('./affiliateAvailableFilters')
const doctorAvailableFilters = require('./doctorAvailableFilters')
const medicalInsuranceAvailableFilters = require('./medicalInsuranceAvailableFilters')

const getAffiliateAvailableFilters = () => lang.cloneDeep(affiliateAvailableFilters)
const getDoctorAvailableFilters = () => lang.cloneDeep(doctorAvailableFilters)
const getPharmacistAvailableFilters = () => lang.cloneDeep(pharmacistAvailableFilters)
const getMedicalInsuranceAvailableFilters = () => lang.cloneDeep(medicalInsuranceAvailableFilters)

// dado los parametros (req.query), perfiles, filtros disponibles -> te devuelve el objeto query
// params -> los parametros que vienen desde la url
// caller -> quien nos llama
// filtros disponibles para esta entidad -> affiliateAvailableFilters.js ejemplo
const queryBuilder = (params, caller, availableFilters) => {
  let queryObject = { filters: {}, orders: {} }
  const rangedKeys = ['fromIssueDate', 'toIssueDate']
  const relationRangedKey = {
    fromIssueDate: 'issueDateRange',
    toIssueDate: 'issueDateRange',
  }

  if (params && typeof params === 'object' && !(params instanceof Array)) {
    queryObject = Object.keys(params).reduce((queryObject, key) => {
      const newQueryObject = { ...queryObject }
      const filter = availableFilters.filters[key]
      const isRangeFilter = rangedKeys.includes(key)
      const isOrderFilter = key === availableFilters.orders.key
      if (filter) {
        newQueryObject.filters[key] = filter.getMatchingValues(key, params[key])
      } else if (isRangeFilter) {
        newQueryObject.filters[key] = availableFilters.filters[relationRangedKey[key]].getMatchingValues(
          key,
          params[key],
        )
      } else if (isOrderFilter) {
        newQueryObject.orders = availableFilters.orders.getMatchingValues(key, params[key])
      }
      return newQueryObject
    }, queryObject)
  }
  if (caller.type === 'affiliate') {
    queryObject.filters[prescriptionFilters.affiliate.key] = caller.id
  } else if (caller.type === 'doctor') {
    queryObject.filters[prescriptionFilters.doctor.key] = caller.id
  } else if (caller.type === 'pharmacist') {
    queryObject.filters[prescriptionFilters.pharmacist.key] = caller.id
  } else if (caller.type === 'medicalInsurance') {
    queryObject.filters[prescriptionFilters.medicalInsurance.key] = caller.id
  }
  return queryObject
}

module.exports = {
  getAffiliateAvailableFilters,
  getDoctorAvailableFilters,
  getPharmacistAvailableFilters,
  getMedicalInsuranceAvailableFilters,
  getAffiliateQueryByParams: (params, id) => queryBuilder(params, { type: 'affiliate', id }, getAffiliateAvailableFilters()),
  getDoctorQueryByParams: (params, id) => queryBuilder(params, { type: 'doctor', id }, getDoctorAvailableFilters()),
  getPharmacistQueryByParams: (params, id) => queryBuilder(params, { type: 'pharmacist', id }, getPharmacistAvailableFilters()),
  getMedicalInsuranceQueryByParams: (params, id) => queryBuilder(params, { type: 'medicalInsurance', id }, getMedicalInsuranceAvailableFilters()),
}
