const error = {
    code: '', //codigo de error
    message: '', //mensaje descriptivo del error
    status: 400, //statusCode, para web
    cause: null //causa del error (se va a crear un handler para esto para transformar la causa a algo estándar)
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

const newUnexpectedError = (message, status, cause) => {return newError('UNEXPECTED_ERROR', message, status, cause)}
const newGenericError = (message, status, cause) => {return newError('GENERIC_ERROR', message, status, cause)}
const newDuplicatedValueError = (message, status, cause) => {return newError('DUPLICATED_VALUE_ERROR', message, status, cause)}
const newNullOrEmptyError = (message, status, cause) => {return newError('NULL_OR_EMPTY_VALUE_ERROR', message, status, cause)}
const newInvalidValueError = (message, status, cause) => {return newError('INVALID_VALUE_ERROR', message, status, cause)}
const newEntityAlreadyCreated = (message, status, cause) => {return newError('ENTITY_ALREADY_CREATED', message, status, cause)}
const newNotFoundError = (message, status, cause) => {return newError('NOT_FOUND_ERROR', message, status, cause)}
const newInvalidUsernameOrPasswordError = (message, status, cause) => {return newError('INVALID_USERNAME_OR_PASSWORD_ERROR', message, status, cause)}
const newSessionExpiredError = (message, status, cause) => {return newError('SESSION_EXPIRED_ERROR', message, status, cause)}
const newForbiddenResourceException = (message, status, cause) => {return newError('FORBIDDEN_RESOURCE_EXCEPTION', message, status, cause)}

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
    newForbiddenResourceException
}