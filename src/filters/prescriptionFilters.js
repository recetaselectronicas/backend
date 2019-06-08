const lang = require('lodash/lang')
const array = require('lodash/array')
const object = require('lodash/object')
const {formats} = require('../utils/utils')
const {states} = require('../state-machine/state')
const moment = require('moment')

const availableStates = Object.keys(states).reduce((map, state) => {
    map[state] = {
        id: state, 
        value: states[state].status
    } 
    return map
}, {})

const prescriptionFilters = {
    singles: {
        id: {
            key: "id",
        },
        status: {
            key: "status",
            values: []
        },
        institution: {
            key: "institution",
            values: []
        },
        medicalInsurance: {
            key: "medicalInsurance",
            values: []
        },
        affiliate: {
            key: "affiliate"
        },
        doctor: {
            key: "doctor"
        },
        pharmacist: {
            key: "pharmacist"
        },
        medicine: {
            key: "medicine"
        }
    },
    ranges: {
        issueDateRange: {
            keyFrom: "fromIssueDate",
            keyTo: "toIssueDate",
            format: formats.dateTimeFormat
        },
        receivedDateRange: {
            keyFrom: "fromReceivedDate",
            keyTo: "toReceivedDate",
            format: formats.dateTimeFormat
        },
        auditedDateRange: {
            keyFrom: "fromAuditedDate",
            keyTo: "toAuditedDate",
            format: formats.dateTimeFormat
        }
    },
    orders: {
        key: "orderBy",
        values: {
            id: {
                key: "id",
                sorting: {
                    asc: "asc"
                }
            },
            issuedDate: {
                key: "issuedDate",
                sorting: {
                    asc: "asc",
                    dsc: "desc"
                }
            },
            soldDate: {
                key: "soldDate",
                sorting: {
                    asc: "asc",
                    dsc: "desc"
                }
            },
            auditedDate: {
                key: "audtitedDate",
                sorting: {
                    asc: "asc",
                    dsc: "desc"
                }
            }
        }
    }
}

const filtersModel = {filters: {singles: {}, ranges: {}}, specialFilters: {singles: {}, ranges: {}}, orders: {key: prescriptionFilters.orders.key, values: {}}}

const doctorAvailableFilters = lang.cloneDeep(filtersModel)
doctorAvailableFilters.filters.singles.id = lang.cloneDeep(prescriptionFilters.singles.id)
doctorAvailableFilters.filters.singles.status = lang.cloneDeep(prescriptionFilters.singles.status)
doctorAvailableFilters.filters.singles.status.values = [availableStates.ISSUED, availableStates.CANCELLED, availableStates.CONFIRMED, availableStates.INCOMPLETE, availableStates.AUDITED, availableStates.REJECTED, availableStates.PARTIALLY_REJECTED]
doctorAvailableFilters.filters.ranges.issueDateRange = lang.cloneDeep(prescriptionFilters.ranges.issueDateRange)
doctorAvailableFilters.specialFilters.singles.institution = lang.cloneDeep(prescriptionFilters.singles.institution)
doctorAvailableFilters.specialFilters.singles.medicalInsurance = lang.cloneDeep(prescriptionFilters.singles.medicalInsurance)
doctorAvailableFilters.specialFilters.singles.medicine = lang.cloneDeep(prescriptionFilters.singles.medicine)
doctorAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
doctorAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)

const affiliateAvailableFilters = lang.cloneDeep(filtersModel)
affiliateAvailableFilters.filters.singles.id = lang.cloneDeep(prescriptionFilters.singles.id)
affiliateAvailableFilters.filters.singles.status = lang.cloneDeep(prescriptionFilters.singles.status)
affiliateAvailableFilters.filters.singles.status.values = [availableStates.CONFIRMED, availableStates.EXPIRED, availableStates.RECEIVED, availableStates.PARTIALLY_RECEIVED]
affiliateAvailableFilters.filters.ranges.issueDateRange = lang.cloneDeep(prescriptionFilters.ranges.issueDateRange)
affiliateAvailableFilters.filters.ranges.receivedDateRange = lang.cloneDeep(prescriptionFilters.ranges.receivedDateRange)
affiliateAvailableFilters.specialFilters.singles.institution = lang.cloneDeep(prescriptionFilters.singles.institution)
affiliateAvailableFilters.specialFilters.singles.medicalInsurance = lang.cloneDeep(prescriptionFilters.singles.medicalInsurance)
affiliateAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
affiliateAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)
affiliateAvailableFilters.orders.values.soldDate = lang.cloneDeep(prescriptionFilters.orders.values.soldDate)

