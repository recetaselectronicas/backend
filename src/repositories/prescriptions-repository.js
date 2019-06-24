/* eslint-disable class-methods-use-this */
const { Prescription } = require('../domain/prescription')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')
const { AffiliateRepository } = require('../repositories/affiliateRepository')
const { InstitutionRepository } = require('../repositories/institutionRepository')
const { MedicalInsuranceRepository } = require('../repositories/medicalInsuranceRepository')
const { MedicineRepository } = require('../repositories/medicineRepository')
const { DoctorRepository } = require('../repositories/doctorRepository')
const { PharmacistRepository } = require('../repositories/pharmacistRepository')
const {
  ITEM, PRESCRIPTION, INSTITUTION, STATE, MEDICINE, AFFILIATE, PATIENT, MEDICAL_INSURANCE, DOCTOR
} = require('./tablesNames')
const knex = require('../init/knexConnection')
const Promise = require('bluebird')

class PrescriptionRepository {
  constructor() {
    this.prescriptions = []
    this.getItems = this.getItems.bind(this)
    this.getDomainPrescription = this.getDomainPrescription.bind(this)
    this.getByQuery = this.getByQuery.bind(this)
  }

  reset() {
    return new Promise((resolve, reject) => {
      this.prescriptions = []
      return resolve()
    })
  }

  async create(_prescription) {
    const prescription = Prescription.fromObject(_prescription).clone()
    if (prescription.id) {
      throw newEntityAlreadyCreated('Prescription allready created')
    }
    const errors = []
    try {
      prescription.setAffiliate((prescription.affiliate.id && (await AffiliateRepository.getById(prescription.affiliate.id))) || prescription.affiliate)
    } catch (error) {
      errors.push(error)
    }
    try {
      prescription.setInstitution(prescription.institution.id && (await InstitutionRepository.getById(prescription.institution.id || prescription.institution)))
    } catch (error) {
      errors.push(error)
    }
    try {
      prescription.setMedicalInsurance(
        prescription.medicalInsurance.id && (await MedicalInsuranceRepository.getById(prescription.medicalInsurance.id || prescription.medicalInsurance))
      )
    } catch (error) {
      errors.push(error)
    }
    try {
      prescription.setDoctor(prescription.doctor.id && (await DoctorRepository.getById(prescription.doctor.id || prescription.doctor)))
    } catch (error) {
      errors.push(error)
    }
    for (const item of prescription.items) {
      try {
        item.prescribed.medicine = (item.prescribed.medicine.id && (await MedicineRepository.getById(item.prescribed.medicine.id))) || item.prescribed.medicine
      } catch (error) {
        errors.push(error)
      }
      try {
        item.received.medicine = (item.received.medicine.id && (await MedicineRepository.getById(item.received.medicine.id))) || item.received.medicine
      } catch (error) {
        errors.push(error)
      }
      try {
        item.received.pharmacist = (item.received.pharmacist.id && (await PharmacistRepository.getById(item.received.pharmacist.id))) || item.received.pharmacist
      } catch (error) {
        errors.push(error)
      }
      try {
        item.audited.medicine = (item.audited.medicine.id && (await MedicineRepository.getById(item.audited.medicine.id))) || item.audited.medicine
      } catch (error) {
        errors.push(error)
      }
    }
    if (errors.length) {
      throw errors
    }
    const plainPrescription = prescription.toPlainObject()
    const insertablePrescription = {
      issued_date: plainPrescription.issuedDate,
      sold_date: plainPrescription.soldDate,
      audited_date: plainPrescription.auditedDate,
      prolonged_treatment: plainPrescription.prolongedTreatment,
      diagnosis: plainPrescription.diagnosis,
      ttl: plainPrescription.ttl,
      id_medical_insurance: plainPrescription.medicalInsurance.id,
      id_affiliate: plainPrescription.affiliate.id,
      id_doctor: plainPrescription.doctor.id,
      id_state: plainPrescription.status,
      id_norm: plainPrescription.norm,
      id_institution: plainPrescription.institution.id
    }

    try {
      const [prescriptionId] = await knex(PRESCRIPTION).insert(insertablePrescription)
      const insertableItems = plainPrescription.items.map(({ prescribed, received, audited }) => ({
        id_prescription: prescriptionId,
        id_medicine_prescribed: prescribed.medicine.id,
        prescribed_quantity: prescribed.quantity,
        id_medicine_received: received.medicine.id,
        received_quantity: received.quantity,
        id_medicine_audited: audited.medicine.id,
        audited_quantity: audited.quantity,
        id_pharmacist: received.pharmacist.id,
        sold_date: received.soldDate
      }))
      await knex(ITEM).insert(insertableItems)

      return prescriptionId
    } catch (e) {
      console.log('error', e)

      throw e
    }
  }

