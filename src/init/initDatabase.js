const { initMongoDB } = require('./mongodb')
const { generateData } = require('../bootstrap/bootstrap')
const { generateNormsData } = require('../bootstrap/normBootstrap')

const init = async () => {
  await initMongoDB()
  // await generateData()
}

module.exports = { init }
