const { MEDICAL_BOOKLET } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(MEDICAL_BOOKLET)
  .del()
  .then(() => knex(MEDICAL_BOOKLET).insert([
    {
      id_doctor: 1,
      id_medical_insurance: 1,
      from_date: '01/01/2000'
    },
    {
      id_doctor: 1,
      id_medical_insurance: 2,
      from_date: '01/01/2000'
    },
    {
      id_doctor: 2,
      id_medical_insurance: 1,
      from_date: '01/01/2000'
    },
    {
      id_doctor: 2,
      id_medical_insurance: 3,
      from_date: '01/01/2000'
    },
    {
      id_doctor: 3,
      id_medical_insurance: 2,
      from_date: '01/01/2000'
    }
  ]))
