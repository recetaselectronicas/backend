const { DOCTOR } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(DOCTOR)
  .del()
  .then(() => knex(DOCTOR).insert([
    {
      user_name: 'josecito',
      password: '1234',
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
      name: 'Rosco',
      last_name: 'Negrini',
      birth_date: '01/01/1940',
      entry_date: '01/01/2000',
      contact_number: '1520202020',
      nationality: 'ARGENTINO',
      address: 'Menro 932',
      email: 'rosco@medic.com',
      national_matriculation: '1283712345',
      provincial_matriculation: '99283153'
    }
  ]))
/*


let doctor1 = new Doctor()
doctor1.userName = 'pepe'
doctor1.name = 'Jose'
doctor1.lastName = 'Pintimalli'
doctor1.nationality = 'ARGENTINO'
doctor1.email = 'pepe@medic.com'
doctor1.address = 'Lo loca 412'
doctor1.contactNumber = '1520202020'
doctor1.specialty = { id: 1, description: 'Oncologo' }
doctor1.setBirthDate('01/02/1957')
doctor1.setEntryDate('10/10/2013')
doctor1.setLeavingDate()
doctor1.nationalMatriculation = '12837123'
doctor1.provincialMatriculation = '992831'

let doctor2 = new Doctor()
doctor2.userName = 'rico'
doctor2.name = 'Enrrique'
doctor2.lastName = 'Rompebol'
doctor2.nationality = 'ARGENTINO'
doctor2.email = 'enrrique@medic.com'
doctor2.address = 'Otra calle fumeta 8323'
doctor2.contactNumber = '1520202020'
doctor2.specialty = { id: 2, description: 'Odontologo' }
doctor2.setBirthDate('02/10/1933')
doctor2.setEntryDate('12/08/2013')
doctor2.setLeavingDate()
doctor2.nationalMatriculation = '12837213'
doctor2.provincialMatriculation = '992123'

let doctor3 = new Doctor()
doctor3.userName = 'rosco'
doctor3.name = 'Rosco'
doctor3.lastName = 'Negrini'
doctor3.nationality = 'VENEZOLANO'
doctor3.email = 'rosco@medic.com'
doctor3.address = 'Menro 932'
doctor3.contactNumber = '1520202020'
doctor3.specialty = { id: 3, description: 'Clinico' }
doctor3.setBirthDate('01/02/1952')
doctor3.setEntryDate('10/10/2014')
doctor3.setLeavingDate()
doctor3.nationalMatriculation = '82718323'
doctor3.provincialMatriculation = '828781'
*/
