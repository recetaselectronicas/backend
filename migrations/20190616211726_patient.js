const { PATIENT } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(PATIENT, (table) => {
  table.increments('id')
  table.string('user_name').notNullable()
  table.string('password').notNullable()
  table.string('contact_number', 255)
  table.string('name', 255).notNullable()
  table.string('surname', 255).notNullable()
  table.string('birth_date', 255).notNullable()
  table.string('gender', 255).notNullable()
  table.string('email', 255).notNullable()
  table.string('address', 255).notNullable()
  table.string('nationality', 255).notNullable()
  table.string('nic_number', 255).notNullable()
  table.string('nic_issue_date', 255)
  table.string('nic_type', 255)
  table.string('nic_exemplary', 255)
  table.string('nic_photo', 255)
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(PATIENT)

/*
Paciente:
(ID,usuario,password,nombre,apellido,telefono,fecha_nacimiento,sexo,
    nro_documento,email,nacionalidad,fecha_emision,tipo_doc,ejemplar,domicilio,foto_dni)
Paciente.usuario, Paciente.password, Paciente.nombre Paciente.apellido, Paciente.fecha_nacimiento Paciente.sexo Paciente.nro_documento,
 Paciente.nacionalidad, Paciente.email, Paciente.domicilio, no pueden ser nulos
*/
