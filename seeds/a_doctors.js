const { DOCTOR } = require('../src/repositories/tablesNames')
const addKnexHooks = require('../src/init/knexHooks')

exports.seed = knex => addKnexHooks(knex)(DOCTOR)
  .del()
  .then(() => knex(DOCTOR).insert([
    {
      user_name: 'josecito',
      password: '1234',
      confirmed: true,
      name: 'Jose',
      last_name: 'Pintimalli',
      birth_date: '01/01/1980',
      entry_date: '01/01/2000',
      contact_number: '1520202020',
      nationality: 'ARGENTINO',
      address: 'Lo loca 412',
      email: 'pepe@medic.com',
      national_matriculation: '12837123',
      provincial_matriculation: '992831'
    },
    {
      user_name: 'enrrico',
      password: '1234',
      confirmed: true,
      name: 'Enrrique',
      last_name: 'Rompebol',
      birth_date: '01/01/1960',
      entry_date: '01/01/2000',
      contact_number: '1520202020',
      nationality: 'ARGENTINO',
      address: 'Calle falsa 123',
      email: 'enrrique@medic.com',
      national_matriculation: '12837213',
      provincial_matriculation: '992123'
    },
    {
      user_name: 'rosco',
      password: '1234',
      confirmed: true,
      name: 'Rosco',
      last_name: 'Negrini',
      birth_date: '01/01/1940',
      entry_date: '01/01/2000',
      contact_number: '1520202020',
      nationality: 'VENEZOLANO',
      address: 'Menro 932',
      email: 'rosco@medic.com',
      national_matriculation: '1283712345',
      provincial_matriculation: '99283153'
    }
  ]))