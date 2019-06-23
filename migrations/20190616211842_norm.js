const { NORM, MEDICAL_INSURANCE } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(NORM, (table) => {
  table.string('id_norm').notNullable()
  table.integer('id_medical_insurance').unsigned()
  table.integer('ttl').unsigned().notNullable().default(30)
  table.foreign('id_medical_insurance').references(`${MEDICAL_INSURANCE}.id`)
  table.primary(['id_medical_insurance'])
  table.unique(['id_norm'])
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(NORM)
/* Norma:(ID, descripcion, fecha_desde, fecha_hasta, id_obra_social )
Norma.id_obra_social tiene que estar en Obra_Social.id
Obra_Social.id puede no estar en Norma.id_obra_social
No puede haber vigente dos normas en un mismo periodo desde-hasta para una misma Obra Social.
 */
