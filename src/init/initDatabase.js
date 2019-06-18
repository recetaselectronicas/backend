const { generateData } = require('../bootstrap/bootstrap')

const init = async () => {
  await generateData()
}

module.exports = { init }
