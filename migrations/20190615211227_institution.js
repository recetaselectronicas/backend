const { INSTITUTION } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(INSTITUTION, (table) => {
  table.increments('id')
  table.string('description', 255).notNullable()
  table.string('address', 255).notNullable()
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(INSTITUTION)