const pharmacistAvailableFilters = lang.cloneDeep(filtersModel)
pharmacistAvailableFilters.filters.singles.id = lang.cloneDeep(prescriptionFilters.singles.id)
pharmacistAvailableFilters.filters.singles.status = lang.cloneDeep(prescriptionFilters.singles.status)
pharmacistAvailableFilters.filters.singles.status.values = [availableStates.RECEIVED, availableStates.PARTIALLY_RECEIVED, availableStates.INCOMPLETE, availableStates.AUDITED, availableStates.REJECTED, availableStates.PARTIALLY_REJECTED]
pharmacistAvailableFilters.filters.ranges.issueDateRange = lang.cloneDeep(prescriptionFilters.ranges.issueDateRange)
pharmacistAvailableFilters.filters.ranges.receivedDateRange = lang.cloneDeep(prescriptionFilters.ranges.receivedDateRange)
pharmacistAvailableFilters.specialFilters.singles.institution = lang.cloneDeep(prescriptionFilters.singles.institution)
pharmacistAvailableFilters.specialFilters.singles.medicalInsurance = lang.cloneDeep(prescriptionFilters.singles.medicalInsurance)
pharmacistAvailableFilters.specialFilters.singles.medicine = lang.cloneDeep(prescriptionFilters.singles.medicine)
pharmacistAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
pharmacistAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)
pharmacistAvailableFilters.orders.values.soldDate = lang.cloneDeep(prescriptionFilters.orders.values.soldDate)

const medicalInsuranceAvailableFilters = lang.cloneDeep(filtersModel)
medicalInsuranceAvailableFilters.filters.singles.id = lang.cloneDeep(prescriptionFilters.singles.id)
medicalInsuranceAvailableFilters.filters.singles.status = lang.cloneDeep(prescriptionFilters.singles.status)
medicalInsuranceAvailableFilters.filters.singles.status.values = [availableStates.ISSUED, availableStates.CANCELLED, availableStates.CONFIRMED, availableStates.EXPIRED, availableStates.RECEIVED, availableStates.PARTIALLY_RECEIVED, availableStates.INCOMPLETE, availableStates.AUDITED, availableStates.REJECTED, availableStates.PARTIALLY_REJECTED]
medicalInsuranceAvailableFilters.filters.ranges.issueDateRange = lang.cloneDeep(prescriptionFilters.ranges.issueDateRange)
medicalInsuranceAvailableFilters.filters.ranges.receivedDateRange = lang.cloneDeep(prescriptionFilters.ranges.receivedDateRange)
medicalInsuranceAvailableFilters.filters.ranges.auditedDateRange = lang.cloneDeep(prescriptionFilters.ranges.auditedDateRange)
medicalInsuranceAvailableFilters.specialFilters.singles.institution = lang.cloneDeep(prescriptionFilters.singles.institution)
medicalInsuranceAvailableFilters.specialFilters.singles.doctor = lang.cloneDeep(prescriptionFilters.singles.doctor)
medicalInsuranceAvailableFilters.specialFilters.singles.affiliate = lang.cloneDeep(prescriptionFilters.singles.affiliate)
medicalInsuranceAvailableFilters.specialFilters.singles.pharmacist = lang.cloneDeep(prescriptionFilters.singles.pharmacist)
medicalInsuranceAvailableFilters.specialFilters.singles.medicine = lang.cloneDeep(prescriptionFilters.singles.medicine)
medicalInsuranceAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
medicalInsuranceAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)
medicalInsuranceAvailableFilters.orders.values.soldDate = lang.cloneDeep(prescriptionFilters.orders.values.soldDate)
medicalInsuranceAvailableFilters.orders.values.auditedDate = lang.cloneDeep(prescriptionFilters.orders.values.auditedDate)

const getAffiliateAvailableFilters = () => {return lang.cloneDeep(pharmacistAvailableFilters)}
const getDoctorAvailableFilters = () => {return lang.cloneDeep(doctorAvailableFilters)}
const getPharmacistAvailableFilters = () => {return lang.cloneDeep(pharmacistAvailableFilters)}
const getMedicalInsuranceAvailableFilters = () => {return lang.cloneDeep(medicalInsuranceAvailableFilters)}

