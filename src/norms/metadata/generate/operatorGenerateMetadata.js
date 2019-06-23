const { dataTypes, operatorType, argumentType } = require('./types')

const OPERATOR_BY_TYPE = {
  [dataTypes.boolean]: [
    {
      operator: 'EQUAL'
    },
    {
      operator: 'DISTINCT'
    }
  ],
  [dataTypes.code]: [
    {
      operator: 'EQUAL'
    },
    {
      operator: 'DISTINCT'
    }
  ],
  [dataTypes.number]: [
    {
      operator: 'EQUAL'
    },
    {
      operator: 'GREATER'
    },
    {
      operator: 'LESSER'
    },
    {
      operator: 'GREATER_OR_EQUAL'
    },
    {
      operator: 'LESSER_OR_EQUAL'
    },
    {
      operator: 'DISTINCT'
    },
    {
      operator: 'IN'
    }
  ],
  [dataTypes.string]: [
    {
      operator: 'EQUAL'
    },
    {
      operator: 'DISTINCT'
    },
    {
      operator: 'IN'
    },
    {
      operator: 'CONTAINS'
    },
    {
      operator: 'IS_NULL'
    },
    {
      operator: 'IS_NOT_NULL'
    }
  ]
}

const OPERATOR_METADATA = [
  {
    operator: 'EQUAL',
    value: 'Igual',
    symbol: '==',
    type: operatorType.binary,
    argumentName: 'expectedValue',
    argumentType: argumentType.single
  },
  {
    operator: 'DISTINCT',
    value: 'Distinto',
    symbol: '!=',
    type: operatorType.binary,
    argumentName: 'expectedValue',
    argumentType: argumentType.single
  },
  {
    operator: 'GREATER',
    value: 'Mayor',
    symbol: '>',
    type: operatorType.binary,
    argumentName: 'expectedValue',
    argumentType: argumentType.single
  },
  {
    operator: 'LESSER',
    value: 'Menor',
    symbol: '<',
    type: operatorType.binary,
    argumentName: 'expectedValue',
    argumentType: argumentType.single
  },
  {
    operator: 'GREATER_OR_EQUAL',
    value: 'Mayor o Igual',
    symbol: '>=',
    type: operatorType.binary,
    argumentName: 'expectedValue',
    argumentType: argumentType.single
  },
  {
    operator: 'LESSER_OR_EQUAL',
    value: 'Menor o Igual',
    symbol: '<=',
    type: operatorType.binary,
    argumentName: 'expectedValue',
    argumentType: argumentType.single
  },
  {
    operator: 'IN',
    value: 'En',
    symbol: 'En',
    type: operatorType.binary,
    argumentName: 'posibleValues',
    argumentType: argumentType.list
  },
  {
    operator: 'CONTAINS',
    value: 'Contiene',
    symbol: 'Contiene',
    type: operatorType.binary,
    argumentName: 'containedValue',
    argumentType: argumentType.single
  },
  {
    operator: 'IS_NULL',
    value: 'Es Nulo',
    symbol: 'Es Nulo',
    type: operatorType.unary
  },
  {
    operator: 'IS_NOT_NULL',
    value: 'No es Nulo',
    symbol: 'No es Nulo',
    type: operatorType.unary
  }
]

module.exports = {
  OPERATOR_BY_TYPE,
  OPERATOR_METADATA
}