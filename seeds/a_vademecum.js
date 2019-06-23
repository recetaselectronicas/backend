const { VADEMECUM } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(VADEMECUM)
  .del()
  .then(() => knex(VADEMECUM).insert([
    { description: 'Vademecum plan 001' },
    { description: 'Vademecum plan 002' },
    { description: 'Vademecum plan 003' },
    { description: 'Vademecum plan 004' },
    { description: 'Vademecum plan 005' },
    { description: 'Vademecum plan 005' },
    { description: 'Vademecum plan 006' }
  ]))
