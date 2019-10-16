const { AFFILIATE } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(AFFILIATE)
  .del()
  .then(() => knex(AFFILIATE).insert([
    {
      id_patient: 1,
      id_plan: 1,
      category: '01',
      code: '00048124',
      image_credential: ''
    },
    {
      id_patient: 2,
      id_plan: 3,
      category: '02',
      code: '000481249239',
      image_credential: ''
    },
    {
      id_patient: 3,
      id_plan: 2,
      category: '01',
      code: '00077293734',
      image_credential: ''
    },
    {
      id_patient: 4,
      id_plan: 6,
      category: '02',
      code: '00091736492',
      image_credential: ''
    },
    {
      id_patient: 5,
      id_plan: 8,
      category: '01',
      code: '000356293',
      image_credential: ''
    },
    {
      id_patient: 6,
      id_plan: 10,
      category: '01',
      code: '0003762833',
      image_credential: ''
    }
  ]))
