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
