const { mongoClient } = require('../init/mongodb')
const { MedicalInsuranceRepository } = require('./medicalInsuranceRepository')

class NormRepository {
  async create(norm) {
    const { ops } = await mongoClient.normsCollection.insertOne(norm)
    const createdNorm = ops[0]
    // await MedicalInsuranceRepository.updateCurrentNorm(createdNorm._id)
    return createdNorm
  }

  async getById(id) {
    return mongoClient.normsCollection.findOne({ _id: new mongoClient.ObjectID(id) })
  }

  async getAll() {
    return mongoClient.normsCollection.find({}).toArray()
  }
}

module.exports = { NormRepository: new NormRepository() }