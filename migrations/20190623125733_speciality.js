const { SPECIALITY } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(SPECIALITY, (table) => {
  table.increments('id')
  table.string('description', 255).notNullable()
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(SPECIALITY)
