const { PHARMACIST } = require('../src/repositories/tablesNames')
const { authenticationTypes } = require('../src/permissions/identifiedUser')

exports.up = knex => knex.schema.withSchema('recetas').createTable(PHARMACIST, (table) => {
  table.increments('id')
  table.datetime('entry_date').notNullable()
  table.datetime('leaving_date')
  table.date('birth_date', 255).notNullable()
  table.string('name', 255).notNullable()
  table.string('last_name', 255).notNullable()
  table.string('user_name', 255).notNullable()
  table.string('password', 255).notNullable()
  table.boolean('confirmed').notNullable().defaultTo(false)
  table.string('contact_number', 255)
  table.string('nationality', 255)
  table.string('address', 255)
  table.string('email', 255).notNullable()
  table.string('matriculation', 255).notNullable()
  table.string('two_factor_key', 255)
  table.boolean('two_factor_verified').defaultTo(false)
  table.string('default_authentication_method', 255).defaultTo(authenticationTypes.USR_PASS)
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
