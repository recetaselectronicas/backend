/* eslint-disable class-methods-use-this */
const { Prescription } = require('../domain/prescription')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')
const { dateTimeFormat } = require('../utils/utils')
const { AffiliateRepository } = require('../repositories/affiliateRepository')
const { InstitutionRepository } = require('../repositories/institutionRepository')
const { MedicalInsuranceRepository } = require('../repositories/medicalInsuranceRepository')
const { MedicineRepository } = require('../repositories/medicineRepository')
const { DoctorRepository } = require('../repositories/doctorRepository')
const { PharmacistRepository } = require('../repositories/pharmacistRepository')
const {
  ITEM, PRESCRIPTION, INSTITUTION, STATE, MEDICINE, AFFILIATE, PATIENT, MEDICAL_INSURANCE, DOCTOR, PRESCRIPTIONS_STATISTICS_VIEW
} = require('./tablesNames')
const knex = require('../init/knexConnection')
const { states } = require('./../state-machine/state')
const { defaults } = require('../config/defaults')

class PrescriptionRepository {
  constructor() {
    this.getItems = this.getItems.bind(this)
    this.getDomainPrescription = this.getDomainPrescription.bind(this)
    this.getByQuery = this.getByQuery.bind(this)
  }

  async create(_prescription) {
    let prescription = Prescription.fromObject(_prescription).clone()
    if (prescription.id) {
      throw newEntityAlreadyCreated('Prescription allready created')
    }
    prescription = await this.fillPrescriptionData(prescription, true)
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
      status_reason: plainPrescription.statusReason
    }
    const prescriptionId = plainPrescription.id
    try {
      const res = await knex.transaction(async (trx) => {
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
      return res
    } catch (e) {
      console.log('error', e)
      throw e
    }
  }

  async getById(id, query = {}) {
    const { medicalInsurance, affiliate } = query
    const knexQuery = knex
      .select(
        `${PRESCRIPTION}.diagnosis`,
        `${PRESCRIPTION}.prolonged_treatment`,
        `${PRESCRIPTION}.id`,
        `${PRESCRIPTION}.issuedDate`,
        `${PRESCRIPTION}.soldDate`,
        `${PRESCRIPTION}.auditedDate`,
        `${PRESCRIPTION}.ttl`,
        `${PRESCRIPTION}.status_reason`,
        `${PRESCRIPTION}.id_norm as norm`,
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

    if (medicalInsurance) {
      knexQuery.where(`${PRESCRIPTION}.id_medical_insurance`, Number.parseInt(medicalInsurance, 10))
    }

    if (affiliate) {
      knexQuery.where(`${PRESCRIPTION}.id_affiliate`, Number.parseInt(affiliate, 10))
    }

    const queryReponse = await knexQuery.where(`${PRESCRIPTION}.id`, id).first()
    if (!queryReponse) {
      throw newNotFoundError(`No prescription was found with id ${id}`)
    }
    const prescription = await this.getDomainPrescription(queryReponse)

    return this.fillPrescriptionData(prescription, false)
  }

  getIssuedToConfirmed() {
    return knex
      .select(`${PRESCRIPTION}.id`)
      .table(PRESCRIPTION)
      .where(`${PRESCRIPTION}.id_state`, states.ISSUED.id)
      .andWhereRaw(`${PRESCRIPTION}.issued_date < DATE_SUB(SYSDATE(), INTERVAL "${defaults.daemons.issued.ttl}" SECOND)`)
  }

  getPrescriptionsToExpirate() {
    return knex
      .select(`${PRESCRIPTION}.id`)
      .table(PRESCRIPTION)
      .whereIn(`${PRESCRIPTION}.id_state`, [states.CONFIRMED.id, states.PARTIALLY_RECEIVED.id])
      .andWhereRaw(`${PRESCRIPTION}.issued_date < DATE_SUB(SYSDATE(), INTERVAL "${defaults.daemons.expired.ttl}" SECOND)`)
  }

  async getByQuery(query) {
    const { filters, orders } = query
    const { status, id, institution, fromIssueDate, toIssueDate } = filters
    const { affiliate, doctor, medicalInsurance, pharmacist } = filters
    const { orderKey, sortKey } = orders
    try {
      const knexQuery = knex
        .select(
          `${PRESCRIPTION}.diagnosis`,
          `${PRESCRIPTION}.prolonged_treatment`,
          `${PRESCRIPTION}.id`,
          `${PRESCRIPTION}.issuedDate`,
          `${PRESCRIPTION}.soldDate`,
          `${PRESCRIPTION}.ttl`,
          `${PRESCRIPTION}.status_reason`,
          `${PRESCRIPTION}.id_norm as norm`,
          `${AFFILIATE}.id as id_affiliate`,
          `${AFFILIATE}.code as code_affiliate`,
          `${PATIENT}.name as name_affiliate`,
          `${PATIENT}.surname as surname_affiliate`,
          `${INSTITUTION}.description as institution_description`,
          `${INSTITUTION}.id as institution_id`,
          `${MEDICAL_INSURANCE}.description as medical_insurance_description`,
          `${MEDICAL_INSURANCE}.id as medical_insurance_id`,
          `${STATE}.description as status`,
          `${DOCTOR}.id as id_doctor`,
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
      if (affiliate) {
        knexQuery.where(`${AFFILIATE}.id_patient`, affiliate)
      }
      if (doctor) {
        knexQuery.where(`${DOCTOR}.id`, doctor)
      }
      if (medicalInsurance) {
        knexQuery.where(`${MEDICAL_INSURANCE}.id`, medicalInsurance)
      }
      if (pharmacist) {
        knexQuery.whereRaw('exists (select \'x\' from item where item.id_prescription = prescription.id and item.id_pharmacist = ?)', [pharmacist])
      }
      if (fromIssueDate) {
        knexQuery.where(`${PRESCRIPTION}.issued_date`, '>=', fromIssueDate)
      }
      if (toIssueDate) {
        knexQuery.where(`${PRESCRIPTION}.issued_date`, '<=', toIssueDate)
      }

      if (orderKey && sortKey) {
        knexQuery.orderBy(orderKey, sortKey)
      }


      const prescriptions = await knexQuery
      return await Promise.all(prescriptions.map(pres => this.getDomainPrescription(pres).then(pres2 => this.fillPrescriptionData(pres2))))
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
      .leftJoin(`${MEDICINE} as ${medicinePrescribed}`, `${ITEM}.id_medicine_prescribed`, `${medicinePrescribed}.id`)
      .leftJoin(`${MEDICINE} as ${medicineAudited}`, `${ITEM}.id_medicine_audited`, `${medicineAudited}.id`)
      .leftJoin(`${MEDICINE} as ${medicineReceived}`, `${ITEM}.id_medicine_received`, `${medicineReceived}.id`)
      .where(`${ITEM}.id_prescription`, prescriptionId)
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
    if (response) {
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
    }
    return Prescription.fromObject(muttedPrescription)
  }

  async fillPrescriptionData(prescription, checkErrors) {
    const muttedPrescription = Prescription.fromObject(prescription).clone()
    const errors = []
    try {
      muttedPrescription.setAffiliate((muttedPrescription.affiliate.id && (await AffiliateRepository.getById(muttedPrescription.affiliate.id))) || muttedPrescription.affiliate)
    } catch (error) {
      errors.push(error)
    }
    try {
      muttedPrescription.setInstitution(
        muttedPrescription.institution.id && (await InstitutionRepository.getById(muttedPrescription.institution.id || muttedPrescription.institution))
      )
    } catch (error) {
      errors.push(error)
    }
    try {
      muttedPrescription.setMedicalInsurance(
        muttedPrescription.medicalInsurance.id && (await MedicalInsuranceRepository.getById(muttedPrescription.medicalInsurance.id || muttedPrescription.medicalInsurance))
      )
    } catch (error) {
      errors.push(error)
    }
    try {
      muttedPrescription.setDoctor(muttedPrescription.doctor.id && (await DoctorRepository.getById(muttedPrescription.doctor.id || muttedPrescription.doctor)))
    } catch (error) {
      errors.push(error)
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const item of muttedPrescription.items) {
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
    return muttedPrescription
  }

  async fillPrescriptionItemsData(prescription, checkErrors) {
    const muttedPrescription = Prescription.fromObject(prescription).clone()
    const errors = []
    // eslint-disable-next-line no-restricted-syntax
    for (const item of muttedPrescription.items) {
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
    return muttedPrescription
  }

  getStatistics(medicalInsuranceId, appliedFilters, appliedOrders) {
    const query = knex
      .select(
        'prescription_id',
        'item_id',
        'prescription_issued_date',
        'item_sold_date',
        'prescription_audited_date',
        'affiliate_credential',
        'patient_name',
        'doctor_national_matriculation',
        'doctor_name',
        'pharmacist_matriculation',
        'pharmacist_name',
        'item_prescribed_quantity',
        'item_received_quantity',
        'item_audited_quantity',
        'medicine_prescribed_price',
        'medicine_receivedd_price',
        'medicine_audited_price',
        'medicine_prescribed_description',
        'medicine_received_description',
        'medicine_audited_description',
        'prescription_status',
        'prescription_norm'
      )
      .from(PRESCRIPTIONS_STATISTICS_VIEW)
      .where({ medicalInsuranceId })

    if (appliedFilters && appliedFilters.length) {
      appliedFilters.forEach((filter) => {
        if (filter.type === 'equal') {
          query.where(filter.key, filter.value)
        } else if (filter.type === 'like') {
          query.where(filter.key, 'like', `%${filter.value}%`)
        } else if (filter.type === 'in') {
          query.where(filter.key, filter.value)
        }
      })
    }

    if (appliedOrders && appliedOrders.length) {
      appliedOrders.forEach((order) => {
        query.orderBy(order.key, order.order)
      })
    }
    return query
  }
}

module.exports = { PrescriptionRepository: new PrescriptionRepository() }
