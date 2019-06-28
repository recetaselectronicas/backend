const { COVERAGE } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(COVERAGE)
  .del()
  .then(() => knex(COVERAGE).insert([
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_vademecum: 1,
      id_plan: 1
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_vademecum: 1,
      id_plan: 2
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_vademecum: 3,
      id_plan: 3
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_vademecum: 5,
      id_plan: 2
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_vademecum: 6,
      id_plan: 1
    }
  ]))
