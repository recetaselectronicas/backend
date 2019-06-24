const { ATTENTION } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(ATTENTION)
  .del()
  .then(() => knex(ATTENTION).insert([
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_specialty: 1,
      id_doctor: 1
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_specialty: 2,
      id_doctor: 3
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_specialty: 3,
      id_doctor: 2
    }
  ]))
