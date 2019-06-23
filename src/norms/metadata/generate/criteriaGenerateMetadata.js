const { dataTypes } = require('./types')

const CRITERIA_METADATA = [
  {
    entity: 'PRESCRIPTION',
    value: 'Receta',
    quantificable: false,
    attributes: [
      {
        attribute: 'PROLONGED_TREATMENT',
        value: 'Tratamiento Prolongado',
        type: dataTypes.boolean
      },
      {
        attribute: 'DIAGNOSIS',
        value: 'Diagnóstico',
        type: dataTypes.string
      },
      {
        attribute: 'ITEMS_COUNT',
        value: 'Cantidad de Items',
        type: dataTypes.number
      }
    ]
  },
  {
    entity: 'ITEM_PRESCRIBED',
    value: 'Item Prescripto',
    quantificable: true,
    attributes: [
      {
        attribute: 'QUANTITY',
        value: 'Cantidad',
        type: dataTypes.number
      },
      {
        attribute: 'DESCRIPTION',
        value: 'Descripción',
        type: dataTypes.string
      },
      {
        attribute: 'PHARMACEUTICAL_ACTION',
        value: 'Acción Farmacéutica',
        type: dataTypes.string
      },
      {
        attribute: 'TROQUEL',
        value: 'Troquel',
        type: dataTypes.code
      },
      {
        attribute: 'BARCODE',
        value: 'Codigo de Barra',
        type: dataTypes.code
      },
      {
        attribute: 'DRUG',
        value: 'Droga',
        type: dataTypes.string
      },
      {
        attribute: 'SIZE',
        value: 'Tamaño',
        type: dataTypes.string
      },
      {
        attribute: 'PRESENTATION',
        value: 'Presentacion',
        type: dataTypes.string
      },
      {
        attribute: 'LABORATORY',
        value: 'Laboratorio',
        type: dataTypes.string
      },
      {
        attribute: 'POTENCY',
        value: 'Potencia',
        type: dataTypes.string
      }
    ]
  },
  {
    entity: 'ITEM_RECEIVED',
    value: 'Item Recepcionado',
    quantificable: true,
    attributes: [
      {
        attribute: 'QUANTITY',
        value: 'Cantidad',
        type: dataTypes.number
      },
      {
        attribute: 'DESCRIPTION',
        value: 'Descripción',
        type: dataTypes.string
      },
      {
        attribute: 'PHARMACEUTICAL_ACTION',
        value: 'Acción Farmacéutica',
        type: dataTypes.string
      },
      {
        attribute: 'TROQUEL',
        value: 'Troquel',
        type: dataTypes.code
      },
      {
        attribute: 'BARCODE',
        value: 'Codigo de Barra',
        type: dataTypes.code
      },
      {
        attribute: 'DRUG',
        value: 'Droga',
        type: dataTypes.string
      },
      {
        attribute: 'SIZE',
        value: 'Tamaño',
        type: dataTypes.string
      },
      {
        attribute: 'PRESENTATION',
        value: 'Presentacion',
        type: dataTypes.string
      },
      {
        attribute: 'LABORATORY',
        value: 'Laboratorio',
        type: dataTypes.string
      },
      {
        attribute: 'POTENCY',
        value: 'Potencia',
        type: dataTypes.string
      }
    ]
  },
  {
    entity: 'ITEM_AUDITED',
    value: 'Item Auditado',
    quantificable: true,
    attributes: [
      {
        attribute: 'QUANTITY',
        value: 'Cantidad',
        type: dataTypes.number
      },
      {
        attribute: 'DESCRIPTION',
        value: 'Descripción',
        type: dataTypes.string
      },
      {
        attribute: 'PHARMACEUTICAL_ACTION',
        value: 'Acción Farmacéutica',
        type: dataTypes.string
      },
      {
        attribute: 'TROQUEL',
        value: 'Troquel',
        type: dataTypes.code
      },
      {
        attribute: 'BARCODE',
        value: 'Codigo de Barra',
        type: dataTypes.code
      },
      {
        attribute: 'DRUG',
        value: 'Droga',
        type: dataTypes.string
      },
      {
        attribute: 'SIZE',
        value: 'Tamaño',
        type: dataTypes.string
      },
      {
        attribute: 'PRESENTATION',
        value: 'Presentacion',
        type: dataTypes.string
      },
      {
        attribute: 'LABORATORY',
        value: 'Laboratorio',
        type: dataTypes.string
      },
      {
        attribute: 'POTENCY',
        value: 'Potencia',
        type: dataTypes.string
      }
    ]
  },
  {
    entity: 'AFFILIATE',
    value: 'Afiliado',
    quantificable: false,
    attributes: [
      {
        attribute: 'AGE',
        value: 'Edad',
        type: dataTypes.number
      },
      {
        attribute: 'GENDER',
        value: 'Sexo',
        type: dataTypes.string
      },
      {
        attribute: 'NATIONALITY',
        value: 'Nacionalidad',
        type: dataTypes.string
      },
      {
        attribute: 'CREDENTIAL',
        value: 'Credencial',
        type: dataTypes.string
      },
      {
        attribute: 'PLAN',
        value: 'Plan',
        type: dataTypes.string
      },
    ]
  },
  {
    entity: 'DOCTOR',
    value: 'Médico',
    quantificable: false,
    attributes: [
      {
        attribute: 'AGE',
        value: 'Edad',
        type: dataTypes.number
      },
      {
        attribute: 'NATIONALITY',
        value: 'Nacionalidad',
        type: dataTypes.string
      },
      {
        attribute: 'NATIONAL_MATRICULATION',
        value: 'Matrícula Nacional',
        type: dataTypes.string
      },
      {
        attribute: 'PROVINCIAL_MATRICULATION',
        value: 'Matrícula Provincial',
        type: dataTypes.string
      },
      {
        attribute: 'SPECIALTY',
        value: 'Especialidad',
        type: dataTypes.typed
      },
    ]
  },
  {
    entity: 'INSTITUTION',
    value: 'Institución',
    quantificable: false,
    attributes: [
      {
        attribute: 'DESCRIPTION',
        value: 'Description',
        type: dataTypes.string
      }
    ]
  },
  {
    entity: 'PHARMACIST',
    value: 'Farmacéutico',
    quantificable: true,
    attributes: [
      {
        attribute: 'AGE',
        value: 'Edad',
        type: dataTypes.number
      },
      {
        attribute: 'NATIONALITY',
        value: 'Nacionalidad',
        type: dataTypes.string
      },
      {
        attribute: 'MATRICULATION',
        value: 'Matrícula',
        type: dataTypes.string
      }
    ]
  }
]

module.exports = { CRITERIA_METADATA }