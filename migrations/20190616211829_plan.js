const { PLAN, MEDICAL_INSURANCE } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(PLAN, (table) => {
  table.increments('id')
  table.string('description', 255).notNullable()
  table.string('entry_date', 255).notNullable()
  table.string('leaving_date', 255)
  table.integer('percentage')
  table.integer('id_medical_insurance').unsigned()

  table.foreign('id_medical_insurance').references(`${MEDICAL_INSURANCE}.id`)
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(PLAN)
/* Plan : (ID, descripcion,fecha_alta,fecha_baja,porcentaje,id_obra_social)
Plan.id_obra_social debe existir en Obra_Social.ID
 */
