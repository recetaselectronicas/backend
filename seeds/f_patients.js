const { PATIENT } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(PATIENT)
  .del()
  .then(() => knex(PATIENT).insert([
    {
      user_name: 'guusygonzalo',
      password: 12312,
      contact_number: '11223213',
      name: 'gonzalo',
      surname: 'Gras ',
      birth_date: 'algun dia',
      gender: 'H',
      email: 'gonzalo-kapo@gmail.com',
      address: 'colombia 5454',
      nationality: 'Argetino',
      nic_number: '40390213'
    },
    {
      user_name: 'leandrodevoto',
      password: 12312,
      contact_number: '23213123',
      name: 'Leandro',
      surname: 'Devoto ',
      birth_date: 'nunca',
      gender: 'H',
      email: 'leandro-kapo@gmail.com',
      address: 'colombia 5454',
      nationality: 'Argetino',
      nic_number: '40590213'
    },
    {
      user_name: 'leo_kapo',
      password: 1234,
      contact_number: '23213123',
      name: 'Leonardo',
      surname: 'Pasquali',
      birth_date: 'nunca',
      gender: 'H',
      email: 'leo-kapo@gmail.com',
      address: 'brasil 3333',
      nationality: 'Argetino',
      nic_number: '40590213'
    }
  ]))
