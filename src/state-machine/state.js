const { newNullOrEmptyError, generateFieldCause } = require('../utils/errors')
const {
  getArrayNotEmptyError, getNotNullError, getDiferentValueError, getValueNotInListError, getBeNullError, getArrayDoesntMatchError, getObjectDoesntMatchError,
} = require('../utils/errors')
const { codes } = require('../codes/entities-codes')
const array = require('lodash/array')

const { name: prescriptionEntity, fields: prescriptionFields } = codes.PRESCRIPTION
const { name: affiliateEntity, fields: affiliateFields } = codes.AFFILIATE
const { name: doctorEntity, fields: doctorFields } = codes.DOCTOR
const { name: medicalInsuranceEntity, fields: medicalInsuranceFields } = codes.MEDICAL_INSURANCE
const { name: itemEntity, fields: itemFields } = codes.ITEM

const validator = function (prescription) {
  if (!prescription) {
    throw [newNullOrEmptyError('prescription cant be null or empty', generateFieldCause(prescriptionEntity, null))]
  }
  const statusError = this.getStatusError(prescription)
  const errors = array.compact(this.getErrors(prescription).concat(this.getSpecificErrors(prescription)))
  if (statusError) {
    errors.push(statusError)
  }
  if (errors.length) {
    throw errors
  }
}
const ISSUED = {
  status: 'EMITIDA',
  validate: validator,
  getStatusError: prescription => getBeNullError(prescription.status, prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    const errors = [
      getNotNullError(prescription.issuedDate, prescriptionEntity, prescriptionFields.issuedDate),
      getNotNullError(prescription.ttl, prescriptionEntity, prescriptionFields.ttl),
      getNotNullError(prescription.affiliate, prescriptionEntity, prescriptionFields.affiliate),
      getObjectDoesntMatchError(prescription, 'affiliate.id', value => typeof value === 'number' && !!value, affiliateEntity, affiliateFields.id),
      getNotNullError(prescription.doctor, prescriptionEntity, prescriptionFields.doctor),
      getObjectDoesntMatchError(prescription, 'doctor.id', value => typeof value === 'number' && !!value, doctorEntity, doctorFields.id),
      getNotNullError(prescription.medicalInsurance, prescriptionEntity, prescriptionFields.medicalInsurance),
      getObjectDoesntMatchError(prescription, 'medicalInsurance.id', value => typeof value === 'number' && !!value, medicalInsuranceEntity, medicalInsuranceFields.id),
      getNotNullError(prescription.norm, prescriptionEntity, prescriptionFields.norm),
      getArrayNotEmptyError(prescription.items, prescriptionEntity, prescriptionFields.items),
      ...getArrayDoesntMatchError(prescription.items, 'prescribed.quantity', value => typeof value === 'number' && !!value, itemEntity, itemFields.prescribed.quantity),
      ...getArrayDoesntMatchError(prescription.items, 'prescribed.medicine.id', value => typeof value === 'number' && !!value, itemEntity, itemFields.prescribed.medicine.id),
    ]
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = [
      getDiferentValueError(prescription.soldDate, null, prescriptionEntity, prescriptionFields.soldDate),
      getDiferentValueError(prescription.auditedDate, null, prescriptionEntity, prescriptionFields.auditedDate),
    ]
    return errors
  },
}
const CANCELLED = {
  status: 'CANCELADA',
  validate: validator,
  getStatusError: prescription => getDiferentValueError(prescription.status, ISSUED.status, prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    const errors = ISSUED.getErrors(prescription)
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  },
}
const CONFIRMED = {
  status: 'CONFIRMADA',
  validate: validator,
  getStatusError: prescription => getDiferentValueError(prescription.status, ISSUED.status, prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    const errors = ISSUED.getErrors(prescription)
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  },
}
const EXPIRED = {
  status: 'VENCIDA',
  validate: validator,
  getStatusError: prescription => getDiferentValueError(prescription.status, CONFIRMED.status, prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    const errors = CONFIRMED.getErrors(prescription)
    // TODO: Agregar validaciones para pasar a VENCIDA
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  },
}
const RECEIVED = {
  status: 'RECEPCIONADA',
  validate: validator,
  getStatusError: prescription => getValueNotInListError(prescription.status, [CONFIRMED.status, PARTIALLY_RECEIVED.status], prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    let errors = []
    if (prescription.status === CONFIRMED.status) {
      errors = CONFIRMED.getErrors(prescription)
    }
    if (prescription.status === PARTIALLY_RECEIVED.status) {
      errors = PARTIALLY_RECEIVED.getErrors(prescription)
    }
    // TODO: Agregar validaciones para pasar a RECEPCIONADA
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  },
}
const PARTIALLY_RECEIVED = {
  status: 'PARCIALMENTE_RECEPCIONADA',
  validate: validator,
  getStatusError: prescription => getDiferentValueError(prescription.status, CONFIRMED.status, prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    const errors = CONFIRMED.getErrors(prescription)
    // TODO: Agregar validaciones para pasar a PARCIALMENTE_RECEPCIONADAS
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  },
}
const INCOMPLETE = {
  status: 'INCOMPLETA',
  validate: validator,
  getStatusError: prescription => getDiferentValueError(prescription.status, PARTIALLY_RECEIVED.status, prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    const errors = PARTIALLY_RECEIVED.getErrors(prescription)
    // TODO: Agregar validaciones para pasar a INCOMPLETA
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  },
}
const AUDITED = {
  status: 'AUDITADA',
  validate: validator,
  getStatusError: prescription => getValueNotInListError(prescription.status, [INCOMPLETE.status, RECEIVED.status], prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    let errors = []
    if (prescription.status === INCOMPLETE.status) {
      errors = INCOMPLETE.getErrors(prescription)
    }
    if (prescription.status === RECEIVED.status) {
      errors = RECEIVED.getErrors(prescription)
    }
    // TODO: Agregar validaciones para pasar a INCOMPLETA
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  },
}
const REJECTED = {
  status: 'RECHAZADA',
  validate: validator,
  getStatusError: prescription => getValueNotInListError(prescription.status, [INCOMPLETE.status, RECEIVED.status], prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    let errors = []
    if (prescription.status === INCOMPLETE.status) {
      errors = INCOMPLETE.getErrors(prescription)
    }
    if (prescription.status === RECEIVED.status) {
      errors = RECEIVED.getErrors(prescription)
    }
    // TODO: Agregar validaciones para pasar a RECHAZADA
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  },
}
const PARTIALLY_REJECTED = {
  status: 'PARCIALMENTE_RECHAZADA',
  validate: validator,
  getStatusError: prescription => getValueNotInListError(prescription.status, [INCOMPLETE.status, RECEIVED.status], prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    let errors = []
    if (prescription.status === INCOMPLETE.status) {
      errors = INCOMPLETE.getErrors(prescription)
    }
    if (prescription.status === RECEIVED.status) {
      errors = RECEIVED.getErrors(prescription)
    }
    // TODO: Agregar validaciones para pasar a PARCIALMENTE_RECHAZADA
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  },
}
const states = {
  ISSUED,
  CANCELLED,
  CONFIRMED,
  EXPIRED,
  RECEIVED,
  PARTIALLY_RECEIVED,
  INCOMPLETE,
  AUDITED,
  REJECTED,
  PARTIALLY_REJECTED,
}

module.exports = { states }
