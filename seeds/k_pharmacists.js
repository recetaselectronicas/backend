const { PHARMACIST } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(PHARMACIST)
  .del()
  .then(() => knex(PHARMACIST).insert([
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      birth_date: '01/01/1980',
      name: 'Anda',
      last_name: 'Lepint',
      user_name: 'andale',
      password: '1234',
      confirmed: true,
      contact_number: '1520202020',
      nationality: 'ARGENTINA',
      address: 'Lo loca 412',
      email: 'andale@gmail.com',
      matriculation: '8271236',
      nic_type: 'DNI',
      nic_number: '8347293',
      gender: 'M'
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      birth_date: '01/01/1970',
      name: 'Maria',
      last_name: 'Avilar',
      user_name: 'mavilar',
      contact_number: '1520202020',
      nationality: 'ARGENTINA',
      password: '1234',
      confirmed: true,
      address: 'perez 4122',
      email: 'mavilar@yahoo.com',
      matriculation: '1837172',
      nic_type: 'DNI',
      nic_number: '19873492',
      gender: 'F'
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      birth_date: '01/01/1995',
      name: 'Anda',
      last_name: 'Johnson',
      user_name: 'alan',
      password: '1234',
      confirmed: true,
      contact_number: '1520202020',
      nationality: 'VENEZUELA',
      address: 'Menro 932',
      email: 'ajohnson@gmail.com',
      matriculation: '17347823',
      nic_type: 'DNI',
      nic_number: '3412398',
      gender: 'M'
    },
    {
      entry_date: '01/01/2000',
      leaving_date: '',
      birth_date: '01/01/1989',
      name: 'Pepe',
      last_name: 'Josefo',
      user_name: 'pepe',
      password: '1234',
      confirmed: true,
      contact_number: '6834934',
      nationality: 'VENEZUELA',
      address: 'Calle falsa 123',
      email: 'pepe@gmail.com',
      matriculation: '883472',
      nic_type: 'DNI',
      nic_number: '832792',
      gender: 'M'
    }
  ]))
