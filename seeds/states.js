const { STATE } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(STATE)
  .del()
  .then(() => knex(STATE).insert([
    { id: 'ISSUED', description: 'EMITIDA' },
    { id: 'CANCELLED', description: 'CANCELADA' },
    { id: 'CONFIRMED', description: 'CONFIRMADA' },
    { id: 'EXPIRED', description: 'VENCIDA' },
    { id: 'RECEIVED', description: 'RECEPCIONADA' },
    { id: 'PARTIALLY_RECEIVED', description: 'PARCIALMENTE_RECEPCIONADA' },
    { id: 'INCOMPLETE', description: 'INCOMPLETA' },
    { id: 'AUDITED', description: 'AUDITADA' },
    { id: 'REJECTED', description: 'RECHAZADA' },
    { id: 'PARTIALLY_REJECTED', description: 'PARCIALMENTE_RECHAZADA' },
  ]))
