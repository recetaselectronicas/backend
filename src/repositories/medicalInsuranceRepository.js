/* eslint-disable class-methods-use-this */
const { MedicalInsurance } = require('../domain/medicalInsurance')
const { Plan } = require('../domain/plan')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')
const knex = require('../init/knexConnection')
const { MEDICAL_INSURANCE, PLAN, MEDICAL_BOOKLET } = require('./tablesNames')
const { logger } = require('../utils/utils')
const { dateTimeFormat } = require('../utils/utils')

class MedicalInsuranceRepository {
  create(_medicalInsurance) {
    const medicalInsurance = MedicalInsurance.fromObject(_medicalInsurance)
    if (medicalInsurance.id) {
      throw newEntityAlreadyCreated('Medical Insurance allready created')
    }
    return knex(MEDICAL_INSURANCE)
      .insert({ ...medicalInsurance })
      .then(([id]) => id)
  }

  getAll() {
    return knex
      .select()
      .table(MEDICAL_INSURANCE)
      .then(response => response.map(medicalInsurance => MedicalInsurance.fromObject(medicalInsurance)))
  }

  async getAllWithPlans() {
    const medicalInsurances = await this.getAll()
    return Promise.all(medicalInsurances.map(async (medicalInsurance) => {
      const plans = await knex.select()
        .table(PLAN)
        .where(`${PLAN}.id_medical_insurance`, Number.parseInt(medicalInsurance.id, 10))
      medicalInsurance.plans = plans.map(plan => Plan.fromJson(plan))
      return medicalInsurance
    }))
  }

  getMedicalInsuranceByMedic(doctorId, datetime) {
    return knex
      .select()
      .table(MEDICAL_BOOKLET)
      .where(`${MEDICAL_BOOKLET}.id_doctor`, Number.parseInt(doctorId, 10))
      .andWhereRaw(`? between ${MEDICAL_BOOKLET}.from_date and IFNULL(${MEDICAL_BOOKLET}.to_date, ?)`, [dateTimeFormat.toMysqlString(datetime), dateTimeFormat.toMysqlString(datetime)])
      .leftJoin(MEDICAL_INSURANCE, `${MEDICAL_BOOKLET}.id_medical_insurance`, `${MEDICAL_INSURANCE}.id`)
      .then(response => response.map(medicalInsurance => MedicalInsurance.fromObject(medicalInsurance)))
  }

  getById(id) {
    return knex
      .select()
      .table(MEDICAL_INSURANCE)
      .where('id', id)
      .first()
      .then(res => MedicalInsurance.fromObject(res))
      .catch((error) => {
        logger.info('error getting by id medical insurance', error)
        throw newNotFoundError(`No medicalInsurance was found with id ${id}`)
      })
  }
}

module.exports = {
  MedicalInsuranceRepository: new MedicalInsuranceRepository()
}
