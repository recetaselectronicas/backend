const array = require('lodash/array')
const knexHooks = require('knex-hooks')
const { dateTimeFormat } = require('../utils/utils')

const updateDates = (rows) => {
  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (key.match(/_date$/)) {
        const date = dateTimeFormat.toDate(row[key])
        // eslint-disable-next-line no-param-reassign
        row[key] = date && date.toDate()
      }
    })
  })
}

module.exports = (knex) => {
  knexHooks(knex)
  knex.addHook('before', ['insert', 'update'], '*', (when, method, table, params) => {
    const insertData = knexHooks.helpers.getInsertData(params.query)
    const updateDate = knexHooks.helpers.getUpdateData(params.query)
    const insertRows = array.compact(Array.isArray(insertData) ? insertData : [insertData])
    const updateRows = array.compact(Array.isArray(updateDate) ? updateDate : [updateDate])
    if (insertRows.length) {
      updateDates(insertRows)
    }
    if (updateDates.length) {
      updateDates(updateRows)
    }
  })
  return knex
}

