const { OPERATOR_METADATA } = require('./operatorsMetadata')
const { QUANTIFIER_METADATA } = require('./quantifiersMetadata')
const { PrescriptionProlongedTreatmentCriteria } = require('../criterias/prescriptionCriteria/prescriptionProlongedTreatmentCriteria')
const { PrescriptionDiagnosisCriteria } = require('../criterias/prescriptionCriteria/prescriptionDiagnosisCriteria')
const { PrescriptionItemsCountCriteria } = require('../criterias/prescriptionCriteria/prescriptionItemsCountCriteria')
const { ItemPresribedBarcodeCriteria } = require('../criterias/ItemCriteria/ItemPrescribeCriteria/itemPrescribedBarcodeCriteria')
const { ItemPresribedDescriptionCriteria } = require('../criterias/ItemCriteria/ItemPrescribeCriteria/itemPrescribedDescriptionCriteria')
const { ItemPresribedDrugCriteria } = require('../criterias/ItemCriteria/ItemPrescribeCriteria/itemPrescribedDrugCriteria')
const { ItemPresribedLaboratoryCriteria } = require('../criterias/ItemCriteria/ItemPrescribeCriteria/itemPrescribedLaboratoryCriteria')
const { ItemPresribedPharmaceuticalActionCriteria } = require('../criterias/ItemCriteria/ItemPrescribeCriteria/itemPrescribedPharmaceuticalActionCriteria')
const { ItemPresribedPotencyCriteria } = require('../criterias/ItemCriteria/ItemPrescribeCriteria/itemPrescribedPotencyCriteria')
const { ItemPresribedPresentationCriteria } = require('../criterias/ItemCriteria/ItemPrescribeCriteria/itemPrescribedPresentationCriteria')
const { ItemPresribedQuantityCriteria } = require('../criterias/ItemCriteria/ItemPrescribeCriteria/itemPrescribedQuantityCriteria')
const { ItemPresribedSizeCriteria } = require('../criterias/ItemCriteria/ItemPrescribeCriteria/itemPrescribedSizeCriteria')
const { ItemPresribedTroquelCriteria } = require('../criterias/ItemCriteria/ItemPrescribeCriteria/itemPrescribedTroquelCriteria')
const { ItemReceivedBarcodeCriteria } = require('../criterias/ItemCriteria/ItemReceivedCriteria/itemReceivedBarcodeCriteria')
const { ItemReceivedDescriptionCriteria } = require('../criterias/ItemCriteria/ItemReceivedCriteria/itemReceivedDescriptionCriteria')
const { ItemReceivedDrugCriteria } = require('../criterias/ItemCriteria/ItemReceivedCriteria/itemReceivedDrugCriteria')
const { ItemReceivedLaboratoryCriteria } = require('../criterias/ItemCriteria/ItemReceivedCriteria/itemReceivedLaboratoryCriteria')
const { ItemReceivedPharmaceuticalActionCriteria } = require('../criterias/ItemCriteria/ItemReceivedCriteria/itemReceivedPharmaceuticalActionCriteria')
const { ItemReceivedPotencyCriteria } = require('../criterias/ItemCriteria/ItemReceivedCriteria/itemReceivedPotencyCriteria')
const { ItemReceivedPresentationCriteria } = require('../criterias/ItemCriteria/ItemReceivedCriteria/itemReceivedPresentationCriteria')
const { ItemReceivedQuantityCriteria } = require('../criterias/ItemCriteria/ItemReceivedCriteria/itemReceivedQuantityCriteria')
const { ItemReceivedSizeCriteria } = require('../criterias/ItemCriteria/ItemReceivedCriteria/itemReceivedSizeCriteria')
const { ItemReceivedTroquelCriteria } = require('../criterias/ItemCriteria/ItemReceivedCriteria/itemReceivedTroquelCriteria')
const { ItemAuditedBarcodeCriteria } = require('../criterias/ItemCriteria/ItemAuditedCriteria/itemAuditedBarcodeCriteria')
const { ItemAuditedDescriptionCriteria } = require('../criterias/ItemCriteria/ItemAuditedCriteria/itemAuditedDescriptionCriteria')
const { ItemAuditedDrugCriteria } = require('../criterias/ItemCriteria/ItemAuditedCriteria/itemAuditedDrugCriteria')
const { ItemAuditedLaboratoryCriteria } = require('../criterias/ItemCriteria/ItemAuditedCriteria/itemAuditedLaboratoryCriteria')
const { ItemAuditedPharmaceuticalActionCriteria } = require('../criterias/ItemCriteria/ItemAuditedCriteria/itemAuditedPharmaceuticalActionCriteria')
const { ItemAuditedPotencyCriteria } = require('../criterias/ItemCriteria/ItemAuditedCriteria/itemAuditedPotencyCriteria')
const { ItemAuditedPresentationCriteria } = require('../criterias/ItemCriteria/ItemAuditedCriteria/itemAuditedPresentationCriteria')
const { ItemAuditedQuantityCriteria } = require('../criterias/ItemCriteria/ItemAuditedCriteria/itemAuditedQuantityCriteria')
const { ItemAuditedSizeCriteria } = require('../criterias/ItemCriteria/ItemAuditedCriteria/itemAuditedSizeCriteria')
const { ItemAuditedTroquelCriteria } = require('../criterias/ItemCriteria/ItemAuditedCriteria/itemAuditedTroquelCriteria')
const { AffiliateAgeCriteria } = require('../criterias/affiliateCriteria/affiliateAgeCriteria')
const { AffiliateCredentialCriteria } = require('../criterias/affiliateCriteria/affiliateCredentialCriteria')
const { AffiliateGenderCriteria } = require('../criterias/affiliateCriteria/affiliateGenderCriteria')
const { AffiliateNationalityCriteria } = require('../criterias/affiliateCriteria/affiliateNationalityCriteria')
const { AffiliatePlanCriteria } = require('../criterias/affiliateCriteria/affiliatePlanCriteria')
const { AffiliateActiveCriteria } = require('../criterias/affiliateCriteria/affiliateActiveCriteria')
const { DoctorAgeCriteria } = require('../criterias/doctorCriteria/doctorAgeCriteria')
const { DoctorNationalMatriculationCriteria } = require('../criterias/doctorCriteria/doctorNationalMatriculationCriteria')
const { DoctorNationalityCriteria } = require('../criterias/doctorCriteria/doctorNationalityCriteria')
const { DoctorProvincialMatriculationCriteria } = require('../criterias/doctorCriteria/doctorProvincialMatriculationCriteria')
const { DoctorSpecialtyCriteria } = require('../criterias/doctorCriteria/doctorSpecialtyCriteria')
const { InstitutionDescriptionCriteria } = require('../criterias/institutionCriteria/institutionDescriptionCriteria')
const { PharmacistAgeCriteria } = require('../criterias/pharmacistCriteria/pharmacistAgeCriteria')
const { PharmacistMatriculationCriteria } = require('../criterias/pharmacistCriteria/pharmacistMatriculationCriteria')
const { PharmacistNationalityCriteria } = require('../criterias/pharmacistCriteria/pharmacistNationalityCriteria')

