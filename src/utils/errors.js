const _object = require('lodash/object')
const _array = require('lodash/array')

const error = {
    code: '', //codigo de error
    message: '', //mensaje descriptivo del error
    status: 400, //statusCode, para web
    cause: null //causa del error (se va a crear un handler para esto para transformar la causa a algo estándar)
}

const causes = {
    FIELD_CAUSE: 'FIELD_CAUSE'
}

const errors = {
    UNEXPECTED_ERROR: {...error, code: "0-000", message: "Unexpected error ocurred", status: 500},
    GENERIC_ERROR: {...error, code: "0-001", message: "Ups something went wrong"},
    DUPLICATED_VALUE_ERROR: {...error, code: "1-000", message: "Duplicated field values"},
    NULL_OR_EMPTY_VALUE_ERROR: {...error, code: "1-001", message: "Null or empty field value"},
    INVALID_VALUE_ERROR: {...error, code: "1-002", message: "Invalid field value"},
    ENTITY_ALREADY_CREATED: {...error, code: "1-003", message: "Entity already created"},
    NOT_FOUND_ERROR: {...error, code: "1-100", message: "Not found"},
    BAD_REQUEST: {...error, code: "1-101", message: "Please verify the payload and try again", status: 400},
    INVALID_USERNAME_OR_PASSWORD_ERROR: {...error, code: "2-000", message: "Invalid username or password", status: 401},
    SESSION_EXPIRED_ERROR: {...error, code: "2-001", message: "Your session has expired", status: 403},
    FORBIDDEN_RESOURCE_EXCEPTION: {...error, code: "2-002", message: "You can´t perform that action", status: 403}
}

const newError = (type, message, cause, status) => {
    let anError = {...errors[type]}
    anError.message = message || anError.message
    anError.status = status || anError.status
    anError.cause = cause || null
    return anError
}

const newUnexpectedError = (message, cause, status) => {return newError('UNEXPECTED_ERROR', message, cause, status)}
const newGenericError = (message, cause, status) => {return newError('GENERIC_ERROR', message, cause, status)}
const newDuplicatedValueError = (message, cause, status) => {return newError('DUPLICATED_VALUE_ERROR', message, cause, status)}
const newNullOrEmptyError = (message, cause, status) => {return newError('NULL_OR_EMPTY_VALUE_ERROR', message, cause, status)}
const newInvalidValueError = (message, cause, status) => {return newError('INVALID_VALUE_ERROR', message, cause, status)}
const newEntityAlreadyCreated = (message, cause, status) => {return newError('ENTITY_ALREADY_CREATED', message, cause, status)}
const newNotFoundError = (message, cause, status) => {return newError('NOT_FOUND_ERROR', message, cause, status)}
const newBadRequestError = (message, cause, status) => {return newError('BAD_REQUEST', message, cause, status)}
const newInvalidUsernameOrPasswordError = (message, cause, status) => {return newError('INVALID_USERNAME_OR_PASSWORD_ERROR', message, cause, status)}
const newSessionExpiredError = (message, cause, status) => {return newError('SESSION_EXPIRED_ERROR', message, cause, status)}
const newForbiddenResourceException = (message, cause, status) => {return newError('FORBIDDEN_RESOURCE_EXCEPTION', message, cause, status)}

const generateFieldCause = (entity, field, actualValue, expectedValue) => {
    const cause = {
        type: causes.FIELD_CAUSE,
        entity,
        field
    }
    if (actualValue !== undefined){
        cause.actualValue = actualValue
    }
    if (expectedValue !== undefined){
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
    if (value){
        return newInvalidValueError(message || `${entity} ${field} must be null`, generateFieldCause(entity, field, value))
    }
    return null
}
const getNotNullError = (value, entity, field, message) => {
    if (!value){
        return newNullOrEmptyError(message || `${entity} must have a value at ${field}`, generateFieldCause(entity, field, value))
    }
    return null
}
const getObjectNotEmptyError = (value, entity, field, message) => {
    if (value instanceof Object){
        if (!Object.keys(value).length){
            return newNullOrEmptyError(message || `${entity} must have at list one attribute on ${field}`, generateFieldCause(entity, field, value))
        }
    } else {
        return newInvalidValueError(message || `${entity} ${field} must be {}`, generateFieldCause(entity, field, value, {}))
    }
    return null
}
const getArrayNotEmptyError = (value, entity, field, message) => {
    if (value instanceof Array){
        if (!value.length){
            return newNullOrEmptyError(message || `${entity} must have at list one value at ${field}`, generateFieldCause(entity, field, value))
        }
    } else {
        return newInvalidValueError(message || `${entity} ${field} must be []`, generateFieldCause(entity, field, value, []))
    }
    return null
}
const getDiferentValueError = (value, otherValue, entity, field, message) => {
    if (value !== otherValue){
        return newInvalidValueError(message || `${entity} ${field} must be ${otherValue}`, generateFieldCause(entity, field, value, otherValue))
    }
    return null
}
const getValueNotInListError = (value, otherValues, entity, field, message) => {
    const found = otherValues.find((aValue) => {
        return aValue === value
    })
    if (!found){
        return newInvalidValueError(message || `${entity} ${field} must be one of this ${otherValues}`, generateFieldCause(entity, field, value, otherValues))
    }
    return null
}

const getObjectDoesntMatchError = (object, path, value, entity, field, nullMessage, invalidValueMessage) => {
    if (!_object.has(object, path)){
        return newNullOrEmptyError(nullMessage || `${entity} must have a value at ${field}`, generateFieldCause(entity, field))
    }
    if (value !== undefined){
        if (_object.get(object, path) !== value){
            return newInvalidValueError(invalidValueMessage || `${entity} ${field} must be ${value}`, generateFieldCause(entity, field, _object.get(object, path), value))
        }
    }
    return null
}

const getArrayDoesntMatchError = (array, path, value, entity, field, nullMessage, invalidValueMessage) => {
    const errors = _array.compact(array.map((element, index) => {
        if (!_object.has(element, path)){
            return newNullOrEmptyError(nullMessage || `${entity} must have a value at ${field}`, generateIndexFieldCause(entity, field, index))
        }
        if (value !== undefined){
            const actualValue = _object.get(element, path)
            if (actualValue !== value){
                return newInvalidValueError(invalidValueMessage || `${entity} ${field} must be ${value}`, generateIndexFieldCause(entity, field, index, actualValue, value))
            }
        }
    }))
    return errors
}

module.exports = {
    _errors: errors,
    newUnexpectedError,
    newGenericError,
    newDuplicatedValueError,
    newNullOrEmptyError,
    newInvalidValueError,
    newEntityAlreadyCreated,
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
    getNotNullError,
    getObjectNotEmptyError,
    getValueNotInListError,
    getBeNullError,
    getObjectDoesntMatchError,
    getArrayDoesntMatchError
}