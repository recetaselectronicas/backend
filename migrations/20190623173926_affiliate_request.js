const { AFFILIATE_REQUEST, PLAN, PATIENT } = require('../src/repositories/tablesNames')
const { requestStatus } = require('../src/repositories/defaults')

exports.up = knex => knex.schema.withSchema('recetas').createTable(AFFILIATE_REQUEST, (table) => {
  table.increments('id')
  table.integer('id_plan').unsigned()
  table.integer('id_patient').unsigned()
  table.timestamp('date_created').notNullable().defaultTo(knex.fn.now())
  table.string('status', 50).notNullable().defaultTo(requestStatus.PENDING)
  table.string('code', 255).notNullable()
  table.string('category', 255).notNullable()
  table.text('image_credential', 'longtext')
  table.string('reason', 255)

  table.foreign('id_plan').references(`${PLAN}.id`)
  table.foreign('id_patient').references(`${PATIENT}.id`)
  table.unique(['id_plan', 'id_patient', 'date_created'])
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(AFFILIATE_REQUEST)
