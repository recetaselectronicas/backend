const { MEDICAL_BOOKLET, MEDICAL_INSURANCE, DOCTOR } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema
  .withSchema('recetas')
  .createTable(DOCTOR, (table) => {
    table.increments('id')
    table.string('user_name', 255).notNullable()
    table.string('password', 255).notNullable()
    table.string('name', 255).notNullable()
    table.string('last_name', 255).notNullable()
    table.date('birth_date').notNullable()
    table.datetime('entry_date').notNullable()
    table.datetime('leaving_date')
    table.string('contact_number', 255).notNullable()
    table.string('nationality', 255).notNullable()
    table.string('address', 255).notNullable()
    table.string('email', 255).notNullable()
    table.string('national_matriculation', 255).notNullable()
    table.string('provincial_matriculation', 255).notNullable()
  })
  .createTable(MEDICAL_INSURANCE, (table) => {
    table.increments('id')
    table.string('description', 255).notNullable()
    table.string('contact_number', 255).notNullable()
    table.string('user_name', 255).notNullable()
    table.string('password', 255).notNullable()
    table.string('corporate_name', 255).notNullable()
    table.string('address', 255).notNullable()
    table.string('email', 255).notNullable()
  })
  .createTable(MEDICAL_BOOKLET, (table) => {
    table.integer('id_doctor').unsigned()
    table.foreign('id_doctor').references(`${DOCTOR}.id`)
    table.integer('id_medical_insurance').unsigned()
    table.foreign('id_medical_insurance').references(`${MEDICAL_INSURANCE}.id`)

    table.datetime('entry_date').notNullable()
    table.datetime('leaving_date')
    table.primary(['id_doctor', 'id_medical_insurance', 'entry_date'])
    return table
  })

exports.down = knex => knex.schema
  .withSchema('recetas')
  .dropTable(MEDICAL_BOOKLET)
  .dropTable(DOCTOR)
  .dropTable(MEDICAL_INSURANCE)
