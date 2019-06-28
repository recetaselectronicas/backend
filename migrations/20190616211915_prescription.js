const {
  PRESCRIPTION, MEDICAL_INSURANCE, AFFILIATE, DOCTOR, STATE, INSTITUTION
} = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(PRESCRIPTION, (table) => {
  table.increments('id')
  table.datetime('issued_date').notNullable()
  table.datetime('sold_date')
  table.datetime('audited_date')
  table.boolean('prolonged_treatment')
  table.string('diagnosis', 255)
  table.integer('ttl').notNullable()
  table.integer('id_medical_insurance').unsigned()
  table.integer('id_affiliate').unsigned()
  table.integer('id_doctor').unsigned()
  table.string('id_state').notNullable()
  table.string('id_norm', 255).notNullable()
  table.integer('id_institution').unsigned()

  table.foreign('id_medical_insurance').references(`${MEDICAL_INSURANCE}.id`)
  table.foreign('id_affiliate').references(`${AFFILIATE}.id`)
  table.foreign('id_doctor').references(`${DOCTOR}.id`)
  table.foreign('id_state').references(`${STATE}.id`)
  table.foreign('id_institution').references(`${INSTITUTION}.id`)
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(PRESCRIPTION)
/*
Receta:
(ID, fecha_emision, fecha_venta,fecha_auditado, diagnostico, tp,
  id_obra_social, id_afiliado, id_medico, id_estado, id_norma, id_institucion, TTL)

Receta.fecha_emision no puede ser nulo
Receta.Estado.ID no puede ser nulo
Receta.id_afiliado debe existir en Afiliado.ID
Receta.id_medico debe existir en Medico.Id
Receta.id_obra_social debe existir en Obra_Social.ID
Receta.id_norma debe existir en Norma.ID
Receta.id_institucion debe existir en Institucion.ID
Receta.TTL no puede ser nulo


*/
