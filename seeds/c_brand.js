const { BRAND } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(BRAND)
  .del()
  .then(() => knex(BRAND).insert([
    { description: 'Ibupirac' },
    { description: 'Tafirol' },
    { description: 'Mejoralito' },
    { description: 'Curaplus' },
    { description: 'Actron' },
    { description: 'T4' },
    { description: 'Betacort' }
  ]))
