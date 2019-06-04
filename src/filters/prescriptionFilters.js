const lang = require('lodash/lang')
const {formats} = require('../utils/utils')
const {states} = require('../state-machine/state')

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

const doctorAvailableFilters = {filters: {singles: {}, ranges: {}}, specialFilters: {singles: {}, ranges: {}}, orders: {key: prescriptionFilters.orders.key, values: {}}}
doctorAvailableFilters.filters.singles.id = lang.cloneDeep(prescriptionFilters.singles.id)
doctorAvailableFilters.filters.singles.status = lang.cloneDeep(prescriptionFilters.singles.status)
doctorAvailableFilters.filters.singles.status.values = [availableStates.ISSUED, availableStates.CANCELLED, availableStates.CONFIRMED, availableStates.INCOMPLETE, availableStates.AUDITED, availableStates.REJECTED, availableStates.PARTIALLY_REJECTED]
doctorAvailableFilters.filters.ranges.issueDateRange = lang.cloneDeep(prescriptionFilters.ranges.issueDateRange)
doctorAvailableFilters.specialFilters.singles.institution = lang.cloneDeep(prescriptionFilters.singles.institution)
doctorAvailableFilters.specialFilters.singles.medicalInsurance = lang.cloneDeep(prescriptionFilters.singles.medicalInsurance)
doctorAvailableFilters.specialFilters.singles.medicine = lang.cloneDeep(prescriptionFilters.singles.medicine)
doctorAvailableFilters.orders.values.id = lang.cloneDeep(prescriptionFilters.orders.values.id)
doctorAvailableFilters.orders.values.issuedDate = lang.cloneDeep(prescriptionFilters.orders.values.issuedDate)

const affiliateAvailableFilters = {filters: {singles: {}, ranges: {}}, specialFilters: {singles: {}, ranges: {}}, orders: {key: prescriptionFilters.orders.key, values: {}}}
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

const pharmacistAvailableFilters = {filters: {singles: {}, ranges: {}}, specialFilters: {singles: {}, ranges: {}}, orders: {key: prescriptionFilters.orders.key, values: {}}}
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

const medicalInsuranceAvailableFilters = {filters: {singles: {}, ranges: {}}, specialFilters: {singles: {}, ranges: {}}, orders: {key: prescriptionFilters.orders.key, values: {}}}
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

module.exports = {
    getAffiliateAvailableFilters: () => {return lang.cloneDeep(pharmacistAvailableFilters)},
    getDoctorAvailableFilters: () => {return lang.cloneDeep(doctorAvailableFilters)},
    getPharmacistAvailableFilters: () => {return lang.cloneDeep(pharmacistAvailableFilters)},
    getMedicalInsuranceAvailableFilters: () => {return lang.cloneDeep(medicalInsuranceAvailableFilters)}
}