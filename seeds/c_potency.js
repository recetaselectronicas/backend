const { POTENCY } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(POTENCY)
  .del()
  .then(() => knex(POTENCY).insert([
    { description: '40 mg' },
    { description: '60 mg' },
    { description: '400 mg' },
    { description: '25 mg' },
    { description: '600 mg' },
    { description: '137 msg' }
  ]))
