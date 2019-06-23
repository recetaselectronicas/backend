const { initMongoDB } = require('./mongodb')
const { generateNormsData } = require('../bootstrap/normBootstrap')

const init = async () => {
  await initMongoDB()
  await generateNormsData()
}

module.exports = { init }
