const { DRUG } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(DRUG)
  .del()
  .then(() => knex(DRUG).insert([
    { description: 'Ibuprofeno' },
    { description: 'Paracetamol' },
    { description: 'Amoxixilina' },
    { description: 'Levotirixina' },
    { description: 'Diclofenac' }
  ]))
