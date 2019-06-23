const {
  BRAND, SHAPE, SIZE, LABORATORY, POTENCY, DRUG
} = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema
  .withSchema('recetas')
  .createTable(BRAND, (table) => {
    table.increments('id')
    table.string('description', 255).notNullable()
  })
  .createTable(SHAPE, (table) => {
    table.increments('id')
    table.string('description', 255).notNullable()
  })
  .createTable(SIZE, (table) => {
    table.increments('id')
    table.string('description', 255).notNullable()
  })
  .createTable(LABORATORY, (table) => {
    table.increments('id')
    table.string('description', 255).notNullable()
  })
  .createTable(POTENCY, (table) => {
    table.increments('id')
    table.string('description', 255).notNullable()
  })
  .createTable(DRUG, (table) => {
    table.increments('id')
    table.string('description', 255).notNullable()
  })

exports.down = knex => knex.schema
  .withSchema('recetas')
  .dropTable(BRAND)
  .dropTable(SHAPE)
  .dropTable(SIZE)
  .dropTable(LABORATORY)
  .dropTable(POTENCY)
  .dropTable(DRUG)
