const { RECEPTION } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(RECEPTION)
  .del()
  .then(() => knex(RECEPTION).insert([
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_medical_insurance: 1,
      id_pharmacist: 1
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_medical_insurance: 1,
      id_pharmacist: 2
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_medical_insurance: 2,
      id_pharmacist: 1
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_medical_insurance: 2,
      id_pharmacist: 2
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_medical_insurance: 3,
      id_pharmacist: 1
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      id_medical_insurance: 3,
      id_pharmacist: 2
    }
  ]))
