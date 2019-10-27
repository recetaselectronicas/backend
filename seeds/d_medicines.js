const { MEDICINE } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(MEDICINE)
  .del()
  .then(() => knex(MEDICINE).insert([
    {
      description: 'T4 Montpellier 150 Levotiroxina x 30 U',
      troquel: '187482-2',
      pharmaceutical_action: 'tiroide',
      entry_date: '01/01/2000',
      leaving_date: '',
      bar_code: '7791231827381',
      id_brand: 6,
      id_size: 1,
      id_shape: 2,
      id_drug: 4,
      id_laboratory: 8,
      id_potency: 7
    },
    {
      description: 'T4 Montpellier 137 Levotiroxina x 15 U',
      troquel: '187481-1',
      pharmaceutical_action: 'tiroide',
      entry_date: '01/01/2000',
      leaving_date: '',
      bar_code: '7791231827382',
      id_brand: 6,
      id_size: 4,
      id_shape: 2,
      id_drug: 4,
      id_laboratory: 8,
      id_potency: 6
    },
    {
      description: 'Betacort Cassará 3 % x 15 g',
      troquel: '476657-1',
      pharmaceutical_action: 'Corticoide potente grupo 3',
      entry_date: '01/01/2000',
      leaving_date: '',
      bar_code: '77955730132475',
      id_brand: 7,
      id_size: 6,
      id_shape: 4,
      id_drug: 6,
      id_laboratory: 2,
      id_potency: 8
    },
    {
      description: 'Ibupirac 600 mg x 15 U',
      troquel: '182047-3',
      pharmaceutical_action: 'Analgésico, antiinflamatorio, antifebril',
      entry_date: '01/01/2000',
      leaving_date: '',
      bar_code: '7793827349233',
      id_brand: 1,
      id_size: 4,
      id_shape: 2,
      id_drug: 1,
      id_laboratory: 4,
      id_potency: 5
    },
    {
      description: 'Tafirol 500 mg x 30 U',
      troquel: '123878-2',
      pharmaceutical_action: 'Analgésico, antifebril',
      entry_date: '01/01/2000',
      leaving_date: '',
      bar_code: '7793827349233',
      id_brand: 2,
      id_size: 1,
      id_shape: 2,
      id_drug: 2,
      id_laboratory: 9,
      id_potency: 9
    },
    {
      description: 'Mejoralito 80 mg tabletas x 15',
      troquel: '872392-6',
      pharmaceutical_action: 'Analgésico, antifebril',
      entry_date: '01/01/2000',
      leaving_date: '',
      bar_code: '98734903984',
      id_brand: 3,
      id_size: 4,
      id_shape: 5,
      id_drug: 2,
      id_laboratory: 10,
      id_potency: 10
    },
    {
      description: 'Quraplus 500 mg x 15 U',
      troquel: '123423-2',
      pharmaceutical_action: 'antitermico, descongestivo, mucolitico y antihistaminico',
      entry_date: '01/01/2000',
      leaving_date: '',
      bar_code: '23487298390',
      id_brand: 4,
      id_size: 4,
      id_shape: 2,
      id_drug: 7,
      id_laboratory: 11,
      id_potency: 1
    },
    {
      description: 'Dioxaflex 75 mg x 6 U',
      troquel: '123478-2',
      pharmaceutical_action: 'Antiinflamatorio. Analgesico. Antipiretico',
      entry_date: '01/01/2000',
      leaving_date: '',
      bar_code: '7791237237',
      id_brand: 8,
      id_size: 2,
      id_shape: 2,
      id_drug: 5,
      id_laboratory: 12,
      id_potency: 11
    }
  ]))

