const { PHARMACIST } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').createTable(PHARMACIST, (table) => {
  table.increments('id')
  table.datetime('entry_date').notNullable()
  table.datetime('leaving_date')
  table.date('birth_date', 255).notNullable()
  table.string('name', 255).notNullable()
  table.string('last_name', 255).notNullable()
  table.string('user_name', 255).notNullable()
  table.string('password', 255).notNullable()
  table.string('contact_number', 255)
  table.string('nationality', 255)
  table.string('address', 255)
  table.string('email', 255).notNullable()
  table.string('matriculation', 255).notNullable()
})

exports.down = knex => knex.schema.withSchema('recetas').dropTable(PHARMACIST)

/*
(ID, fecha_alta, telefono, fecha_baja, fecha_nacimiento, usuario, password,
     nombre, apellido, nacionalidad, email, domicilio, nro_matricula)
Farmaceutico.d Farmaceutico.fecha_alta
Farmaceutico.fecha_nac
 Farmaceutico.usuario
 Farmaceutico.password
  Farmaceutico.nombre
  Farmaceutico.apellido
 Farmaceutico.email
 Farmaceutico.nro_matricula no pueden ser nulos

*/
