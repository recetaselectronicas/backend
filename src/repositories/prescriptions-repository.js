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
  ITEM, PRESCRIPTION, INSTITUTION, STATE, MEDICINE,
} = require('./tablesNames')
const knex = require('../init/knexConnection')

class PrescriptionRepository {
  constructor() {
    this.prescriptions = []
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
        prescription.medicalInsurance.id && (await MedicalInsuranceRepository.getById(prescription.medicalInsurance.id || prescription.medicalInsurance)),
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
      id_state: plainPrescription.status.id,
      id_norm: plainPrescription.norm,
      id_institution: plainPrescription.institution.id,
    }

    try {
      const [prescriptionId] = await knex(PRESCRIPTION).insert(insertablePrescription)
      const insertableItems = plainPrescription.items.map(({ prescribed }) => ({
        id_prescription: prescriptionId,
        id_medicine_prescribed: prescribed.medicine.id,
        prescribed_quantity: prescribed.quantity,
      }))
      await knex(ITEM).insert(insertableItems)

      return prescriptionId
    } catch (e) {
      console.log('error', e)

      throw e
    }
  }

  update(_prescription) {
    return new Promise((resolve, reject) => {
      const prescription = Prescription.fromObject(_prescription)
      if (!prescription.id || !this.prescriptions.some(pres => prescription.id === pres.id)) {
        return reject(newNotFoundError('Prescription not found'))
      }
      this.prescriptions = this.prescriptions.filter(pres => pres.id !== prescription.id)
      const newPrescription = Prescription.fromJson(prescription.toJson())
      this.prescriptions.push(newPrescription)
      return resolve(newPrescription)
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
      .select()
      .table(PRESCRIPTION)
      .where('id', id)
      .first()
      .then(response => Prescription.fromObject(response))
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
          || (searchedPrescription.medicalInsurance && searchedPrescription.medicalInsurance.id === aPrescription.medicalInsurance.id),
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
    const { filters } = query
    const { status } = filters
    try {
      const prescriptions = await knex
        .select(
          `${PRESCRIPTION}.id`,
          `${PRESCRIPTION}.issuedDate`,
          `${PRESCRIPTION}.soldDate`,
          `${PRESCRIPTION}.ttl`,
          `${INSTITUTION}.description as institution_description`,
          `${INSTITUTION}.id as institutionId`,
          `${STATE}.description as status`,
        )
        .table(PRESCRIPTION)
        .innerJoin(INSTITUTION, `${PRESCRIPTION}.id_institution`, `${INSTITUTION}.id`)
        .innerJoin(STATE, `${PRESCRIPTION}.id_state`, `${STATE}.id`)
        .whereIn('id_state', status)
      return await Promise.all(
        prescriptions.map(async (prescription) => {
          const muttatedPrescription = { ...prescription }
          let items = []
          try {
            items = await this.getItem(prescription.id)
          } catch (e) {
            console.log('error get items', e)
            throw e
          }

          muttatedPrescription.institution = {
            id: muttatedPrescription.institutionId,
            description: muttatedPrescription.institutionDescription,
          }
          muttatedPrescription.items = items
          return Prescription.fromObject(muttatedPrescription)
        }),
      )
    } catch (error) {
      console.log('fatal error', error)
      throw error
    }
  }

  async getItem(prescriptionId) {
    return knex
      .select(
        `${ITEM}.id`,
        `${ITEM}.prescribed_quantity`,
        `${MEDICINE}.description as medicine_prescribed_description`,
        `${MEDICINE}.id as medicine_prescribed_id`,
      )
      .table(ITEM)
      .where('id_prescription', prescriptionId)
      .leftJoin(MEDICINE, `${ITEM}.id_medicine_prescribed`, `${MEDICINE}.id`)
      .then(response => response.map(item => ({
        prescribed: {
          quantity: item.prescribedQuantity,
          medicine: {
            description: item.medicinePrescribedDescription,
            id: item.medicinePrescribedId,
          },
        },
      })))
  }
}

module.exports = { PrescriptionRepository: new PrescriptionRepository() }