  async update(_prescription) {
    const prescription = Prescription.fromObject(_prescription).clone()

    const plainPrescription = prescription.toPlainObject()
    const updatetablePrescription = {
      issued_date: plainPrescription.issuedDate,
      sold_date: plainPrescription.soldDate,
      audited_date: plainPrescription.auditedDate,
      id_state: plainPrescription.status,
      reason: plainPrescription.reason
    }
    const prescriptionId = plainPrescription.id
    try {
      await knex.transaction(async (trx) => {
        await trx(PRESCRIPTION)
          .where('id', prescriptionId)
          .update(updatetablePrescription)

        await Promise.all(
          plainPrescription.items.map(({
            id, prescribed, received, audited
          }) => {
            const updatableItem = {
              id_medicine_prescribed: prescribed.medicine.id,
              prescribed_quantity: prescribed.quantity,
              id_medicine_received: received.medicine.id,
              received_quantity: received.quantity,
              id_medicine_audited: audited.medicine.id,
              audited_quantity: audited.quantity,
              id_pharmacist: received.pharmacist.id,
              sold_date: received.soldDate
            }
            return trx(ITEM)
              .where('id_prescription', prescriptionId)
              .andWhere('id', id)
              .update(updatableItem)
          })
        )
      })
    } catch (e) {
      console.log('error', e)
      throw e
    }
  }

  updateTo(_prescription, newStatus) {
    const prescription = Prescription.fromObject(_prescription)
    return knex(PRESCRIPTION)
      .where('id', prescription.id)
      .update({
        id_state: newStatus
      })
  }

  count() {
    return new Promise((resolve, reject) => resolve(this.prescriptions.length))
  }

  getAll() {
    return new Promise((resolve, reject) => resolve([...this.prescriptions]))
  }

  getById(id) {
    return knex
      .select(
        `${PRESCRIPTION}.diagnosis`,
        `${PRESCRIPTION}.prolonged_treatment`,
        `${PRESCRIPTION}.id`,
        `${PRESCRIPTION}.issuedDate`,
        `${PRESCRIPTION}.soldDate`,
        `${PRESCRIPTION}.auditedDate`,
        `${PRESCRIPTION}.ttl`,
        `${AFFILIATE}.id as id_affiliate`,
        `${AFFILIATE}.code as code_affiliate`,
        `${PATIENT}.name as name_affiliate`,
        `${PATIENT}.surname as surname_affiliate`,
        `${INSTITUTION}.description as institution_description`,
        `${INSTITUTION}.address as institution_address`,
        `${INSTITUTION}.id as institutionId`,
        `${MEDICAL_INSURANCE}.description as medical_insurance_description`,
        `${MEDICAL_INSURANCE}.id as medical_insurance_id`,
        `${STATE}.id as status`,
        `${DOCTOR}.id as id_doctor`,
        `${DOCTOR}.name as name_doctor`,
        `${DOCTOR}.last_name as last_name_doctor`
      )
      .table(PRESCRIPTION)
      .leftJoin(AFFILIATE, `${PRESCRIPTION}.id_affiliate`, `${AFFILIATE}.id`)
      .leftJoin(PATIENT, `${AFFILIATE}.id_patient`, `${PATIENT}.id`)
      .leftJoin(INSTITUTION, `${PRESCRIPTION}.id_institution`, `${INSTITUTION}.id`)
      .leftJoin(MEDICAL_INSURANCE, `${PRESCRIPTION}.id_medical_insurance`, `${MEDICAL_INSURANCE}.id`)
      .leftJoin(STATE, `${PRESCRIPTION}.id_state`, `${STATE}.id`)
      .leftJoin(DOCTOR, `${PRESCRIPTION}.id_doctor`, `${DOCTOR}.id`)
      .where(`${PRESCRIPTION}.id`, id)
      .first()
      .then(this.getDomainPrescription)
      .catch((error) => {
        console.log('error getting by id prescritption', error)
        throw newNotFoundError(`No prescription was found with id ${id}`)
      })
  }

