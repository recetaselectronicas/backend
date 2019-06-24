const { MEDICAL_BOOKLET } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(MEDICAL_BOOKLET)
  .del()
  .then(() => knex(MEDICAL_BOOKLET).insert([
    {
      id_doctor: 1,
      id_medical_insurance: 1,
      entry_date: '',
      leaving_date: ''
    },
    {
      id_doctor: 3,
      id_medical_insurance: 3,
      entry_date: '',
      leaving_date: ''
    },
    {
      id_doctor: 3,
      id_medical_insurance: 2,
      entry_date: '',
      leaving_date: ''
    }
  ]))
