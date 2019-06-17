exports.up = knex => knex.schema.withSchema('recetas').createTable('institution', (table) => {
  table.increments('id')
  table.string('description', 255).notNullable()
  table.string('address', 255).notNullable()
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable('institution')
