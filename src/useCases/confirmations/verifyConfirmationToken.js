const jwt = require('jsonwebtoken')
const { codes } = require('../../codes/commonCodes')
const errors = require('../../utils/errors')
const { logger } = require('../../utils/utils')
const { defaults } = require('../../config/defaults')

const { privateKey } = defaults.confirmations

const verifyConfirmationToken = (token, type) => {
  try {
    return jwt.verify(token, privateKey, { subject: codes.COMPANY.NAME, audience: type })
  } catch (e) {
    logger.error('error while verifing token', e.stack || e.toString())
    throw errors.newForbiddenResourceException('invalid token given')
  }
}

module.exports = { verifyConfirmationToken }