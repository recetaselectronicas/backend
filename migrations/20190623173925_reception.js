const { RECEPTION, MEDICAL_INSURANCE, PHARMACIST } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(RECEPTION, (table) => {
  table.datetime('entry_date').notNullable()
  table.datetime('leaving_date')
  table.integer('id_medical_insurance').unsigned()
  table.integer('id_pharmacist').unsigned()

  table.foreign('id_medical_insurance').references(`${MEDICAL_INSURANCE}.id`)
  table.foreign('id_pharmacist').references(`${PHARMACIST}.id`)
  table.primary(['id_medical_insurance', 'id_pharmacist', 'entry_date'])
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(RECEPTION)