  getByExample(_prescription) {
    return new Promise((resolve, reject) => {
      const searchedPrescription = Prescription.fromObject(_prescription)
      const prescriptions = this.prescriptions.filter(
        aPrescription => (searchedPrescription.issueDate && searchedPrescription.issueDate === aPrescription.issueDate)
          || (searchedPrescription.soldDate && searchedPrescription.soldDate === aPrescription.soldDate)
          || (searchedPrescription.auditedDate && searchedPrescription.auditedDate === aPrescription.auditedDate)
          || (searchedPrescription.institution && searchedPrescription.institution.id === aPrescription.institution.id)
          || (searchedPrescription.affiliate && searchedPrescription.affiliate.id === aPrescription.affiliate.id)
          || (searchedPrescription.doctor && searchedPrescription.doctor.id === aPrescription.doctor.id)
          || (searchedPrescription.medicalInsurance && searchedPrescription.medicalInsurance.id === aPrescription.medicalInsurance.id)
      )
      return resolve(prescriptions)
    })
  }

  getByStatus(status) {
    return new Promise((resolve, reject) => {
      const prescriptions = this.prescriptions.filter(prescription => prescription.status === status)
      return resolve(prescriptions)
    })
  }

  async getByQuery(query) {
    const { filters, orders } = query
    const { status, id, institution } = filters
    const { orderKey, sortKey } = orders
    console.log('query', query)
    try {
      const knexQuery = knex
        .select(
          `${PRESCRIPTION}.diagnosis`,
          `${PRESCRIPTION}.prolonged_treatment`,
          `${PRESCRIPTION}.id`,
          `${PRESCRIPTION}.issuedDate`,
          `${PRESCRIPTION}.soldDate`,
          `${PRESCRIPTION}.ttl`,
          `${AFFILIATE}.id as id_affiliate`,
          `${AFFILIATE}.code as code_affiliate`,
          `${PATIENT}.name as name_affiliate`,
          `${PATIENT}.surname as surname_affiliate`,
          `${INSTITUTION}.description as institution_description`,
          `${INSTITUTION}.id as institution_id`,
          `${MEDICAL_INSURANCE}.description as medical_insurance_description`,
          `${MEDICAL_INSURANCE}.id as medical_insurance_id`,
          `${STATE}.description as status`,
          `${DOCTOR}.name as name_doctor`,
          `${DOCTOR}.last_name as last_name_doctor`
        )
        .table(PRESCRIPTION)
        .leftJoin(STATE, `${PRESCRIPTION}.id_state`, `${STATE}.id`)
        .leftJoin(AFFILIATE, `${PRESCRIPTION}.id_affiliate`, `${AFFILIATE}.id`)
        .leftJoin(PATIENT, `${AFFILIATE}.id_patient`, `${PATIENT}.id`)
        .leftJoin(INSTITUTION, `${PRESCRIPTION}.id_institution`, `${INSTITUTION}.id`)
        .leftJoin(MEDICAL_INSURANCE, `${PRESCRIPTION}.id_medical_insurance`, `${MEDICAL_INSURANCE}.id`)
        .leftJoin(DOCTOR, `${PRESCRIPTION}.id_doctor`, `${DOCTOR}.id`)
        .whereIn('id_state', status)

      if (id && id.length > 0) {
        knexQuery.whereIn(`${PRESCRIPTION}.id`, id)
      }
      if (institution && institution.length > 0) {
        knexQuery.whereIn(`${PRESCRIPTION}.id_institution`, institution)
      }
      if (orderKey && sortKey) {
        knexQuery.orderBy(orderKey, sortKey)
      }

      const prescriptions = await knexQuery
      return await Promise.all(prescriptions.map(this.getDomainPrescription))
    } catch (error) {
      console.log('fatal error', error)
      throw error
    }
  }

