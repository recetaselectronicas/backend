const { SPECIALITY } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(SPECIALITY)
  .del()
  .then(() => knex(SPECIALITY).insert([
    { description: 'Kinesiologo' },
    { description: 'Traumatologo' },
    { description: 'Cirujano' },
    { description: 'Psicologo' },
    { description: 'Oncologo' },
    { description: 'Cardiologo' },
    { description: 'Endocrinólogo' }
  ]))
