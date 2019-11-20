
const getValidNicTypes = () => ([
  { id: 'DNI', description: 'Documento Nacional de Indentidad' },
  { id: 'LC', description: 'Libreta Cívica' },
  { id: 'LE', description: 'Libreta de enrrolamiento' }
])
module.exports = { getValidNicTypes }