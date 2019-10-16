const jwt = require('jsonwebtoken')
const { codes } = require('../../codes/commonCodes')
const { defaults } = require('../../config/defaults')

const { privateKey } = defaults.confirmations
const expirationTime = defaults.confirmations.token.ttl

const generateConfirmationToken = (id, userName, type) => {
  const payload = {
    id,
    userName,
    type
  }
  return jwt.sign(payload, privateKey, { expiresIn: expirationTime, subject: codes.COMPANY.NAME, audience: type })
}

module.exports = { generateConfirmationToken }