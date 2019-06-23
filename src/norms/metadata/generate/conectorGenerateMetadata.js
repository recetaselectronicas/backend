const { operatorType, argumentType } = require('./types')

const CONECTOR_METADATA = [
  {
    conector: 'IS',
    value: 'Es',
    symbol: 'Es',
    type: operatorType.unary,
    argumentName: 'predicate',
    argumentType: argumentType.single
  },
  {
    conector: 'NOT',
    value: 'No Es',
    symbol: '¬',
    type: operatorType.unary,
    argumentName: 'predicate',
    argumentType: argumentType.single
  },
  {
    conector: 'OR',
    value: 'O',
    symbol: '||',
    type: operatorType.unary,
    argumentName: 'predicates',
    argumentType: argumentType.list
  },
  {
    conector: 'AND',
    value: 'Y',
    symbol: '&&',
    type: operatorType.unary,
    argumentName: 'predicates',
    argumentType: argumentType.list
  },
  {
    conector: 'IMPL',
    value: 'Implica',
    symbol: '⇒',
    type: operatorType.binary,
    argumentName: 'antecedent',
    argumentType: argumentType.single,
    secondArgumentName: 'consequent',
    secondArgumentType: argumentType.single
  },
  {
    conector: 'DOUBLE_IMPL',
    value: 'Si y Sólo si',
    symbol: '⇔',
    type: operatorType.binary,
    argumentName: 'antecedent',
    argumentType: argumentType.single,
    secondArgumentName: 'consequent',
    secondArgumentType: argumentType.single
  }
]

module.exports = { CONECTOR_METADATA }