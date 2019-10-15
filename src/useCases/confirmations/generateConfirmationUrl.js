
const host = 'http://localhost:8080'

// TODO: ver con FrontEnd como vamos a hacer este flujo
const generateConfirmationUrl = (token, type) => `${host}/users/${type}/confirmation?token=${token}`

module.exports = { generateConfirmationUrl }