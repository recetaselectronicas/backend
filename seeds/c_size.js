const { SIZE } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(SIZE)
  .del()
  .then(() => knex(SIZE).insert([
    { description: 'X 30 U' },
    { description: 'X 6 U' },
    { description: 'X 8 U' },
    { description: 'X 15 U' },
    { description: 'X 60 U' },
    { description: 'x 50 mg' }
  ]))
