const { MEDICAL_INSURANCE } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(MEDICAL_INSURANCE)
  .del()
  .then(() => knex(MEDICAL_INSURANCE).insert([
    {
      description: 'OSDE',
      contact_number: '1520202020',
      user_name: 'osde_1234',
      password: '1234',
      corporate_name: 'OSDE S.R.L.',
      address: 'Calle falsa 123',
      email: 'osde@osde.com'
    },
    {
      description: 'Hospital Italiano',
      contact_number: '1520202020',
      user_name: 'Swiss_2312_2',
      password: '1234',
      corporate_name: 'HospitalItaliano S.A',
      address: 'Joaquin V Gonzales 1',
      email: 'hospitalItaliano@hi.com'
    },
    {
      description: 'OSTEL',
      contact_number: '1520202020',
      user_name: 'ostel_med',
      password: '1234',
      corporate_name: 'OSTEL S.A.',
      address: 'Beiro 1232',
      email: 'ostel@ostel.com'
    }
  ]))
