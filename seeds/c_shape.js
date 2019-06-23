const { SHAPE } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(SHAPE)
  .del()
  .then(() => knex(SHAPE).insert([{ description: 'En polvo' }, { description: 'Comprimidos' }, { description: 'Gotas' }, { description: 'Ungüento' }]))
