const errors = require('../../utils/errors')

const types = [
  'DNI',
  'LC',
  'LE'
]
const validateNicType = (nicType, entity) => errors.getValueNotInListError(nicType, types, entity, 'nicType')

module.exports = { validateNicType }