const { operatorType, argumentType } = require('./types')

const QUANTIFIER_METADATA = [
  {
    quantifier: 'EXISTS_AT_LEAST',
    value: 'Existe al Menos',
    symbol: '∃',
    type: operatorType.binary,
    argumentName: 'quantity',
    argumentType: argumentType.single
  },
  {
    quantifier: 'EXISTS_EXACTLY',
    value: 'Existe Exactamente',
    symbol: '∃!',
    type: operatorType.binary,
    argumentName: 'quantity',
    argumentType: argumentType.single
  },
  {
    quantifier: 'EXISTS_AT_MOST',
    value: 'Existe como Mucho',
    symbol: '∃>',
    type: operatorType.binary,
    argumentName: 'quantity',
    argumentType: argumentType.single
  },
  {
    quantifier: 'FOR_ALL',
    value: 'Para Todo',
    symbol: '∀',
    type: operatorType.unary
  }
]

module.exports = { QUANTIFIER_METADATA }