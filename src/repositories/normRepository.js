/* eslint-disable no-underscore-dangle */
const { mongoClient } = require('../init/mongodb')
const knex = require('../init/knexConnection')
const { NORM } = require('./tablesNames')
const errors = require('../utils/errors')

class NormRepository {
  async create(norm) {
    const { ops } = await mongoClient.normsCollection.insertOne(norm)
    const createdNorm = ops[0]
    await this.updateCurrentNormId(createdNorm.medicalInsurance, createdNorm._id)
    return createdNorm
  }

  async getById(id) {
    const norm = await mongoClient.normsCollection.findOne({ _id: new mongoClient.ObjectID(id) })
    if (!norm) {
      throw errors.newNotFoundError('Norm not found')
    }
    return norm
  }

  async getAll() {
    return mongoClient.normsCollection.find({}).toArray()
  }

  async getCurrentNormByMedicalInsuranceId(medicalInsuranceId) {
    const [norm] = await knex
      .select()
      .table(NORM)
      .where(`${NORM}.id_medical_insurance`, Number.parseInt(medicalInsuranceId, 10))
    if (norm) {
      const { idNorm: normId } = norm
      return this.getById(normId)
    }
    throw errors.newNotFoundError('No norm found for this medical ensurance')
  }

  async updateCurrentNormId(medicalInsuranceId, normId) {
    const quantity = await knex(NORM)
      .where('id_medical_insurance', Number.parseInt(medicalInsuranceId, 10))
      .update({
        id_norm: normId.toString()
      })
    if (!quantity) {
      await knex(NORM)
        .insert({
          id_norm: normId.toString(),
          id_medical_insurance: Number.parseInt(medicalInsuranceId, 10)
        })
    }
  }
}

module.exports = { NormRepository: new NormRepository() }