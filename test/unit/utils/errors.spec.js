/* eslint-disable no-underscore-dangle */
const errors = require('../../../src/utils/errors')

test('new unexpectedError error can be created with default message, status and cause', () => {
  const error = errors.newUnexpectedError()
  expect(error.message).toBe(errors._errors.UNEXPECTED_ERROR.message)
  expect(error.status).toBe(errors._errors.UNEXPECTED_ERROR.status)
  expect(error.cause).toEqual(errors._errors.UNEXPECTED_ERROR.cause)
})

test('new unexpectedError error can be created with custom message, status and cause', () => {
  const message = 'ERROR'
  const status = 1000
  const cause = {}
  const error = errors.newUnexpectedError(message, cause, status)
  expect(error.message).toBe(message)
  expect(error.status).toBe(status)
  expect(error.cause).toEqual(cause)
})

test('new genericError error can be created with default message, status and cause', () => {
  const error = errors.newGenericError()
  expect(error.message).toBe(errors._errors.GENERIC_ERROR.message)
  expect(error.status).toBe(errors._errors.GENERIC_ERROR.status)
  expect(error.cause).toEqual(errors._errors.GENERIC_ERROR.cause)
})

test('new genericError error can be created with custom message, status and cause', () => {
  const message = 'ERROR'
  const status = 1000
  const cause = {}
  const error = errors.newGenericError(message, cause, status)
  expect(error.message).toBe(message)
  expect(error.status).toBe(status)
  expect(error.cause).toEqual(cause)
})

test('new duplicatedValueError error can be created with default message, status and cause', () => {
  const error = errors.newDuplicatedValueError()
  expect(error.message).toBe(errors._errors.DUPLICATED_VALUE_ERROR.message)
  expect(error.status).toBe(errors._errors.DUPLICATED_VALUE_ERROR.status)
  expect(error.cause).toEqual(errors._errors.DUPLICATED_VALUE_ERROR.cause)
})

test('new duplicatedValueError error can be created with custom message, status and cause', () => {
  const message = 'ERROR'
  const status = 1000
  const cause = {}
  const error = errors.newDuplicatedValueError(message, cause, status)
  expect(error.message).toBe(message)
  expect(error.status).toBe(status)
  expect(error.cause).toEqual(cause)
})

test('new nullOrEmptyError error can be created with default message, status and cause', () => {
  const error = errors.newNullOrEmptyError()
  expect(error.message).toBe(errors._errors.NULL_OR_EMPTY_VALUE_ERROR.message)
  expect(error.status).toBe(errors._errors.NULL_OR_EMPTY_VALUE_ERROR.status)
  expect(error.cause).toEqual(errors._errors.NULL_OR_EMPTY_VALUE_ERROR.cause)
})

test('new nullOrEmptyError error can be created with custom message, status and cause', () => {
  const message = 'ERROR'
  const status = 1000
  const cause = {}
  const error = errors.newNullOrEmptyError(message, cause, status)
  expect(error.message).toBe(message)
  expect(error.status).toBe(status)
  expect(error.cause).toEqual(cause)
})

test('new invalidValueError error can be created with default message, status and cause', () => {
  const error = errors.newInvalidValueError()
  expect(error.message).toBe(errors._errors.INVALID_VALUE_ERROR.message)
  expect(error.status).toBe(errors._errors.INVALID_VALUE_ERROR.status)
  expect(error.cause).toEqual(errors._errors.INVALID_VALUE_ERROR.cause)
})

test('new invalidValueError error can be created with custom message, status and cause', () => {
  const message = 'ERROR'
  const status = 1000
  const cause = {}
  const error = errors.newInvalidValueError(message, cause, status)
  expect(error.message).toBe(message)
  expect(error.status).toBe(status)
  expect(error.cause).toEqual(cause)
})

test('new entityAlreadyCreated error can be created with default message, status and cause', () => {
  const error = errors.newEntityAlreadyCreated()
  expect(error.message).toBe(errors._errors.ENTITY_ALREADY_CREATED.message)
  expect(error.status).toBe(errors._errors.ENTITY_ALREADY_CREATED.status)
  expect(error.cause).toEqual(errors._errors.ENTITY_ALREADY_CREATED.cause)
})

test('new entityAlreadyCreated error can be created with custom message, status and cause', () => {
  const message = 'ERROR'
  const status = 1000
  const cause = {}
  const error = errors.newEntityAlreadyCreated(message, cause, status)
  expect(error.message).toBe(message)
  expect(error.status).toBe(status)
  expect(error.cause).toEqual(cause)
})

test('new notFoundError error can be created with default message, status and cause', () => {
  const error = errors.newNotFoundError()
  expect(error.message).toBe(errors._errors.NOT_FOUND_ERROR.message)
  expect(error.status).toBe(errors._errors.NOT_FOUND_ERROR.status)
  expect(error.cause).toEqual(errors._errors.NOT_FOUND_ERROR.cause)
})

test('new notFoundError error can be created with custom message, status and cause', () => {
  const message = 'ERROR'
  const status = 1000
  const cause = {}
  const error = errors.newNotFoundError(message, cause, status)
  expect(error.message).toBe(message)
  expect(error.status).toBe(status)
  expect(error.cause).toEqual(cause)
})

test('new invalidUsernameOrPasswordError error can be created with default message, status and cause', () => {
  const error = errors.newInvalidUsernameOrPasswordError()
  expect(error.message).toBe(errors._errors.INVALID_USERNAME_OR_PASSWORD_ERROR.message)
  expect(error.status).toBe(errors._errors.INVALID_USERNAME_OR_PASSWORD_ERROR.status)
  expect(error.cause).toEqual(errors._errors.INVALID_USERNAME_OR_PASSWORD_ERROR.cause)
})

test('new invalidUsernameOrPasswordError error can be created with custom message, status and cause', () => {
  const message = 'ERROR'
  const status = 1000
  const cause = {}
  const error = errors.newInvalidUsernameOrPasswordError(message, cause, status)
  expect(error.message).toBe(message)
  expect(error.status).toBe(status)
  expect(error.cause).toEqual(cause)
})

test('new sessionExpiredError error can be created with default message, status and cause', () => {
  const error = errors.newSessionExpiredError()
  expect(error.message).toBe(errors._errors.SESSION_EXPIRED_ERROR.message)
  expect(error.status).toBe(errors._errors.SESSION_EXPIRED_ERROR.status)
  expect(error.cause).toEqual(errors._errors.SESSION_EXPIRED_ERROR.cause)
})

test('new sessionExpiredError error can be created with custom message, status and cause', () => {
  const message = 'ERROR'
  const status = 1000
  const cause = {}
  const error = errors.newSessionExpiredError(message, cause, status)
  expect(error.message).toBe(message)
  expect(error.status).toBe(status)
  expect(error.cause).toEqual(cause)
})

test('new forbiddenResourceError error can be created with default message, status and cause', () => {
  const error = errors.newForbiddenResourceException()
  expect(error.message).toBe(errors._errors.FORBIDDEN_RESOURCE_EXCEPTION.message)
  expect(error.status).toBe(errors._errors.FORBIDDEN_RESOURCE_EXCEPTION.status)
  expect(error.cause).toEqual(errors._errors.FORBIDDEN_RESOURCE_EXCEPTION.cause)
})

test('new forbiddenResourceError error can be created with custom message, status and cause', () => {
  const message = 'ERROR'
  const status = 1000
  const cause = {}
  const error = errors.newForbiddenResourceException(message, cause, status)
  expect(error.message).toBe(message)
  expect(error.status).toBe(status)
  expect(error.cause).toEqual(cause)
})
