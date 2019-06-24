const { ATTENTION, SPECIALITY, DOCTOR } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(ATTENTION, (table) => {
  table.string('entry_date', 255).notNullable()
  table.string('leaving_date', 255)
  table.integer('id_specialty').unsigned()
  table.integer('id_doctor').unsigned()

  table.foreign('id_specialty').references(`${SPECIALITY}.id`)
  table.foreign('id_doctor').references(`${DOCTOR}.id`)
  table.primary(['id_specialty', 'id_doctor', 'entry_date'])
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(ATTENTION)

/*
Atencion: (fecha_desde,id_medico,id_especialidad, fecha_hasta)
Atencion.id_medico debe existir en Medico.ID
Atencion.id_especialidad debe existir en Especialidad.ID
Especialidad.ID Medico.ID pueden no estar en Atencion.id_especialidad Atencion.id_medico


*/
