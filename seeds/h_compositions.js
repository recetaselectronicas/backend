const { COMPOSITION } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(COMPOSITION)
  .del()
  .then(() => knex(COMPOSITION).insert([
    { id_medicine: 1, id_vademecum: 2 },
    { id_medicine: 2, id_vademecum: 2 },
    { id_medicine: 3, id_vademecum: 2 },
    { id_medicine: 1, id_vademecum: 3 },
    { id_medicine: 2, id_vademecum: 3 },
    { id_medicine: 3, id_vademecum: 3 }
  ]))
