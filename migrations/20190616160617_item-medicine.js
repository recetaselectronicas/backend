const {
  MEDICINE, ITEM, VADEMECUM, COVERAGE, COMPOSITION, BRAND, SHAPE, SIZE, LABORATORY, POTENCY, DRUG
} = require('../src/repositories/tablesNames')

/* iD, troquel, accion_farma, descripcion, fecha_alta, fecha_baja,
 codigoBarras, id_marca, id_tamano, id_forma, id_droga, id_laboratorio, id_potencia
 */ exports.up = knex => knex.schema
  .withSchema('recetas')
// tabla de vadecemun
  .createTable(VADEMECUM, (table) => {
    table.increments('id')
    table.string('description', 255).notNullable()
    return table
  })
// tabla de cobertura : Cobertura: (fecha_desde, id_vademecum, id_plan, fecha_hasta)
  .createTable(COVERAGE, (table) => {
    table.string('entry_date', 255).notNullable()
    table.string('leaving_date', 255)
    table.integer('id_vademecum').unsigned()
    table.foreign('id_vademecum').references(`${VADEMECUM}.id`)
    table.integer('id_plan').unsigned() // TODO: FK

    return table
  })

// tabla de medicina
  .createTable(MEDICINE, (table) => {
    table.increments('id')
    table.string('troquel', 255).notNullable()
    table.string('pharmaceutical_action', 255).notNullable()
    table.string('description', 255).notNullable()
    table.string('entry_date', 255).notNullable()
    table.string('leaving_date', 255)
    table.string('bar_code', 255).notNullable()
    table
      .integer('id_brand')
      .unsigned()
      .notNullable()
    table
      .integer('id_size')
      .unsigned()
      .notNullable()
    table
      .integer('id_shape')
      .unsigned()
      .notNullable()
    table
      .integer('id_drug')
      .unsigned()
      .notNullable()
    table
      .integer('id_laboratory')
      .unsigned()
      .notNullable()
    table
      .integer('id_potency')
      .unsigned()
      .notNullable()

    table.foreign('id_brand').references(`${BRAND}.id`)
    table.foreign('id_size').references(`${SIZE}.id`)
    table.foreign('id_shape').references(`${SHAPE}.id`)
    table.foreign('id_drug').references(`${DRUG}.id`)
    table.foreign('id_laboratory').references(`${LABORATORY}.id`)
    table.foreign('id_potency').references(`${POTENCY}.id`)
  })

// Composicion: (id_medicamento,id_vademecum)
  .createTable(COMPOSITION, (table) => {
    table.integer('id_medicine').unsigned()
    table.integer('id_vademecum').unsigned()

    table.foreign('id_medicine').references(`${MEDICINE}.id`)
    table.foreign('id_vademecum').references(`${VADEMECUM}.id`)
    table.primary(['id_medicine', 'id_vademecum'])
  })
/* ID, id_receta, id_medicamento_recetado, cantidad_recetado,
 id_medicamento_recepcionado, cantidad_recepcionado,
   id_medicamento_auditado, cantidad_auditado, fecha_venta, id_farmaceutico, */
  .createTable(ITEM, (table) => {
    table.increments('id')
    table
      .integer('id_prescription')
      .unsigned()
      .notNullable()
      // TODO FK

    // medicamentos prescriptos
    table
      .integer('id_medicine_prescribed')
      .unsigned()
      .notNullable()
    table.foreign('id_medicine_prescribed').references(`${MEDICINE}.id`)
    table
      .integer('prescribed_quantity')
      .unsigned()
      .notNullable()
      // medicamentos recepcionados
    table.integer('id_medicine_received').unsigned()
    table.foreign('id_medicine_received').references(`${MEDICINE}.id`)
    table.integer('received_quantity').unsigned()

    // medicamentos auditados
    table.integer('id_medicine_audited').unsigned()
    table.foreign('id_medicine_audited').references(`${MEDICINE}.id`)
    table.integer('audited_quantity').unsigned()

    table.string('sold_date', 255)
    table.integer('id_pharmacist').unsigned()
  })

exports.down = knex => knex.schema
  .withSchema('recetas')
  .dropTable(ITEM)
  .dropTable(COMPOSITION)
  .dropTable(MEDICINE)
  .dropTable(COVERAGE)
  .dropTable(VADEMECUM)
