const array = require('lodash/array')
const knexHooks = require('knex-hooks')
const { dateTimeFormat } = require('../utils/utils')

const updateDates = (rows) => {
  rows.forEach((row) => {
    // console.log(JSON.stringify(row, null, 4))
    Object.keys(row).forEach((key) => {
      if (key.match(/_date$/)) {
        const date = dateTimeFormat.toDate(row[key])
        row[key] = date && date.toDate()
      }
    })
    // console.log(JSON.stringify(row, null, 4))
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
      // console.log('Making dates Dates on insert')
      updateDates(insertRows)
    }
    if (updateDates.length) {
      // console.log('Making dates Dates on update')
      updateDates(updateRows)
    }
  })
  return knex
}

// const entryDate = 'entry_date'
// const leavingDate = 'leaving_date'
// const birthDate = 'birth_date'
// const fromDate = 'from_date'
// const toDate = 'to_date'
