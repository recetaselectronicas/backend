const { getValidNationalities } = require('./getValidNationalities')
const errors = require('../../utils/errors')

const nationalities = getValidNationalities().map(nationality => nationality.id)

const validateNationality = (nationality, entity) => errors.getValueNotInListError(nationality, nationalities, entity, 'nationality')

module.exports = { validateNationality }