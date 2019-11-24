const moment = require('moment')
const { dateFormat, dateTimeFormat, formats } = require('../utils/utils')

const tableNames = {
  MEDICAL_BOOKLET: 'medical_booklet',
  MEDICAL_INSURANCE: 'medical_insurance',
  MEDICINE: 'medicine',
  ITEM: 'item',
  DOCTOR: 'doctor',
  VADEMECUM: 'vademecum',
  COVERAGE: 'coverage',
  COMPOSITION: 'composition',
  STATE: 'state',
  AFFILIATE: 'affiliate',
  PATIENT: 'patient',
  PLAN: 'plan',
  PRESCRIPTION: 'prescription',
  NORM: 'norm',
  INSTITUTION: 'institution',
  SPECIALITY: 'speciality',
  ATTENTION: 'attention',
  PHARMACIST: 'pharmacist',
  BRAND: 'brand',
  SIZE: 'size',
  SHAPE: 'shape',
  DRUG: 'drug',
  LABORATORY: 'laboratory',
  POTENCY: 'potency',
  RECEPTION: 'reception',
  AFFILIATE_REQUEST: 'affiliate_request',
  DOCTOR_REQUEST: 'doctor_request',
  PHARMACIST_REQUEST: 'pharmacist_request',
  PRESCRIPTIONS_STATISTICS_VIEW: 'prescription_statistics'
}

const dateFields = [
  'birth_date',
]

const dateTimeFields = [
  'entry_date',
  'leaving_date',
  'from_date',
  'to_date',
  'issued_date',
  'sold_date',
  'audited_date',
  'date_created',
  'prescription_issued_date',
  'item_sold_date',
  'prescription_audited_date'
]

const mustTransformDate = (field) => {
  return Object.values(tableNames).includes(field.table) && (dateFields.includes(field.name) || dateTimeFields.includes(field.name))
}

const getTransformedDate = (field) => {
  const stringField = field.string()
  if (stringField === null) {
    return null
  }
  if (field.type === 'DATE') {
    return moment(stringField, formats.isoDateFormat).format(formats.dateFormat)
  }
  return moment(stringField, formats.isoDateFormat).format(formats.dateTimeFormat)
}

module.exports = { ...tableNames, mustTransformDate, getTransformedDate }