const { ATTENTION } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(ATTENTION)
  .del()
  .then(() => knex(ATTENTION).insert([
    {
      entry_date: '20020',
      leaving_date: '20202',
      id_speciality: 1,
      id_doctor: 1
    },
    {
      entry_date: '20020',
      leaving_date: '20202',
      id_speciality: 2,
      id_doctor: 3
    },
    {
      entry_date: '20020',
      leaving_date: '20202',
      id_speciality: 3,
      id_doctor: 2
    }
  ]))
