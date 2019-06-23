const { INSTITUTION } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(INSTITUTION)
  .del()
  .then(() => knex(INSTITUTION).insert([
    { description: 'Centro de Salud y Accion Comunitario', address: 'Gral Jose Gervasio Artigas 2262' },
    { description: 'Centro Femme', address: 'Mariscal Francisco Solano Lopez 3114' },
    { description: 'CeSAC', address: 'Mercedes 1371' },
    { description: 'Bliss Beauty Center', address: 'Cuenca 2925' },
    { description: 'Vacunar', address: 'Blanco Encalada 4881' }
  ]))
