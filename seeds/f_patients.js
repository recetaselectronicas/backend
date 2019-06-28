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
      birth_date: '30/03/1997',
      gender: 'M',
      email: 'gonzalo-kapo@gmail.com',
      address: 'colombia 5454',
      nationality: 'ARGENTINO',
      nic_number: '40390213'
    },
    {
      user_name: 'leandrodevoto',
      password: 12312,
      contact_number: '23213123',
      name: 'Leandro',
      surname: 'Devoto ',
      birth_date: '23/12/1992',
      gender: 'M',
      email: 'leandro-kapo@gmail.com',
      address: 'colombia 5454',
      nationality: 'ARGENTINO',
      nic_number: '40590213'
    },
    {
      user_name: 'leo_kapo',
      password: 1234,
      contact_number: '23213123',
      name: 'Leonardo',
      surname: 'Pasquali',
      birth_date: '01/01/1976',
      gender: 'M',
      email: 'leo-kapo@gmail.com',
      address: 'brasil 3333',
      nationality: 'VENEZOLANO',
      nic_number: '40590213'
    },
    {
      user_name: 'javete',
      password: 1234,
      contact_number: '23213123',
      name: 'Javier',
      surname: 'Devotox',
      birth_date: '08/11/1996',
      gender: 'M',
      email: 'javier@gmail.com',
      address: 'Jase 12',
      nationality: 'CHILENO',
      nic_number: '1234712'
    },
    {
      user_name: 'marina',
      password: 1234,
      contact_number: '2342345',
      name: 'Marina',
      surname: 'Flores',
      birth_date: '01/01/1987',
      gender: 'F',
      email: 'marina@mail.com',
      address: 'brasil 3333',
      nationality: 'ARGENTINO',
      nic_number: '3424352'
    },
    {
      user_name: 'gasti',
      password: 1234,
      contact_number: '3235433',
      name: 'Gaston',
      surname: 'Mastri',
      birth_date: '01/01/1932',
      gender: 'M',
      email: 'gasti.mastri@gmail.com',
      address: 'pepe 54',
      nationality: 'VENEZOLANO',
      nic_number: '40590213'
    }
  ]))
