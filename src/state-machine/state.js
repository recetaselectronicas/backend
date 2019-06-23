const { newNullOrEmptyError, generateFieldCause } = require('../utils/errors')
const {
  getArrayNotEmptyError,
  getNotNullError,
  getDiferentValueError,
  getValueNotInListError,
  getBeNullError,
  getArrayDoesntMatchError,
  getObjectDoesntMatchError
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
  id: 'ISSUED',
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
      // TODO : descomentar esto
      // getNotNullError(prescription.norm, prescriptionEntity, prescriptionFields.norm),
      getArrayNotEmptyError(prescription.items, prescriptionEntity, prescriptionFields.items),
      ...getArrayDoesntMatchError(prescription.items, 'prescribed.quantity', value => typeof value === 'number' && !!value, itemEntity, itemFields.prescribed.quantity),
      ...getArrayDoesntMatchError(prescription.items, 'prescribed.medicine.id', value => typeof value === 'number' && !!value, itemEntity, itemFields.prescribed.medicine.id)
    ]
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = [
      getDiferentValueError(prescription.soldDate, null, prescriptionEntity, prescriptionFields.soldDate),
      getDiferentValueError(prescription.auditedDate, null, prescriptionEntity, prescriptionFields.auditedDate)
      // TODO: Hacer que de error cuando no es null los atributos en received y audited
      // ...getArrayDoesntMatchError(prescription.items, 'received.quantity', value => !value, itemEntity, itemFields.received.quantity),
      // ...getArrayDoesntMatchError(prescription.items, 'received.medicine.id', value => !value, itemEntity, itemFields.received.medicine.id),
    ]
    return errors
  }
}
const CANCELLED = {
  id: 'CANCELLED',
  status: 'CANCELADA',
  validate: validator,
  getStatusError: prescription => getDiferentValueError(prescription.status, ISSUED.id, prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    const errors = ISSUED.getErrors(prescription)
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = [
      getNotNullError(prescription.statusReason, prescriptionEntity, prescriptionFields.statusReason)
      // TODO: SI pasó determinada cantidad de tiempo no puede cancelar
    ]
    return errors
  }
}
const CONFIRMED = {
  id: 'CONFIRMED',
  status: 'CONFIRMADA',
  validate: validator,
  getStatusError: prescription => getDiferentValueError(prescription.status, ISSUED.id, prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    const errors = ISSUED.getErrors(prescription)
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  }
}
const EXPIRED = {
  id: 'EXPIRED',
  status: 'VENCIDA',
  validate: validator,
  getStatusError: prescription => getDiferentValueError(prescription.status, CONFIRMED.id, prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    const errors = CONFIRMED.getErrors(prescription)
    // TODO: Agregar validaciones para pasar a VENCIDA
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  }
}
const RECEIVED = {
  id: 'RECEIVED',
  status: 'RECEPCIONADA',
  validate: validator,
  getStatusError: prescription => getValueNotInListError(prescription.status, [CONFIRMED.id, PARTIALLY_RECEIVED.id], prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    let errors = []
    if (prescription.status === CONFIRMED.id) {
      errors = CONFIRMED.getErrors(prescription)
    }
    if (prescription.status === PARTIALLY_RECEIVED.id) {
      errors = PARTIALLY_RECEIVED.getErrors(prescription)
    }
    // TODO: Agregar validaciones para pasar a RECEPCIONADA
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = [
      getNotNullError(prescription.soldDate, prescriptionEntity, prescriptionFields.soldDate),
      ...getArrayDoesntMatchError(prescription.items, 'received.quantity', value => typeof value === 'number' && !!value, itemEntity, itemFields.received.quantity),
      ...getArrayDoesntMatchError(prescription.items, 'received.medicine.id', value => typeof value === 'number' && !!value, itemEntity, itemFields.received.medicine.id),
      ...getArrayDoesntMatchError(prescription.items, 'received.pharmacist.id', value => typeof value === 'number' && !!value, itemEntity, itemFields.received.pharmacist.id),
      // ...getArrayDoesntMatchError(prescription.items, 'received.soldDate', value => typeof value === 'moment' && !!value, itemEntity, itemFields.received.soldDate),
      ...getArrayDoesntMatchError(prescription.items, 'audited.quantity', value => !value, itemEntity, itemFields.audited.quantity),
      ...getArrayDoesntMatchError(prescription.items, 'audited.medicine.id', value => !value, itemEntity, itemFields.audited.medicine.id)
    ]
    return errors
  }
}
const PARTIALLY_RECEIVED = {
  id: 'PARTIALLY_RECEIVED',
  status: 'PARCIALMENTE RECEPCIONADA',
  validate: validator,
  getStatusError: prescription => getValueNotInListError(prescription.status, [CONFIRMED.id, PARTIALLY_RECEIVED.id], prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    const errors = CONFIRMED.getErrors(prescription)
    // TODO: Agregar validaciones para pasar a PARCIALMENTE_RECEPCIONADAS
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = [
      getNotNullError(prescription.soldDate, prescriptionEntity, prescriptionFields.soldDate),
      ...getArrayDoesntMatchError(prescription.items, 'audited.quantity', value => !value, itemEntity, itemFields.audited.quantity),
      ...getArrayDoesntMatchError(prescription.items, 'audited.medicine.id', value => !value, itemEntity, itemFields.audited.medicine.id)
    ]
    return errors
  }
}
const INCOMPLETE = {
  id: 'INCOMPLETE',
  status: 'INCOMPLETA',
  validate: validator,
  getStatusError: prescription => getDiferentValueError(prescription.id, PARTIALLY_RECEIVED.id, prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    const errors = PARTIALLY_RECEIVED.getErrors(prescription)
    // TODO: Agregar validaciones para pasar a INCOMPLETA
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  }
}
const AUDITED = {
  id: 'AUDITED',
  status: 'AUDITADA',
  validate: validator,
  getStatusError: prescription => getValueNotInListError(prescription.status, [INCOMPLETE.id, RECEIVED.id], prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    let errors = []
    if (prescription.status === INCOMPLETE.id) {
      errors = INCOMPLETE.getErrors(prescription)
    }
    if (prescription.status === RECEIVED.id) {
      errors = RECEIVED.getErrors(prescription)
    }
    // TODO: Agregar validaciones para pasar a INCOMPLETA
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = [
      // ...getArrayDoesntMatchError(prescription.items, 'received.quantity', value => typeof value === 'number' && !!value, itemEntity, itemFields.received.quantity),
      // ...getArrayDoesntMatchError(prescription.items, 'received.medicine.id', value => typeof value === 'number' && !!value, itemEntity, itemFields.received.medicine.id),
      // ...getArrayDoesntMatchError(prescription.items, 'received.pharmacist.id', value => typeof value === 'number' && !!value, itemEntity, itemFields.received.pharmacist.id),
      // // ...getArrayDoesntMatchError(prescription.items, 'received.soldDate', value => typeof value === 'moment' && !!value, itemEntity, itemFields.received.soldDate),
      // ...getArrayDoesntMatchError(prescription.items, 'audited.quantity', value => typeof value === 'number' && !!value, itemEntity, itemFields.audited.quantity),
      // ...getArrayDoesntMatchError(prescription.items, 'audited.medicine.id', value => typeof value === 'number' && !!value, itemEntity, itemFields.audited.medicine.id)
    ]
    return errors
  }
}
const REJECTED = {
  id: 'REJECTED',
  status: 'RECHAZADA',
  validate: validator,
  getStatusError: prescription => getValueNotInListError(prescription.status, [INCOMPLETE.id, RECEIVED.id], prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    let errors = []
    if (prescription.status === INCOMPLETE.id) {
      errors = INCOMPLETE.getErrors(prescription)
    }
    if (prescription.status === RECEIVED.id) {
      errors = RECEIVED.getErrors(prescription)
    }
    // TODO: Agregar validaciones para pasar a RECHAZADA
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  }
}
const PARTIALLY_REJECTED = {
  id: 'PARTIALLY_REJECTED',
  status: 'PARCIALMENTE RECHAZADA',
  validate: validator,
  getStatusError: prescription => getValueNotInListError(prescription.status, [INCOMPLETE.id, RECEIVED.id], prescriptionEntity, prescriptionFields.status),
  getErrors: (prescription) => {
    let errors = []
    if (prescription.status === INCOMPLETE.id) {
      errors = INCOMPLETE.getErrors(prescription)
    }
    if (prescription.status === RECEIVED.id) {
      errors = RECEIVED.getErrors(prescription)
    }
    // TODO: Agregar validaciones para pasar a PARCIALMENTE_RECHAZADA
    return errors
  },
  getSpecificErrors: (prescription) => {
    const errors = []
    return errors
  }
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
  PARTIALLY_REJECTED
}

const statesMap = Object.keys(states).reduce((map, state) => {
  // eslint-disable-next-line no-param-reassign
  map[states[state].status] = {}
  return map
}, {})

module.exports = { states, statesMap }
