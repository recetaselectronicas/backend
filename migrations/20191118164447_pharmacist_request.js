const { PHARMACIST_REQUEST, MEDICAL_INSURANCE, PHARMACIST } = require('../src/repositories/tablesNames')
const { requestStatus } = require('../src/repositories/defaults')

exports.up = knex => knex.schema.withSchema('recetas').createTable(PHARMACIST_REQUEST, (table) => {
  table.increments('id')
  table.integer('id_medical_insurance').unsigned()
  table.integer('id_pharmacist').unsigned()
  table.timestamp('date_created').notNullable().defaultTo(knex.fn.now())
  table.string('status', 50).notNullable().defaultTo(requestStatus.PENDING)
  table.string('reason', 255)

  table.foreign('id_medical_insurance').references(`${MEDICAL_INSURANCE}.id`)
  table.foreign('id_pharmacist').references(`${PHARMACIST}.id`)
  table.unique(['id_medical_insurance', 'id_pharmacist', 'date_created'], 'pharmacist_request_unique')
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(PHARMACIST_REQUEST)
