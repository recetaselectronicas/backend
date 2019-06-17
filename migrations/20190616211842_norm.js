const { NORM, MEDICAL_INSURANCE } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(NORM, (table) => {
  table.increments('id')
  table.string('description', 255).notNullable()
  table.string('entry_date', 255).notNullable()
  table.string('leaving_date', 255).notNullable()
  table.integer('id_medical_insurance').unsigned()
  table.foreign('id_medical_insurance').references(`${MEDICAL_INSURANCE}.id`)
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(NORM)
/* Norma:(ID, descripcion, fecha_desde, fecha_hasta, id_obra_social )
Norma.id_obra_social tiene que estar en Obra_Social.id
Obra_Social.id puede no estar en Norma.id_obra_social
No puede haber vigente dos normas en un mismo periodo desde-hasta para una misma Obra Social.
 */
