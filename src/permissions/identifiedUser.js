const lang = require('lodash/lang')
const filters = require('../filters/prescriptions/prescriptionFilters')
const { newForbiddenResourceException } = require('../utils/errors')

const userTypes = {
  AFFILIATE: 'affiliate',
  DOCTOR: 'doctor',
  PHARMACIST: 'pharmacist',
  MEDICAL_INSURANCE: 'medicalInsurance',
}

const availableActions = {
  CANCEL: 'CANCEL',
  RECEIVE: 'RECEIVE',
  AUDIT: 'AUDIT',
}

const identifiedUser = {
  id: null,
  type: null,
  getFilters: null,
  getQuery: null,
  checkForbiden: null,
  getActions: null,
}

const identifiedAffiliate = {
  ...identifiedUser,
  type: userTypes.AFFILIATE,
  getFilters: filters.getAffiliateAvailableFilters,
  getQuery(params) {
    return filters.getAffiliateQueryByParams(params, this.id)
  },
  checkForbiden(prescription) {
    if (prescription.affiliate.id !== this.id) {
      throw newForbiddenResourceException("Can't access this prescription")
    }
  },
  getActions: prescription => [],
}

const identifiedDoctor = {
  ...identifiedUser,
  type: userTypes.DOCTOR,
  getFilters: filters.getDoctorAvailableFilters,
  getQuery(params) {
    return filters.getDoctorQueryByParams(params, this.id)
  },
  checkForbiden(prescription) {
    if (prescription.doctor.id !== this.id) {
      throw newForbiddenResourceException("Can't access this prescription")
    }
  },
  getActions: prescription => [
    availableActions.CANCEL,
  ],
}

const identifiedPharmacist = {
  ...identifiedUser,
  type: userTypes.PHARMACIST,
  getFilters: filters.getPharmacistAvailableFilters,
  getQuery(params) {
    return filters.getPharmacistQueryByParams(params, this.id)
  },
  checkForbiden(prescription) {
    if (prescription.items.every(item => item.received.pharmacist.id !== this.id)) {
      throw newForbiddenResourceException("Can't access this prescription")
    }
  },
  getActions: prescription => [
    availableActions.RECEIVE,
  ],
}

const identifiedMedicalInsurance = {
  ...identifiedUser,
  type: userTypes.MEDICAL_INSURANCE,
  getFilters: filters.getMedicalInsuranceAvailableFilters,
  getQuery(params) {
    return filters.getMedicalInsuranceQueryByParams(params, this.id)
  },
  checkForbiden(prescription) {
    if (prescription.medicalInsurance.id !== this.id) {
      throw newForbiddenResourceException("Can't access this prescription")
    }
  },
  getActions: prescription => [
    availableActions.AUDIT,
  ],
}

const getIdentifiedAffiliate = (id) => {
  const affiliate = lang.cloneDeep(identifiedAffiliate)
  affiliate.id = id
  return affiliate
}

const getIdentifiedDoctor = (id) => {
  const doctor = lang.cloneDeep(identifiedDoctor)
  doctor.id = id
  return doctor
}

const getIdentifiedPharmacist = (id) => {
  const pharmacist = lang.cloneDeep(identifiedPharmacist)
  pharmacist.id = id
  return pharmacist
}

const getIdentifiedMedicalInsurance = (id) => {
  const medicalInsurance = lang.cloneDeep(identifiedMedicalInsurance)
  medicalInsurance.id = id
  return medicalInsurance
}

module.exports = {
  getIdentifiedAffiliate,
  getIdentifiedDoctor,
  getIdentifiedPharmacist,
  getIdentifiedMedicalInsurance,
}
