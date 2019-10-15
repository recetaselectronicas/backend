const jwt = require('jsonwebtoken')
const { codes } = require('../../codes/commonCodes')

const privateKey = `${codes.COMPANY.NAME}_confirmation_module`
const expirationTime = 60

const generateConfirmationToken = (id, userName, type) => {
  const payload = {
    id,
    userName,
    type
  }
  return jwt.sign(payload, privateKey, { expiresIn: expirationTime * 60, subject: codes.COMPANY.NAME, audience: type })
}

module.exports = { generateConfirmationToken }