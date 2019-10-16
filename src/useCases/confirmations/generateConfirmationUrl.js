const { defaults } = require('../../config/defaults')

const { host } = defaults.confirmations.url

// TODO: ver con FrontEnd como vamos a hacer este flujo
const generateConfirmationUrl = (token, type) => `${host}/users/${type}/confirmation?token=${token}`

module.exports = { generateConfirmationUrl }