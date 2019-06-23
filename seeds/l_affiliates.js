const { AFFILIATE } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(AFFILIATE)
  .del()
  .then(() => knex(AFFILIATE).insert([
    {
      id_patient: 1,
      id_plan: 1,
      from_date: '',
      to_date: '',
      category: '320',
      code: '00048124',
      image_credential: ''
    },
    {
      id_patient: 2,
      id_plan: 1,
      from_date: '',
      to_date: '',
      category: '02',
      code: '000481249239',
      image_credential: ''
    },
    {
      id_patient: 3,
      id_plan: 3,
      from_date: '',
      to_date: '',
      category: '304',
      code: '393849202993',
      image_credential: ''
    }
  ]))
