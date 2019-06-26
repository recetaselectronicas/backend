const { LABORATORY } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(LABORATORY)
  .del()
  .then(() => knex(LABORATORY).insert([
    { description: 'Bayer' },
    { description: 'Roemmers' },
    { description: 'Gador' },
    { description: 'Pfizer' },
    { description: 'Novartis Argentina' },
    { description: 'Laboratorios Gador' },
    { description: 'Sanofi Aventis' },
    { description: 'Montpellier' },
    { description: 'GenomaLab' },
    { description: 'Glaxo' },
    { description: 'Bernabó' },
    { description: 'Bagó' }
  ]))
