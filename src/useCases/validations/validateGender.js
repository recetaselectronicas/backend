const errors = require('../../utils/errors')

const genders = [
  'M',
  'F'
]
const validateGender = (gender, entity) => errors.getValueNotInListError(gender, genders, entity, 'gender')

module.exports = { validateGender }