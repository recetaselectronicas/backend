const _object = require('lodash/object')
const _array = require('lodash/array')
const { codes } = require('../codes/commonCodes')

const ERRORS_TYPE = codes.COMPANY.NAME

const error = {
  type: ERRORS_TYPE, // codigo para reconocer nuestros errores
  code: '', // codigo de error
  message: '', // mensaje descriptivo del error
  status: undefined, // statusCode, para web
  cause: null // causa del error (se va a crear un handler para esto para transformar la causa a algo estándar)
}

const causes = {
  FIELD_CAUSE: 'FIELD_CAUSE'
}

const errors = {
  UNEXPECTED_ERROR: { ...error, code: '0-000', message: 'Unexpected error ocurred', status: 500 },
  GENERIC_ERROR: { ...error, code: '0-001', message: 'Ups something went wrong' },
  DUPLICATED_VALUE_ERROR: { ...error, code: '1-000', message: 'Duplicated field values' },
  NULL_OR_EMPTY_VALUE_ERROR: { ...error, code: '1-001', message: 'Null or empty field value' },
  INVALID_VALUE_ERROR: { ...error, code: '1-002', message: 'Invalid field value' },
  ENTITY_ALREADY_CREATED: { ...error, code: '1-003', message: 'Entity already created' },
  NORM_RULE_FAILED: { ...error, code: '1-004', message: 'Rule failed' },
  NOT_FOUND_ERROR: { ...error, code: '1-100', message: 'Not found', status: 404 },
  BAD_REQUEST: { ...error, code: '1-101', message: 'Please verify the payload and try again', status: 400 },
  INVALID_USERNAME_OR_PASSWORD_ERROR: { ...error, code: '2-000', message: 'Invalid username or password', status: 401 },
  SESSION_EXPIRED_ERROR: { ...error, code: '2-001', message: 'Your session has expired', status: 403 },
  FORBIDDEN_RESOURCE_EXCEPTION: { ...error, code: '2-002', message: 'You can´t perform that action', status: 403 },
}

const newError = (type, message, cause, status) => {
  const anError = { ...errors[type] }
  anError.message = message || anError.message
  anError.status = status || anError.status
  anError.cause = cause || null
  return anError
}

const isBusinessError = error => error && (error.type === ERRORS_TYPE || (error.length && error.find(err => err.type === ERRORS_TYPE)))

const newUnexpectedError = (message, cause, status) => newError('UNEXPECTED_ERROR', message, cause, status)
const newGenericError = (message, cause, status) => newError('GENERIC_ERROR', message, cause, status)
const newDuplicatedValueError = (message, cause, status) => newError('DUPLICATED_VALUE_ERROR', message, cause, status)
const newNullOrEmptyError = (message, cause, status) => newError('NULL_OR_EMPTY_VALUE_ERROR', message, cause, status)
const newInvalidValueError = (message, cause, status) => newError('INVALID_VALUE_ERROR', message, cause, status)
const newEntityAlreadyCreated = (message, cause, status) => newError('ENTITY_ALREADY_CREATED', message, cause, status)
const newNormRuleFailed = (message, cause, status) => newError('NORM_RULE_FAILED', message, cause, status)
const newNotFoundError = (message, cause, status) => newError('NOT_FOUND_ERROR', message, cause, status)
const newBadRequestError = (message, cause, status) => newError('BAD_REQUEST', message, cause, status)
const newInvalidUsernameOrPasswordError = (message, cause, status) => newError('INVALID_USERNAME_OR_PASSWORD_ERROR', message, cause, status)
const newSessionExpiredError = (message, cause, status) => newError('SESSION_EXPIRED_ERROR', message, cause, status)
const newForbiddenResourceException = (message, cause, status) => newError('FORBIDDEN_RESOURCE_EXCEPTION', message, cause, status)

const generateFieldCause = (entity, field, actualValue, expectedValue) => {
  const cause = {
    type: causes.FIELD_CAUSE,
    entity,
    field
  }
  if (actualValue !== undefined) {
    cause.actualValue = actualValue
  }
  if (expectedValue !== undefined) {
    cause.expectedValue = expectedValue
  }
  return cause
}
const generateIndexFieldCause = (entity, field, index, actualValue, expectedValue) => {
  const cause = generateFieldCause(entity, field, actualValue, expectedValue)
  cause.index = index
  return cause
}

