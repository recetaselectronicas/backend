const { POTENCY } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(POTENCY)
  .del()
  .then(() => knex(POTENCY).insert([
    { description: '40 mg' },
    { description: '60 mg' },
    { description: '400 mg' },
    { description: '25 mg' },
    { description: '600 mg' },
    { description: '137 mcg' },
    { description: '150 mcg' },
    { description: '3 %' },
    { description: '500 mg' },
    { description: '80 mg' },
    { description: '75 mg' }
  ]))
