const { PHARMACIST } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(PHARMACIST)
  .del()
  .then(() => knex(PHARMACIST).insert([
    {
      entry_date: '',
      leaving_date: '',
      birth_date: '',
      name: 'Anda',
      last_name: 'Lepint',
      user_name: 'andale',
      contact_number: '1520202020',
      nationality: 'ARGENTINO',
      address: 'Lo loca 412',
      email: 'andale@gmail.com',
      matriculation: '8271236'
    },
    {
      entry_date: '',
      leaving_date: '',
      birth_date: '',
      name: 'Maria',
      last_name: 'Avilar',
      user_name: 'mavilar',
      contact_number: '1520202020',
      nationality: 'ARGENTINO',
      address: 'perez 4122',
      email: 'mavilar@yahoo.com',
      matriculation: '1837172'
    },
    {
      entry_date: '',
      leaving_date: '',
      birth_date: '',
      name: 'Anda',
      last_name: 'Johnson',
      user_name: 'alan',
      contact_number: '1520202020',
      nationality: 'VENEZOLANO',
      address: 'Menro 932',
      email: 'ajohnson@gmail.com',
      matriculation: '17347823'
    }
  ]))

/*

let pharmacist1 = new Pharmacist()
pharmacist1.userName = 'andale'
pharmacist1.name = 'Anda'
pharmacist1.lastName = 'Lepint'
pharmacist1.nationality = 'ARGENTINO'
pharmacist1.email = 'andale@gmail.com'
pharmacist1.address = 'Lo loca 412'
pharmacist1.contactNumber = '1520202020'
pharmacist1.setBirthDate('01/02/1957')
pharmacist1.setEntryDate('10/10/2013')
pharmacist1.setLeavingDate()
pharmacist1.matriculation = '8271236'

let pharmacist2 = new Pharmacist()
pharmacist2.userName = 'mavilar'
pharmacist2.name = 'Maria'
pharmacist2.lastName = 'Avilar'
pharmacist2.nationality = 'ARGENTINO'
pharmacist2.email = 'mavilar@yahoo.com'
pharmacist2.address = 'Otra calle fumeta 8323'
pharmacist2.contactNumber = '1520202020'
pharmacist2.setBirthDate('02/10/1933')
pharmacist2.setEntryDate('12/08/2013')
pharmacist2.setLeavingDate()
pharmacist2.matriculation = '1837172'

let pharmacist3 = new Pharmacist()
pharmacist3.userName = 'alan'
pharmacist3.name = 'Alan'
pharmacist3.lastName = 'Johnson'
pharmacist3.nationality = 'VENEZOLANO'
pharmacist3.email = 'ajohnson@gmail.com'
pharmacist3.address = 'Menro 932'
pharmacist3.contactNumber = '1520202020'
pharmacist3.setBirthDate('01/02/1952')
pharmacist3.setEntryDate('10/10/2014')
pharmacist3.setLeavingDate()
pharmacist3.matriculation = '17347823'

*/
