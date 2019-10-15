/* eslint-disable func-names */
const moment = require('moment')
const initKnex = require('knex')
const { snakeCase } = require('lodash')
const addKnexHooks = require('./knexHooks')
const { formats } = require('../utils/utils')

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

const knex = initKnex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'recetas',
    typeCast(field, next) {
      if (field.type === 'TINY' && field.length === 1) {
        return (field.string() === '1')
      }
      if (field.type === 'DATETIME') {
        return moment(field.string()).format(formats.dateTimeFormat)
      }
      if (field.type === 'DATE') {
        return moment(field.string()).format(formats.dateFormat)
      }
      return next()
    }
  },
  postProcessResponse: (result) => {
    if (Array.isArray(result)) {
      return result.map(row => keysToCamel(row))
    }
    return keysToCamel(result)
  },
  wrapIdentifier: (value, origImpl) => {
    if (value !== 'knex_migrations_lock' && value !== 'knex_migrations' && value !== '*') {
      return origImpl(snakeCase(value))
    }
    return origImpl(value)
  }
})

// Agrega hooks para cuando se hace un insert o update se transformen todas las fechas de string a Dates
addKnexHooks(knex)

module.exports = knex