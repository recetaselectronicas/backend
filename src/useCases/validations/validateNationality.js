const { getValidNationalities } = require('./getValidNationalities')
const errors = require('../../utils/errors')

const nationalities = getValidNationalities()

const validateNationality = (nationality, entity) => errors.getValueNotInListError(nationality, nationalities, entity, 'nationality')

module.exports = { validateNationality }