const { getValidGenders } = require('./getValidGenders')
const errors = require('../../utils/errors')

const genders = getValidGenders().map(gender => gender.id)

const validateGender = (gender, entity) => errors.getValueNotInListError(gender, genders, entity, 'gender')

module.exports = { validateGender }