const transformToAvailableQueryParams = (availableFilters) => {
    let transformedFilters = {}
    let transformedOrders = {}
    const {singles: commonSimpleFilters} = availableFilters.filters
    const {ranges: commonRangedFilters} = availableFilters.filters
    const {singles: specialSimpleFilters} = availableFilters.specialFilters
    const {ranges: specialRangedFilters} = availableFilters.specialFilters
    const {values: orderValues} = availableFilters.orders
    transformedFilters = Object.keys(commonSimpleFilters).reduce((transformed, key) => {
        transformed[commonSimpleFilters[key].key] = {}
        if (commonSimpleFilters[key].values){
            transformed[commonSimpleFilters[key].key].values = commonSimpleFilters[key].values.map((value) => value.id)
        }
        return transformed
    }, transformedFilters)
    transformedFilters = Object.keys(specialSimpleFilters).reduce((transformed, key) => {
        transformed[specialSimpleFilters[key].key] = {}
        if (specialSimpleFilters[key].values){
            transformed[specialSimpleFilters[key].key].values = specialSimpleFilters[key].values.map((value) => value.id)
        }
        return transformed
    }, transformedFilters)
    transformedFilters = Object.keys(commonRangedFilters).reduce((transformed, key) => {
        transformed[commonRangedFilters[key].keyFrom] = {format: commonRangedFilters[key].format}
        transformed[commonRangedFilters[key].keyTo] = {format: commonRangedFilters[key].format}
        return transformed
    }, transformedFilters)
    transformedFilters = Object.keys(specialRangedFilters).reduce((transformed, key) => {
        transformed[specialRangedFilters[key].keyFrom] = {format: specialRangedFilters[key].format}
        transformed[specialRangedFilters[key].keyTo] = {format: specialRangedFilters[key].format}
        return transformed
    }, transformedFilters)
    transformedOrders = Object.keys(orderValues).reduce((transformed, key) => {
        transformed[orderValues[key].key] = object.invert(orderValues[key].sorting)
        return transformed
    }, transformedOrders)
    return {filters: transformedFilters, orders: transformedOrders}
}

const queryBuilder = (params, caller, availableFilters) => {
    let queryObject = {filters: {}, orders: {}}
    if (params && typeof params === 'object' && !(params instanceof Array)){
        const availableQueryparams = transformToAvailableQueryParams(availableFilters)
        queryObject = Object.keys(params).reduce((queryObject, key) => {
            if (availableQueryparams.filters[key]){
                if (availableQueryparams.filters[key].values){
                    const correctValues = array.intersection(availableQueryparams.filters[key].values, params[key].split(','))
                    if (correctValues.length){
                        queryObject.filters[key] = correctValues
                    }
                } else if (availableQueryparams.filters[key].format){
                    const formatedDate = moment(params[key], availableQueryparams.filters[key].format)
                    if (formatedDate.isValid()){
                        queryObject.filters[key] = params[key]
                    }
                } else {
                    queryObject.filters[key] = params[key]
                }
            } else if (key === availableFilters.orders.key){
                const orderKey = params[key].split(' ')[0]
                const sortKey = params[key].split(' ')[1]
                if (availableQueryparams.orders[orderKey]){
                    if (availableQueryparams.orders[orderKey][sortKey]){
                        queryObject.orders[orderKey] = sortKey
                    }
                }
            }
            return queryObject
        }, queryObject)
    }
    if (caller.type === 'affiliate'){ queryObject.filters[prescriptionFilters.singles.affiliate.key] = caller.id}
    else if (caller.type === 'doctor'){ queryObject.filters[prescriptionFilters.singles.doctor.key] = caller.id}
    else if (caller.type === 'pharmacist'){ queryObject.filters[prescriptionFilters.singles.pharmacist.key] = caller.id}
    else if (caller.type === 'medicalInsurance'){ queryObject.filters[prescriptionFilters.singles.medicalInsurance.key] = caller.id}
    return queryObject
}

module.exports = {
    getAffiliateAvailableFilters,
    getDoctorAvailableFilters,
    getPharmacistAvailableFilters,
    getMedicalInsuranceAvailableFilters,
    getAffiliateQueryByParams: (params, id) => {return queryBuilder(params, {type: 'affiliate', id}, getAffiliateAvailableFilters())},
    getDoctorQueryByParams: (params, id) => {return queryBuilder(params, {type: 'doctor', id}, getDoctorAvailableFilters())},
    getPharmacistQueryByParams: (params, id) => {return queryBuilder(params, {type: 'pharmacist', id}, getPharmacistAvailableFilters())},
    getMedicalInsuranceQueryByParams: (params, id) => {return queryBuilder(params, {type: 'medicalInsurance', id}, getMedicalInsuranceAvailableFilters())}
}