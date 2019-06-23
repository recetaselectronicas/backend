/* eslint-disable no-unused-vars */
const { MongoClient, ObjectID } = require('mongodb')
const { logger } = require('../utils/utils')
const { config } = require('../config/config')

const { host } = config.conections.mongo
const { port } = config.conections.mongo
const url = `mongodb://${host}:${port}`
const prescriptionDBName = 'prescriptions'


const mongoClient = {
  client: null,
  prescriptionDB: null,
  normsCollection: null,
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
    mongoClient.normsCollection = mongoClient.prescriptionDB.collection('norms')
    mongoClient.client = cli
    if (config.executeBootstrap.mongo) {
      mongoClient.normsCollection.deleteMany({})
        .then(() => {
          logger.info('MongoDB initialized OK')
          return resolve()
        })
    } else {
      logger.info('MongoDB initialized OK')
      return resolve()
    }
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