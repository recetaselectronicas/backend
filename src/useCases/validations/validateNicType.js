const { getValidNicTypes } = require('./getValidNicTypes')
const errors = require('../../utils/errors')

const types = getValidNicTypes().map(nicType => nicType.id)

const validateNicType = (nicType, entity) => errors.getValueNotInListError(nicType, types, entity, 'nicType')

module.exports = { validateNicType }