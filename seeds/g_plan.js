const { PLAN } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(PLAN)
  .del()
  .then(() => knex(PLAN).insert([
    {
      description: 'Coseguro',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 20,
      id_medical_insurance: 1
    },
    {
      description: 'Crónicos',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 70,
      id_medical_insurance: 1
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 50,
      id_medical_insurance: 1
    },
    {
      description: 'Subvencionado',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 80,
      id_medical_insurance: 1
    },
    {
      description: 'Coseguro',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 20,
      id_medical_insurance: 2
    },
    {
      description: 'Crónicos',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 70,
      id_medical_insurance: 2
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 50,
      id_medical_insurance: 2
    },
    {
      description: 'Subvencionado',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 80,
      id_medical_insurance: 2
    },
    {
      description: 'Coseguro',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 20,
      id_medical_insurance: 3
    },
    {
      description: 'Crónicos',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 70,
      id_medical_insurance: 3
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 50,
      id_medical_insurance: 3
    },
    {
      description: 'Subvencionado',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 80,
      id_medical_insurance: 3
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 4
    },
    {
      description: 'PMI',
      entry_date: '01/01/2000',
      leaving_date: '',
      percentage: 100,
      id_medical_insurance: 4
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 5
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 6
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 7
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 8
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 9
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 10
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 11
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 12
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 13
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 14
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 15
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 16
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 17
    },
    {
      description: 'PMO',
      entry_date: '01/01/2000',
      leaving_date: null,
      percentage: 50,
      id_medical_insurance: 18
    }
  ]))
