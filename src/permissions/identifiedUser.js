/* eslint-disable no-unused-vars */
const lang = require('lodash/lang')
const filters = require('../filters/prescriptions/prescriptionFilters')
const { newForbiddenResourceException } = require('../utils/errors')
const { InstitutionRepository } = require('../repositories/institutionRepository')
const { AffiliateRepository } = require('../repositories/affiliateRepository')
const { PatientRepository } = require('../repositories/patientRepository')
const { DoctorRepository } = require('../repositories/doctorRepository')
const { MedicalInsuranceRepository } = require('../repositories/medicalInsuranceRepository')
const { PharmacistRepository } = require('../repositories/pharmacistRepository')
const { states } = require('../state-machine/state')

const userTypes = {
  AFFILIATE: 'affiliate',
  DOCTOR: 'doctor',
  PHARMACIST: 'pharmacist',
  MEDICAL_INSURANCE: 'medicalInsurance'
}

const authenticationTypes = {
  USR_PASS: 'usr_pass',
  TWO_FACTOR: 'two_factor',
  DNI: 'dni'
}

const authorizationActionTypes = {
  RECEIVE_PRESCRIPTION: 'receive',
  AUTHORIZE_RECEIVE_PRESCRIPTION: 'authorize_receive',
  ISSUE_PRESCRIPTION: 'issue',
  AUTHORIZE_ISSUE_PRESCRIPTION: 'authorize_issue',
  CANCEL_PRESCRIPTION: 'cancel_prescription'
}

const availableActions = {
  CANCEL: 'CANCEL',
  RECEIVE: 'RECEIVE',
  AUDIT: 'AUDIT'
}

const identifiedUser = {
  id: null,
  username: null,
  type: null,
  getFilters: null,
  getQuery: null,
  checkForbiden: null,
  getActions: null,
  canIssue: null,
  canReceive: null,
  canCancel: null,
  canAudit: null,
  getMenu: null,
  getData: null
}

const identifiedAffiliate = {
  ...identifiedUser,
  type: userTypes.AFFILIATE,
  getFilters: async () => {
    const muttedFilters = filters.getAffiliateAvailableFilters()
    muttedFilters.filters.institution.values = await InstitutionRepository.getAll().map(({ id, description }) => ({ id, value: description }))
    return muttedFilters
  },
  getQuery(params) {
    return filters.getAffiliateQueryByParams(params, this.id)
  },
  checkForbiden(prescription) {
    if (prescription.affiliate.id !== this.id) {
      throw newForbiddenResourceException("Can't access this prescription")
    }
  },
  getActions: prescription => [],
  getMenu: () => [{ label: 'Ver recetas', url: '/recetas' }, { label: 'Obra sociales', url: '/obras-sociales' }],
  async getData() {
    const patient = await PatientRepository.getById(this.id)
    const affiliations = await AffiliateRepository.getAffiliations(this.id)
    const data = {
      data: patient.toPlainObject(),
      affiliations: affiliations.map(affiliation => affiliation.toPlainObject())
    }
    return data
  },
  canIssue: () => false,
  canReceive: () => false,
  canCancel: () => false,
  canAudit: () => false
}

const identifiedDoctor = {
  ...identifiedUser,
  type: userTypes.DOCTOR,
  getFilters: async () => {
    const muttedFilters = filters.getDoctorAvailableFilters()
    muttedFilters.filters.institution.values = await InstitutionRepository.getAll().map(({ id, description }) => ({ id, value: description }))
    return muttedFilters
  },
  getQuery(params) {
    return filters.getDoctorQueryByParams(params, this.id)
  },
  checkForbiden(prescription) {
    if (prescription.doctor.id !== this.id) {
      throw newForbiddenResourceException("Can't access this prescription")
    }
  },
  getMenu: () => [{ label: 'Emitir', url: '/emitir' }, { label: 'Ver recetas', url: '/recetas' }],
  getData() {
    return DoctorRepository.getById(this.id)
  },
  getActions: prescription => [{ id: availableActions.CANCEL, disabled: prescription.status !== states.ISSUED.id }],
  canIssue: () => true,
  canReceive: () => false,
  canCancel: () => true,
  canAudit: () => false
}

