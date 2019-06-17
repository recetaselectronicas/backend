const { STATE } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(STATE, (table) => {
  table.string('id', 40)
  table.string('description', 255).notNullable()
  table.primary(['id'])
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(STATE)
