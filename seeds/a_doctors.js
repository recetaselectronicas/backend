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
      nationality: 'ARGENTINA',
      address: 'Lo loca 412',
      email: 'pepe@medic.com',
      national_matriculation: '12837123',
      provincial_matriculation: '992831',
      nic_type: 'DNI',
      nic_number: '123123',
      gender: 'M'
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
      nationality: 'CHILE',
      address: 'Calle falsa 123',
      email: 'enrrique@medic.com',
      national_matriculation: '24371233',
      provincial_matriculation: null,
      nic_type: 'DNI',
      nic_number: '123123',
      gender: 'M'
    },
    {
      user_name: 'demo',
      password: '1234',
      confirmed: true,
      name: 'Medico',
      last_name: 'Apellido',
      birth_date: '01/01/1940',
      entry_date: '01/01/2000',
      contact_number: '1520202020',
      nationality: 'ARGENTINA',
      address: 'Demo Street 932',
      email: 'demoemail@medic.com',
      national_matriculation: '65812639',
      provincial_matriculation: '231112',
      nic_type: 'DNI',
      nic_number: '20384912',
      gender: 'M'
    }
  ]))