  getItems(prescriptionId) {
    const medicinePrescribed = `${MEDICINE}_prescribed`
    const medicineAudited = `${MEDICINE}_audited`
    const medicineReceived = `${MEDICINE}_received`
    return knex
      .select(
        `${ITEM}.id`,
        `${ITEM}.prescribed_quantity`,
        `${ITEM}.received_quantity`,
        `${ITEM}.audited_quantity`,
        `${ITEM}.sold_date`,
        `${ITEM}.id_pharmacist`,
        `${medicinePrescribed}.description as medicine_prescribed_description`,
        `${medicinePrescribed}.id as medicine_prescribed_id`,
        `${medicineAudited}.description as medicine_audited_description`,
        `${medicineAudited}.id as medicine_audited_id`,
        `${medicineReceived}.description as medicine_received_description`,
        `${medicineReceived}.id as medicine_received_id`
      )
      .table(ITEM)
      .where('id_prescription', prescriptionId)
      .leftJoin(`${MEDICINE} as ${medicinePrescribed}`, `${ITEM}.id_medicine_prescribed`, `${medicinePrescribed}.id`)
      .leftJoin(`${MEDICINE} as ${medicineAudited}`, `${ITEM}.id_medicine_audited`, `${medicineAudited}.id`)
      .leftJoin(`${MEDICINE} as ${medicineReceived}`, `${ITEM}.id_medicine_received`, `${medicineReceived}.id`)
      .then(response => response.map(item => ({
        id: item.id,
        prescribed: {
          quantity: item.prescribedQuantity,
          medicine: {
            description: item.medicinePrescribedDescription,
            id: item.medicinePrescribedId
          }
        },
        received: {
          quantity: item.receivedQuantity,
          soldDate: item.soldDate,
          pharmacist: { id: item.idPharmacist },
          medicine: {
            description: item.medicineReceivedDescription,
            id: item.medicineReceivedId
          }
        },
        audited: {
          quantity: item.auditedQuantity,
          medicine: {
            description: item.medicineAuditedDescription,
            id: item.medicineAuditedId
          }
        }
      })))
  }

  async getDomainPrescription(response) {
    const muttedPrescription = { ...response }
    muttedPrescription.affiliate = {
      id: response.idAffiliate,
      code: response.codeAffiliate,
      name: response.nameAffiliate,
      surname: response.surnameAffiliate
    }
    muttedPrescription.institution = {
      id: response.institutionId,
      description: response.institutionDescription,
      address: response.institutionAddress
    }
    muttedPrescription.medicalInsurance = {
      id: response.medicalInsuranceId,
      description: response.medicalInsuranceDescription
    }
    muttedPrescription.doctor = {
      id: response.idDoctor,
      name: response.nameDoctor,
      lastName: response.lastNameDoctor
    }
    muttedPrescription.items = await this.getItems(muttedPrescription.id)
    return Prescription.fromObject(muttedPrescription)
  }

  async fillPrescriptionData(prescription, checkErrors) {
    const errors = []
    try {
      prescription.setAffiliate((prescription.affiliate.id && (await AffiliateRepository.getById(prescription.affiliate.id))) || prescription.affiliate)
    } catch (error) {
      errors.push(error)
    }
    try {
      prescription.setInstitution(prescription.institution.id && (await InstitutionRepository.getById(prescription.institution.id || prescription.institution)))
    } catch (error) {
      errors.push(error)
    }
    try {
      prescription.setMedicalInsurance(
        prescription.medicalInsurance.id && (await MedicalInsuranceRepository.getById(prescription.medicalInsurance.id || prescription.medicalInsurance))
      )
    } catch (error) {
      errors.push(error)
    }
    try {
      prescription.setDoctor(prescription.doctor.id && (await DoctorRepository.getById(prescription.doctor.id || prescription.doctor)))
    } catch (error) {
      errors.push(error)
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const item of prescription.items) {
      try {
        item.prescribed.medicine = (item.prescribed.medicine.id && (await MedicineRepository.getById(item.prescribed.medicine.id))) || item.prescribed.medicine
      } catch (error) {
        errors.push(error)
      }
      try {
        item.received.medicine = (item.received.medicine.id && (await MedicineRepository.getById(item.received.medicine.id))) || item.received.medicine
      } catch (error) {
        errors.push(error)
      }
      try {
        item.received.pharmacist = (item.received.pharmacist.id && (await PharmacistRepository.getById(item.received.pharmacist.id))) || item.received.pharmacist
      } catch (error) {
        errors.push(error)
      }
      try {
        item.audited.medicine = (item.audited.medicine.id && (await MedicineRepository.getById(item.audited.medicine.id))) || item.audited.medicine
      } catch (error) {
        errors.push(error)
      }
    }
    if (checkErrors && errors.length) {
      throw errors
    }
  }
}

module.exports = { PrescriptionRepository: new PrescriptionRepository() }