const getBeNullError = (value, entity, field, message) => {
  if (value) {
    return newInvalidValueError(message || `${entity} ${field} must be null`, generateFieldCause(entity, field, value))
  }
  return null
}
const getNotNullError = (value, entity, field, message) => {
  if (!value) {
    return newNullOrEmptyError(message || `${entity} must have a value at ${field}`, generateFieldCause(entity, field, value))
  }
  return null
}
const getObjectNotEmptyError = (value, entity, field, message) => {
  if (value instanceof Object) {
    if (!Object.keys(value).length) {
      return newNullOrEmptyError(message || `${entity} must have at list one attribute on ${field}`, generateFieldCause(entity, field, value))
    }
  } else {
    return newInvalidValueError(message || `${entity} ${field} must be {}`, generateFieldCause(entity, field, value, {}))
  }
  return null
}
const getArrayNotEmptyError = (value, entity, field, message) => {
  if (value instanceof Array) {
    if (!value.length) {
      return newNullOrEmptyError(message || `${entity} must have at list one value at ${field}`, generateFieldCause(entity, field, value))
    }
  } else {
    return newInvalidValueError(message || `${entity} ${field} must be []`, generateFieldCause(entity, field, value, []))
  }
  return null
}
const getDiferentValueError = (value, otherValue, entity, field, message) => {
  if (value !== otherValue) {
    return newInvalidValueError(message || `${entity} ${field} must be ${otherValue}`, generateFieldCause(entity, field, value, otherValue))
  }
  return null
}
const getEqualValueError = (value, otherValue, entity, field, message) => {
  if (value === otherValue) {
    return newInvalidValueError(message || `${entity} ${field} must not be ${otherValue}`, generateFieldCause(entity, field, value, otherValue))
  }
  return null
}
const getValueNotInListError = (value, otherValues, entity, field, message) => {
  // TODO: comparo con value.status. Hay que definir como se setea el estado-> state.ISSUED o state.ISSUED.status
  const found = otherValues.find(aValue => aValue === value)
  if (!found) {
    return newInvalidValueError(message || `${entity} ${field} must be one of this ${otherValues}`, generateFieldCause(entity, field, value, otherValues))
  }
  return null
}
const getValuetInListError = (value, otherValues, entity, field, message) => {
  const found = otherValues.find(aValue => aValue === value)
  if (found) {
    return newInvalidValueError(message || `${entity} ${field} must not be one of this ${otherValues}`, generateFieldCause(entity, field, value, otherValues))
  }
  return null
}
const getObjectDoesntMatchError = (object, path, isValidValue, entity, field, nullMessage, invalidValueMessage) => {
  if (!_object.has(object, path)) {
    return newNullOrEmptyError(nullMessage || `${entity} must have a value at ${field}`, generateFieldCause(entity, field))
  }
  const actualValue = _object.get(object, path)
  if (!isValidValue(actualValue)) {
    return newInvalidValueError(invalidValueMessage || `${entity} ${field} has an invalid value`, generateFieldCause(entity, field, actualValue))
  }
  return null
}

const getArrayDoesntMatchError = (array, path, isValidValue, entity, field, nullMessage, invalidValueMessage) => {
  const errors = _array.compact(
    array.map((element, index) => {
      if (!_object.has(element, path)) {
        return newNullOrEmptyError(nullMessage || `${entity} must have a value at ${field}`, generateIndexFieldCause(entity, field, index))
      }
      const actualValue = _object.get(element, path)
      if (!isValidValue(actualValue, index)) {
        return newInvalidValueError(invalidValueMessage || `${entity} ${field} has an invalid value`, generateIndexFieldCause(entity, field, index, actualValue))
      }
      return null
    })
  )
  return errors
}

const getValueDoesntMatchExpressionError = (value, expression, entity, field, message) => {
  if (!value || !value.match || !value.match(expression)) {
    return newInvalidValueError(message || `${entity} ${field} does not match ${expression}`, generateFieldCause(entity, field, value))
  }
  return null
}

module.exports = {
  _errors: errors,
  newUnexpectedError,
  newGenericError,
  newDuplicatedValueError,
  newNullOrEmptyError,
  newInvalidValueError,
  newEntityAlreadyCreated,
  newNormRuleFailed,
  newNotFoundError,
  newBadRequestError,
  newInvalidUsernameOrPasswordError,
  newSessionExpiredError,
  newForbiddenResourceException,
  _causes: causes,
  generateFieldCause,
  generateIndexFieldCause,
  getArrayNotEmptyError,
  getDiferentValueError,
  getEqualValueError,
  getNotNullError,
  getObjectNotEmptyError,
  getValueNotInListError,
  getValuetInListError,
  getBeNullError,
  getObjectDoesntMatchError,
  getArrayDoesntMatchError,
  getValueDoesntMatchExpressionError,
  isBusinessError
}
