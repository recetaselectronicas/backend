/* eslint-disable no-unused-vars */
const { MongoClient, ObjectID } = require('mongodb')
const { logger } = require('../utils/utils')
const { config } = require('../config/config')

const { host } = config.conections.mongo
const { port } = config.conections.mongo
const url = `mongodb://${host}:${port}`
const prescriptionDBName = 'prescriptions'
const normsCollection = 'norms'
const sessionsCollection = 'sessions'


const mongoClient = {
  client: null,
  prescriptionDB: null,
  normsCollection: null,
  sessionsCollection: null,
  ObjectID
}

const initMongoDB = () => new Promise((resolve, reject) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, cli) => {
    if (err) {
      logger.error('Error while connecting to Mongodb server.', err)
      logger.error('If you make any call to NormRepository it will crash. Please resolve this.')
      return resolve()
    }
    mongoClient.prescriptionDB = cli.db(prescriptionDBName)
    mongoClient.normsCollection = mongoClient.prescriptionDB.collection(normsCollection)
    mongoClient.sessionsCollection = mongoClient.prescriptionDB.collection(sessionsCollection)
    mongoClient.client = cli
    const promises = []
    promises.push(mongoClient.sessionsCollection.deleteMany({}))
    if (config.executeBootstrap.mongo) {
      promises.push(mongoClient.normsCollection.deleteMany({}))
    }
    return Promise.all(promises)
      .then(() => {
        logger.info('MongoDB initialized OK')
        return resolve()
      })
      .catch((error) => {
        logger.error('Error while initializing mongo collections', error)
        return resolve()
      })
  })
})

const stopMongoDB = () => new Promise((resolve, reject) => {
  mongoClient.client.close()
  mongoClient.client = null
  mongoClient.prescriptionDB = null
  mongoClient.normsCollection = null
  return resolve()
})

module.exports = {
  initMongoDB,
  stopMongoDB,
  mongoClient
}