const identifiedPharmacist = {
  ...identifiedUser,
  type: userTypes.PHARMACIST,
  getFilters: async () => {
    const muttedFilters = filters.getPharmacistAvailableFilters()
    muttedFilters.filters.institution.values = await InstitutionRepository.getAll().map(({ id, description }) => ({ id, value: description }))
    return muttedFilters
  },
  getQuery(params) {
    return filters.getPharmacistQueryByParams(params, this.id)
  },
  checkForbiden(prescription) {
    if (prescription.items.every(item => item.received.pharmacist.id !== this.id)) {
      throw newForbiddenResourceException("Can't access this prescription")
    }
  },
  getMenu: () => [{ label: 'Ver recetas', url: '/recetas' }, { label: 'Recepcionar', url: '/recepcionar' }],
  getData() {
    return PharmacistRepository.getById(this.id)
  },
  getActions: prescription => [{ id: availableActions.RECEIVE, disabled: prescription.status !== states.CONFIRMED.id && prescription.status !== states.PARTIALLY_RECEIVED.id }],
  canIssue: () => false,
  canReceive: () => true,
  canCancel: () => false,
  canAudit: () => false
}

const identifiedMedicalInsurance = {
  ...identifiedUser,
  type: userTypes.MEDICAL_INSURANCE,
  getFilters: async () => {
    const muttedFilters = filters.getMedicalInsuranceAvailableFilters()
    muttedFilters.filters.institution.values = await InstitutionRepository.getAll().map(({ id, description }) => ({ id, value: description }))
    return muttedFilters
  },
  getQuery(params) {
    return filters.getMedicalInsuranceQueryByParams(params, this.id)
  },
  checkForbiden(prescription) {
    if (prescription.medicalInsurance.id !== this.id) {
      throw newForbiddenResourceException("Can't access this prescription")
    }
  },
  getActions: ({ status }) => {
    const canAudit = status === states.RECEIVED.id || status === states.INCOMPLETE.id
    return [
      {
        id: availableActions.AUDIT,
        disabled: !canAudit
      }
    ]
  },
  getMenu: () => [{ label: 'Normas', url: '/normas' }, { label: 'Ver recetas', url: '/recetas' }, { label: 'Solicitudes', url: '/solicitudes' }],
  getData() {
    return MedicalInsuranceRepository.getById(this.id)
  },
  canIssue: () => false,
  canReceive: () => false,
  canCancel: () => false,
  canAudit: () => true
}

const getIdentifiedAffiliate = (id, username) => {
  const affiliate = lang.cloneDeep(identifiedAffiliate)
  affiliate.id = id
  affiliate.username = username
  return affiliate
}

const getIdentifiedDoctor = (id, username) => {
  const doctor = lang.cloneDeep(identifiedDoctor)
  doctor.id = id
  doctor.username = username
  return doctor
}

const getIdentifiedPharmacist = (id, username) => {
  const pharmacist = lang.cloneDeep(identifiedPharmacist)
  pharmacist.id = id
  pharmacist.username = username
  return pharmacist
}

const getIdentifiedMedicalInsurance = (id, username) => {
  const medicalInsurance = lang.cloneDeep(identifiedMedicalInsurance)
  medicalInsurance.id = id
  medicalInsurance.username = username
  return medicalInsurance
}
const userPermissions = {
  affiliate: {
    getPermissions: (id, username) => getIdentifiedAffiliate(id, username)
  },
  medicalInsurance: {
    getPermissions: (id, username) => getIdentifiedMedicalInsurance(id, username)
  },
  pharmacist: {
    getPermissions: (id, username) => getIdentifiedPharmacist(id, username)
  },
  doctor: {
    getPermissions: (id, username) => getIdentifiedDoctor(id, username)
  }
}
const getIdentifiedUserBy = (type, id, username) => userPermissions[type].getPermissions(id, username)
module.exports = {
  getIdentifiedAffiliate,
  getIdentifiedDoctor,
  getIdentifiedPharmacist,
  getIdentifiedMedicalInsurance,
  getIdentifiedUserBy,
  userPermissions,
  authenticationTypes,
  authorizationActionTypes,
  userTypes
}
