const { AFFILIATE, PATIENT, PLAN } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(AFFILIATE, (table) => {
  table.increments('id')
  table.integer('id_patient').unsigned()
  table.integer('id_plan').unsigned()
  table.timestamp('from_date').notNullable().defaultTo(knex.fn.now())
  table.timestamp('to_date')
  table.string('category', 50)
  table.string('code', 255).notNullable()
  table.text('image_credential', 'longtext')

  table.foreign('id_patient').references(`${PATIENT}.id`)
  table.foreign('id_plan').references(`${PLAN}.id`)
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(AFFILIATE)
