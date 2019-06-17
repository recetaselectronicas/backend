const { NORM } = require('../src/repositories/tablesNames')

exports.seed = (knex, Promise) => knex(NORM)
  .del()
  .then(() => knex(NORM).insert({
    id: 1, description: '12312312', entry_date: '213123', leaving_date: '!321312',
  }))
