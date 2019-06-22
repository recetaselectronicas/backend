const { PLAN } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(PLAN)
  .del()
  .then(() => knex(PLAN).insert([
    {
      description: 'plan pobre',
      entry_date: '123123',
      leaving_date: '123123',
      percentage: 50,
      id_medical_insurance: 1
    },
    {
      description: 'plan rico',
      entry_date: '123123',
      leaving_date: '123123',
      percentage: 20,
      id_medical_insurance: 1
    },
    {
      description: 'plan medio',
      entry_date: '123123',
      leaving_date: '123123',
      percentage: 70,
      id_medical_insurance: 2
    },
    {
      description: 'plan algo',
      entry_date: '123123',
      leaving_date: '123123',
      percentage: 80,
      id_medical_insurance: 2
    }
  ]))
