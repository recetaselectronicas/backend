const { RECEPTION, MEDICAL_INSURANCE, PHARMACIST } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(RECEPTION, (table) => {
  table.string('entry_date', 255).notNullable()
  table.string('leaving_date', 255)
  table.integer('id_medical_insurance').unsigned()
  table.integer('id_pharmacist').unsigned()

  table.foreign('id_medical_insurance').references(`${MEDICAL_INSURANCE}.id`)
  table.foreign('id_pharmacist').references(`${PHARMACIST}.id`)
  table.primary(['entry_date', 'id_medical_insurance', 'id_pharmacist'])
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(RECEPTION)

/*
Recepcion: (fecha_desde,id_farmaceutico, id_obra_social, fecha_hasta)
Recepcion.id_farmaceutico debe existir en Farmaceutico.ID
Recepcion.id_obra_social debe existir en Obra_Social.ID
Farmaceutico.ID y Obra_Social.ID pueden no existir en Recepcion.id_farmaceutico Recepcion.id_obra_social

*/
