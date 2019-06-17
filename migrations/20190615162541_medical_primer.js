exports.up = knex => knex.schema
  .withSchema('recetas')
  .createTable('doctor', (table) => {
    table.increments('id')
    table.string('name', 255).notNullable()
    table.string('last_name', 255).notNullable()
    table.string('contact_number', 255).notNullable()
    table.string('nationality', 255).notNullable()
    table.string('address', 255).notNullable()
    table.string('email', 255).notNullable()
    table.string('national_matriculation', 255).notNullable()
    table.string('provincial_matriculation', 255).notNullable()
    table.string('specialty', 255).notNullable()
    return table
  })
  .createTable('medical_insurance', (table) => {
    table.increments('id')
    table.string('description', 255).notNullable()
    table.string('contact_number', 255).notNullable()
    table.string('user_name', 255).notNullable()
    table.string('password', 255).notNullable()
    table.string('corporate_name', 255).notNullable()
    table.string('address', 255).notNullable()
    table.string('email', 255).notNullable()
    return table
  })
  .createTable('medical_primer', (table) => {
    table.integer('id_doctor').unsigned()
    table.foreign('id_doctor').references('doctor.id')
    table.integer('id_medical_insurance').unsigned()
    table.foreign('id_medical_insurance').references('medical_insurance.id')

    table.string('entry_date', 255).notNullable()
    table.string('leaving_date', 255).notNullable()
    table.primary(['id_doctor', 'id_medical_insurance', 'entry_date', 'leaving_date'])
    return table
  })

exports.down = knex => knex.schema
  .withSchema('recetas')
  .dropTable('medical_primer')
  .dropTable('doctor')
  .dropTable('medical_insurance')