const CRITERIA_METADATA = {
  getActualPrescription: () => null,
  loadPredicate: json => CRITERIA_METADATA[json.entity][json.attribute]({ ...json, prescription: CRITERIA_METADATA.getActualPrescription() }),
  getModel: json => ({ ...json, operator: OPERATOR_METADATA[json.operator](json) }),
  getModelWithQuantifier: json => ({ ...json, operator: OPERATOR_METADATA[json.operator](json), quantifier: QUANTIFIER_METADATA[json.quantifier](json) }),
  PRESCRIPTION: {
    PROLONGED_TREATMENT: json => new PrescriptionProlongedTreatmentCriteria().initialize(CRITERIA_METADATA.getModel(json)),
    DIAGNOSIS: json => new PrescriptionDiagnosisCriteria().initialize(CRITERIA_METADATA.getModel(json)),
    ITEMS_COUNT: json => new PrescriptionItemsCountCriteria().initialize(CRITERIA_METADATA.getModel(json))
  },
  ITEM_PRESCRIBED: {
    QUANTITY: json => new ItemPresribedQuantityCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    DESCRIPTION: json => new ItemPresribedDescriptionCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    PHARMACEUTICAL_ACTION: json => new ItemPresribedPharmaceuticalActionCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    TROQUEL: json => new ItemPresribedTroquelCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    BARCODE: json => new ItemPresribedBarcodeCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    DRUG: json => new ItemPresribedDrugCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    SIZE: json => new ItemPresribedSizeCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    PRESENTATION: json => new ItemPresribedPresentationCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    LABORATORY: json => new ItemPresribedLaboratoryCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    POTENCY: json => new ItemPresribedPotencyCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json))
  },
  ITEM_RECEIVED: {
    QUANTITY: json => new ItemReceivedQuantityCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    DESCRIPTION: json => new ItemReceivedDescriptionCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    PHARMACEUTICAL_ACTION: json => new ItemReceivedPharmaceuticalActionCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    TROQUEL: json => new ItemReceivedTroquelCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    BARCODE: json => new ItemReceivedBarcodeCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    DRUG: json => new ItemReceivedDrugCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    SIZE: json => new ItemReceivedSizeCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    PRESENTATION: json => new ItemReceivedPresentationCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    LABORATORY: json => new ItemReceivedLaboratoryCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    POTENCY: json => new ItemReceivedPotencyCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json))
  },
  ITEM_AUDITED: {
    QUANTITY: json => new ItemAuditedQuantityCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    DESCRIPTION: json => new ItemAuditedDescriptionCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    PHARMACEUTICAL_ACTION: json => new ItemAuditedPharmaceuticalActionCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    TROQUEL: json => new ItemAuditedTroquelCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    BARCODE: json => new ItemAuditedBarcodeCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    DRUG: json => new ItemAuditedDrugCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    SIZE: json => new ItemAuditedSizeCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    PRESENTATION: json => new ItemAuditedPresentationCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    LABORATORY: json => new ItemAuditedLaboratoryCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    POTENCY: json => new ItemAuditedPotencyCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json))
  },
  AFFILIATE: {
    AGE: json => new AffiliateAgeCriteria().initialize(CRITERIA_METADATA.getModel(json)),
    GENDER: json => new AffiliateGenderCriteria().initialize(CRITERIA_METADATA.getModel(json)),
    NATIONALITY: json => new AffiliateNationalityCriteria().initialize(CRITERIA_METADATA.getModel(json)),
    CREDENTIAL: json => new AffiliateCredentialCriteria().initialize(CRITERIA_METADATA.getModel(json)),
    PLAN: json => new AffiliatePlanCriteria().initialize(CRITERIA_METADATA.getModel(json)),
    ACTIVE: json => new AffiliateActiveCriteria().initialize(CRITERIA_METADATA.getModel(json)),
  },
  DOCTOR: {
    AGE: json => new DoctorAgeCriteria().initialize(CRITERIA_METADATA.getModel(json)),
    NATIONALITY: json => new DoctorNationalityCriteria().initialize(CRITERIA_METADATA.getModel(json)),
    NATIONAL_MATRICULATION: json => new DoctorNationalMatriculationCriteria().initialize(CRITERIA_METADATA.getModel(json)),
    PROVINCIAL_MATRICULATION: json => new DoctorProvincialMatriculationCriteria().initialize(CRITERIA_METADATA.getModel(json)),
    SPECIALTY: json => new DoctorSpecialtyCriteria().initialize(CRITERIA_METADATA.getModel(json)),
  },
  INSTITUTION: {
    DESCRIPTION: json => new InstitutionDescriptionCriteria().initialize(CRITERIA_METADATA.getModel(json)),
  },
  PHARMACIST: {
    AGE: json => new PharmacistAgeCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    NATIONALITY: json => new PharmacistNationalityCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
    MATRICULATION: json => new PharmacistMatriculationCriteria().initialize(CRITERIA_METADATA.getModelWithQuantifier(json)),
  }
}

module.exports = { CRITERIA_METADATA }