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
    INVALID_USERNAME_OR_PASSWORD_ERROR: {...error, code: "2-000", message: "Invalid username or password", status: 401},
    SESSION_EXPIRED_ERROR: {...error, code: "2-001", message: "Your session has expired", status: 403},
    FORBIDDEN_RESOURCE_EXCEPTION: {...error, code: "2-002", message: "You can´t perform that action", status: 403}
}

const newError = (type, message, status, cause) => {
    let anError = {...errors[type]}
    anError.message = message || anError.message
    anError.status = status || anError.status
    anError.cause = cause || null
    return anError
}

const newUnexpectedError = (message, cause, status) => {return newError('UNEXPECTED_ERROR', message, status, cause)}
const newGenericError = (message, cause, status) => {return newError('GENERIC_ERROR', message, status, cause)}
const newDuplicatedValueError = (message, cause, status) => {return newError('DUPLICATED_VALUE_ERROR', message, status, cause)}
const newNullOrEmptyError = (message, cause, status) => {return newError('NULL_OR_EMPTY_VALUE_ERROR', message, status, cause)}
const newInvalidValueError = (message, cause, status) => {return newError('INVALID_VALUE_ERROR', message, status, cause)}
const newEntityAlreadyCreated = (message, cause, status) => {return newError('ENTITY_ALREADY_CREATED', message, status, cause)}
const newNotFoundError = (message, cause, status) => {return newError('NOT_FOUND_ERROR', message, status, cause)}
const newInvalidUsernameOrPasswordError = (message, cause, status) => {return newError('INVALID_USERNAME_OR_PASSWORD_ERROR', message, status, cause)}
const newSessionExpiredError = (message, cause, status) => {return newError('SESSION_EXPIRED_ERROR', message, status, cause)}
const newForbiddenResourceException = (message, cause, status) => {return newError('FORBIDDEN_RESOURCE_EXCEPTION', message, status, cause)}

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


const checkNotNull = (value, entity, field, errors, message) => {
    if (!value){
        const error = newNullOrEmptyError(message || `${entity} must have a value at ${field}`, generateFieldCause(entity, field, value))
        if (!errors){
            return error
        } else {
            errors.push(error)
        }
    }
}
const checkObjectNotEmpty = (value, entity, field, errors, message) => {
    if (value instanceof Object){
        if (!Object.keys(value).length){
            const error = newNullOrEmptyError(message || `${entity} must have at list one attribute on ${field}`, generateFieldCause(entity, field, value))
            if (!errors){
                return error
            } else {
                errors.push(error)
            }
        }
    }
}
const checkArrayNotEmpty = (value, entity, field, errors, message) => {
    if (value instanceof Array){
        if (!value.length){
            const error = newNullOrEmptyError(message || `${entity} must have at list one value at ${field}`, generateFieldCause(entity, field, value))
            if (!errors){
                return error
            } else {
                errors.push(error)
            }
        }
    }
}
const checkDiferentValueError = (value, otherValue, entity, field, errors, message) => {
    if (value !== otherValue){
        const error = newInvalidValueError(message || `${entity} ${field} must be ${otherValue}`, generateFieldCause(entity, field, value, otherValue))
        if (!errors){
            return error
        } else {
            errors.push(error)
        }
    }
}
const checkValueNotInListError = (value, otherValues, entity, field, errors, message) => {
    const found = otherValues.find((aValue) => {
        return aValue === value
    })
    if (!found){
        const error = newInvalidValueError(message || `${entity} ${field} must be one of this ${otherValues}`, generateFieldCause(entity, field, value, otherValues))
        if (!errors){
            return error
        } else {
            errors.push(error)
        }
    }
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
    newInvalidUsernameOrPasswordError,
    newSessionExpiredError,
    newForbiddenResourceException,
    _causes: causes,
    generateFieldCause,
    checkArrayNotEmpty,
    checkDiferentValueError,
    checkNotNull,
    checkObjectNotEmpty,
    checkValueNotInListError
}