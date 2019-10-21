const { ATTENTION, SPECIALITY, DOCTOR } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(ATTENTION, (table) => {
  table.datetime('entry_date').notNullable()
  table.datetime('leaving_date')
  table.integer('id_specialty').unsigned()
  table.integer('id_doctor').unsigned()

  table.foreign('id_specialty').references(`${SPECIALITY}.id`)
  table.foreign('id_doctor').references(`${DOCTOR}.id`)
  table.primary(['id_doctor', 'id_specialty', 'entry_date'])
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(ATTENTION)
