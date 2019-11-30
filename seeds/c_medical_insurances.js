const { MEDICAL_INSURANCE } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(MEDICAL_INSURANCE)
  .del()
  .then(() => knex(MEDICAL_INSURANCE).insert([
    {
      description: 'OSDE',
      contact_number: '1520202020',
      user_name: 'osde',
      password: '1234',
      confirmed: true,
      corporate_name: 'OSDE S.R.L.',
      address: 'Calle falsa 123',
      email: 'osde@osde.com'
    },
    {
      description: 'Hospital Italiano',
      contact_number: '1520202020',
      user_name: 'italiano',
      password: '1234',
      confirmed: true,
      corporate_name: 'HospitalItaliano S.A',
      address: 'Joaquin V Gonzales 1',
      email: 'hospitalItaliano@hi.com'
    },
    {
      description: 'OSTEL',
      contact_number: '1520202020',
      user_name: 'ostel',
      password: '1234',
      confirmed: true,
      corporate_name: 'OSTEL S.A.',
      address: 'Beiro 1232',
      email: 'ostel@ostel.com'
    },
    {
      description: 'OBRA SOCIAL (DEMO)',
      contact_number: '1520202020',
      user_name: 'demo',
      password: '1234',
      confirmed: true,
      corporate_name: 'DEMO S.A.',
      address: 'Beiro 1232',
      email: 'demo@demo.com'
    },
    {
      description: 'PAMI',
      contact_number: '1520202020',
      user_name: 'pami',
      password: '1234',
      confirmed: true,
      corporate_name: 'PAMI',
      address: 'Calle Falsa 123',
      email: 'pami@pami.com'
    },
    {
      description: 'IOMA',
      contact_number: '1520202020',
      user_name: 'ioma',
      password: '1234',
      confirmed: true,
      corporate_name: 'IOMA',
      address: 'Calle Falsa 123',
      email: 'ioma@ioma.com'
    },
    {
      description: 'ACA Salud',
      contact_number: '1520202020',
      user_name: 'aca',
      password: '1234',
      confirmed: true,
      corporate_name: 'ACA Salud S.A.',
      address: 'Calle Falsa 123',
      email: 'aca-salud@aca.com'
    },
    {
      description: 'Accord Salud',
      contact_number: '1520202020',
      user_name: 'accord',
      password: '1234',
      confirmed: true,
      corporate_name: 'Accord Salud S.A.',
      address: 'Calle Falsa 123',
      email: 'accord@accord.com'
    },
    {
      description: 'Bristol Medicine',
      contact_number: '1520202020',
      user_name: 'bristol',
      password: '1234',
      confirmed: true,
      corporate_name: 'Bristol Medicine S.A.',
      address: 'Calle Falsa 123',
      email: 'bristol@bristol.com'
    },
    {
      description: 'DAS Congreso',
      contact_number: '1520202020',
      user_name: 'das',
      password: '1234',
      confirmed: true,
      corporate_name: 'DAS Congreso S.A.',
      address: 'Calle Falsa 123',
      email: 'das@das.com'
    },
    {
      description: 'Galeno',
      contact_number: '1520202020',
      user_name: 'galeno',
      password: '1234',
      confirmed: true,
      corporate_name: 'Galeno S.A.',
      address: 'Calle Falsa 123',
      email: 'galeno@galeno.com'
    },
    {
      description: 'Hominis',
      contact_number: '1520202020',
      user_name: 'hominis',
      password: '1234',
      confirmed: true,
      corporate_name: 'Hominis S.A.',
      address: 'Calle Falsa 123',
      email: 'hominis@hominis.com'
    },
    {
      description: 'Medicus',
      contact_number: '1520202020',
      user_name: 'medicus',
      password: '1234',
      confirmed: true,
      corporate_name: 'Medicus S.A.',
      address: 'Calle Falsa 123',
      email: 'medicus@medicus.com'
    },
    {
      description: 'MOA',
      contact_number: '1520202020',
      user_name: 'moa',
      password: '1234',
      confirmed: true,
      corporate_name: 'MOA S.A.',
      address: 'Calle Falsa 123',
      email: 'moa@moa.com'
    },
    {
      description: 'OSAP',
      contact_number: '1520202020',
      user_name: 'osap',
      password: '1234',
      confirmed: true,
      corporate_name: 'OSAP S.A.',
      address: 'Calle Falsa 123',
      email: 'osap@osap.com'
    },
    {
      description: 'OSDOP',
      contact_number: '1520202020',
      user_name: 'osdop',
      password: '1234',
      confirmed: true,
      corporate_name: 'OSDOP S.A.',
      address: 'Calle Falsa 123',
      email: 'osdop@osdop.com'
    },
    {
      description: 'OSFATUN',
      contact_number: '1520202020',
      user_name: 'osfatun',
      password: '1234',
      confirmed: true,
      corporate_name: 'OSFATUN S.A.',
      address: 'Calle Falsa 123',
      email: 'osfatun@osfatun.com'
    },
    {
      description: 'UP',
      contact_number: '1520202020',
      user_name: 'up',
      password: '1234',
      confirmed: true,
      corporate_name: 'UP S.A.',
      address: 'Calle Falsa 123',
      email: 'up@up.com'
    }
  ]))
