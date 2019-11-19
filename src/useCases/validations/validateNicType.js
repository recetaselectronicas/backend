const { getValidNicTypes } = require('./getValidNicTypes')
const errors = require('../../utils/errors')

const types = getValidNicTypes()

const validateNicType = (nicType, entity) => errors.getValueNotInListError(nicType, types, entity, 'nicType')

module.exports = { validateNicType }