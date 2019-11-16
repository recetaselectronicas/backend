const { SPECIALITY } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(SPECIALITY)
  .del()
  .then(() => knex(SPECIALITY).insert([
    { description: 'Kinesiología' },
    { description: 'Traumatología' },
    { description: 'Cirujía Plástica' },
    { description: 'Psicología' },
    { description: 'Oncología' },
    { description: 'Cardiología' },
    { description: 'Endocrinología' }
  ]))
