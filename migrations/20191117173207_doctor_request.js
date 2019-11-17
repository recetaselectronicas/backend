const { DOCTOR_REQUEST, MEDICAL_INSURANCE, DOCTOR } = require('../src/repositories/tablesNames')
const { requestStatus } = require('../src/repositories/defaults')

exports.up = knex => knex.schema.withSchema('recetas').createTable(DOCTOR_REQUEST, (table) => {
  table.increments('id')
  table.integer('id_medical_insurance').unsigned()
  table.integer('id_doctor').unsigned()
  table.timestamp('date_created').notNullable().defaultTo(knex.fn.now())
  table.string('status', 50).notNullable().defaultTo(requestStatus.PENDING)
  table.string('reason', 255)

  table.foreign('id_medical_insurance').references(`${MEDICAL_INSURANCE}.id`)
  table.foreign('id_doctor').references(`${DOCTOR}.id`)
  table.unique(['id_medical_insurance', 'id_doctor', 'date_created'], 'doctor_request_unique')
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(DOCTOR_REQUEST)
