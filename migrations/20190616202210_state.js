const { STATE } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(STATE, (table) => {
  table.increments('id')
  table.string('description', 255).notNullable()
  return table
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(STATE)
