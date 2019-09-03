const { initMysqlDB } = require('./mysqldb')
const { initMongoDB } = require('./mongodb')
const { generateNormsData } = require('../bootstrap/normBootstrap')

const init = async () => {
  await initMysqlDB()
  await initMongoDB()
  await generateNormsData()
}

module.exports = { init }
