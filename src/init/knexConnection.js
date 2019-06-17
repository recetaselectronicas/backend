const initKnex = require('knex')
const { snakeCase } = require('lodash')

const toCamel = s => s.replace(/([-_][a-z])/gi, $1 => $1
  .toUpperCase()
  .replace('-', '')
  .replace('_', ''))

const isArray = function (a) {
  return Array.isArray(a)
}

const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

const keysToCamel = function (o) {
  if (isObject(o)) {
    const n = {}

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k])
    })

    return n
  }
  if (isArray(o)) {
    return o.map(i => keysToCamel(i))
  }

  return o
}

module.exports = initKnex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'recetas',
  },
  postProcessResponse: (result) => {
    if (Array.isArray(result)) {
      return result.map(row => keysToCamel(row))
    }
    return keysToCamel(result)
  },
  wrapIdentifier: (value, origImpl) => origImpl(snakeCase(value)),
})
