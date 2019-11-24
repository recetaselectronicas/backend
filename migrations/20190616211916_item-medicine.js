const {
  MEDICINE, ITEM, VADEMECUM, COVERAGE, COMPOSITION, BRAND, SHAPE, SIZE, LABORATORY, POTENCY, DRUG, PRESCRIPTION, PHARMACIST, PLAN
} = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema
  .withSchema('recetas')

  .createTable(VADEMECUM, (table) => {
    table.increments('id')
    table.string('description', 255).notNullable()
    return table
  })

  .createTable(COVERAGE, (table) => {
    table.datetime('entry_date').notNullable()
    table.datetime('leaving_date')
    table.integer('id_vademecum').unsigned()
    table.foreign('id_vademecum').references(`${VADEMECUM}.id`)
    table.integer('id_plan').unsigned()
    table.foreign('id_plan').references(`${PLAN}.id`)

    return table
  })

  .createTable(MEDICINE, (table) => {
    table.increments('id')
    table.string('troquel', 255).notNullable()
    table.string('pharmaceutical_action', 255).notNullable()
    table.string('description', 255).notNullable()
    table.float('price').notNullable()
    table.datetime('entry_date').notNullable()
    table.datetime('leaving_date')
    table.string('bar_code', 255).notNullable()
    table.integer('id_brand').unsigned().notNullable()
    table.integer('id_size').unsigned().notNullable()
    table.integer('id_shape').unsigned().notNullable()
    table.integer('id_drug').unsigned().notNullable()
    table.integer('id_laboratory').unsigned().notNullable()
    table.integer('id_potency').unsigned().notNullable()

    table.foreign('id_brand').references(`${BRAND}.id`)
    table.foreign('id_size').references(`${SIZE}.id`)
    table.foreign('id_shape').references(`${SHAPE}.id`)
    table.foreign('id_drug').references(`${DRUG}.id`)
    table.foreign('id_laboratory').references(`${LABORATORY}.id`)
    table.foreign('id_potency').references(`${POTENCY}.id`)
  })

  .createTable(COMPOSITION, (table) => {
    table.integer('id_medicine').unsigned()
    table.integer('id_vademecum').unsigned()

    table.foreign('id_medicine').references(`${MEDICINE}.id`)
    table.foreign('id_vademecum').references(`${VADEMECUM}.id`)
    table.primary(['id_medicine', 'id_vademecum'])
  })

  .createTable(ITEM, (table) => {
    table.increments('id')
    table.integer('id_prescription').unsigned().notNullable()
    table.foreign('id_prescription').references(`${PRESCRIPTION}.id`)

    table.integer('id_medicine_prescribed').unsigned().notNullable()
    table.foreign('id_medicine_prescribed').references(`${MEDICINE}.id`)
    table.integer('prescribed_quantity').unsigned().notNullable()

    table.integer('id_medicine_received').unsigned()
    table.foreign('id_medicine_received').references(`${MEDICINE}.id`)
    table.integer('received_quantity').unsigned()
    table.integer('id_pharmacist').unsigned()
    table.foreign('id_pharmacist').references(`${PHARMACIST}.id`)
    table.datetime('sold_date')

    table.integer('id_medicine_audited').unsigned()
    table.foreign('id_medicine_audited').references(`${MEDICINE}.id`)
    table.integer('audited_quantity').unsigned()
  })

exports.down = knex => knex.schema
  .withSchema('recetas')
  .dropTable(ITEM)
  .dropTable(COMPOSITION)
  .dropTable(MEDICINE)
  .dropTable(COVERAGE)
  .dropTable(VADEMECUM)
