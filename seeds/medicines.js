const { MEDICINE } = require('../src/repositories/tablesNames')

exports.seed = knex => knex(MEDICINE)
  .del()
  .then(() => knex(MEDICINE).insert([
    {
      description: 'T4 Montpellier 150 Levotiroxina',
      troquel: '187482-2',
      pharmaceutical_action: 'tiroide',
      entry_date: '',
      leaving_date: '',
      bar_code: '7791231827381',
      id_brand: null,
      id_size: null,
      id_shape: null,
      id_drug: null,
      id_laboratory: null,
      id_potency: null
    },
    {
      description: 'T4 Montpellier 137 Levotiroxina',
      troquel: '187481-1',
      pharmaceutical_action: 'tiroide',
      entry_date: '',
      leaving_date: '',
      bar_code: '7791231827382',
      id_brand: null,
      id_size: null,
      id_shape: null,
      id_drug: null,
      id_laboratory: null,
      id_potency: null
    },
    {
      description: 'Betacort Cassará',
      troquel: '476657-1',
      pharmaceutical_action: 'Corticoide potente grupo 3',
      entry_date: '',
      leaving_date: '',
      bar_code: '77955730132475',
      id_brand: null,
      id_size: null,
      id_shape: null,
      id_drug: null,
      id_laboratory: null,
      id_potency: null
    }
  ]))

/* const medicine1 = new Medicine()
medicine1.description = ''
medicine1.laboratoryDescription = 'Montpellier'
medicine1.potencyDescription = '150 mcg'
medicine1.presentationDescription = 'comprimidos'
medicine1.sizeDescription = '45 u'
medicine1.brandDescription = 'T4 Montpellier'
medicine1.drugDescription = 'Levotiroxina'
medicine1.pharmaceuticalAction = 'tiroide'
medicine1.barCode = ''
medicine1.troquel = ''
medicine1.setEntryDate('12/12/12')

const medicine2 = new Medicine()
medicine2.description = 'T4 Montpellier 137 Levotiroxina'
medicine2.laboratoryDescription = 'Montpellier'
medicine2.potencyDescription = '137 mcg'
medicine2.presentationDescription = 'comprimidos'
medicine2.sizeDescription = '45 u'
medicine2.brandDescription = 'T4 Montpellier'
medicine2.drugDescription = 'Levotiroxina'
medicine2.pharmaceuticalAction = 'tiroide'
medicine2.barCode = '7791231827382'
medicine2.troquel = '187481-1'
medicine2.setEntryDate('12/12/12')

const medicine3 = new Medicine()
medicine3.description = ''
medicine3.laboratoryDescription = 'Medisol'
medicine3.potencyDescription = '0,05%'
medicine3.presentationDescription = 'crema'
medicine3.sizeDescription = '15 gr'
medicine3.brandDescription = 'Betacort'
medicine3.drugDescription = 'Betametasona'
medicine3.pharmaceuticalAction = 'Corticoide potente grupo 3'
medicine3.barCode = ''
medicine3.troquel = ''
medicine3.setEntryDate('12/12/12') */
