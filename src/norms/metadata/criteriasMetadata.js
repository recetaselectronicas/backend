const { PrescriptionItemsCountCriteria } = require('../criterias/prescriptionCriteria/prescriptionItemsCountCriteria')
const { PrescriptionProlongedTreatmentCriteria } = require('../criterias/prescriptionCriteria/prescriptionProlongedTreatmentCriteria')
const { ItemPresribedQuantityCriteria } = require('../criterias/ItemCriteria/ItemPrescribeCriteria/itemPrescribedQuantityCriteria')
const { OPERATOR_METADATA } = require('./operatorsMetadata')
const { QUANTIFIER_METADATA } = require('./quantifiersMetadata')

const CRITERIA_METADATA = {
  getActualPrescription: () => null,
  loadPredicate: json => CRITERIA_METADATA[json.entity][json.attribute]({ ...json, prescription: CRITERIA_METADATA.getActualPrescription() }),
  getModel: json => ({ ...json, operator: OPERATOR_METADATA[json.operator](json) }),
  getModelWithQuantifier: json => ({ ...json, operator: OPERATOR_METADATA[json.operator](json), quantifier: QUANTIFIER_METADATA[json.quantifier](json) }),
  PRESCRIPTION: {
    PROLONGED_TREATMENT: json => new PrescriptionProlongedTreatmentCriteria().initialize(CRITERIA_METADATA.getModel(json)),
    DIAGNOSIS: {},
    ITEMS_COUNT: json => new PrescriptionItemsCountCriteria().initialize(CRITERIA_METADATA.getModel(json))
  },
  ITEM_PRESCRIBED: {
    QUANTITY: json => new ItemPresribedQuantityCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    DESCRIPTION: {},
    PHARMACEUTICAL_ACTION: {},
    TROQUEL: {},
    BARCODE: {},
    DRUG: {},
    SIZE: {},
    PRESENTATION: {},
    LABORATORY: {},
    POTENCY: {}
  },
  ITEM_RECEIVED: {
    QUANTITY: {},
    DESCRIPTION: {},
    PHARMACEUTICAL_ACTION: {},
    TROQUEL: {},
    BARCODE: {},
    DRUG: {},
    SIZE: {},
    PRESENTATION: {},
    LABORATORY: {},
    POTENCY: {}
  },
  ITEM_AUDITED: {
    QUANTITY: {},
    DESCRIPTION: {},
    PHARMACEUTICAL_ACTION: {},
    TROQUEL: {},
    BARCODE: {},
    DRUG: {},
    SIZE: {},
    PRESENTATION: {},
    LABORATORY: {},
    POTENCY: {}
  },
  AFFILIATE: {
    AGE: {},
    GENDER: {},
    NATIONALITY: {},
    CREDENTIAL: {},
    PLAN: {}
  },
  DOCTOR: {
    AGE: {},
    NATIONALITY: {},
    NATIONAL_MATRICULATION: {},
    PROVINCIAL_MATRICULATION: {},
    SPECIALTY: {}
  },
  INSTITUTION: {
    DESCRIPTION: {}
  },
  PHARMACIST: {
    AGE: {},
    NATIONALITY: {},
    MATRICULATION: {}
  }
}

module.exports = { CRITERIA_METADATA }