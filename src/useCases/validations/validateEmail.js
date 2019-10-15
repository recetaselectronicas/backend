const errors = require('../../utils/errors')

const validateEmail = (email, entity) => errors.getValueDoesntMatchExpressionError(email, /^\w+(\.\w+)*@\w+\.\w+(\.\w+)?$/, entity, 'email', 'invalid email email format')

module.exports = { validateEmail }