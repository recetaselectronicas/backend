const errors = require('../../utils/errors')

const nationalities = [
  'ARGENTINA',
  'VENEZUELA',
  'COLOMBIA',
  'PERU',
  'CHILE',
  'URUGUAY',
  'BRASIL'
]

const validateNationality = (nationality, entity) => errors.getValueNotInListError(nationality, nationalities, entity, 'nationality')

module.exports = { validateNationality }