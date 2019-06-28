const { AFFILIATE, PATIENT } = require('../src/repositories/tablesNames')
/* Afiliado: ID, fecha_desde, id_paciente, codigo, categoria, imagen_credencial, fecha_hasta, id_plan
 */
exports.up = knex => knex.schema.withSchema('recetas').createTable(AFFILIATE, (table) => {
  table.increments('id')
  table.integer('id_patient').unsigned()
  table.integer('id_plan').unsigned()
  table.datetime('from_date').notNullable()
  table.datetime('to_date')
  table.string('category', 50)
  table.string('code', 255).notNullable()
  table.string('image_credential', 255)

  table.foreign('id_patient').references(`${PATIENT}.id`)
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(AFFILIATE)
