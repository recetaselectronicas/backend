const { initMongoDB } = require('./mongodb')
const { generateData } = require('../bootstrap/bootstrap')

const init = async () => {
  await initMongoDB()
  await generateData()
}

module.exports = { init }
