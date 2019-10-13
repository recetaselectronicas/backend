/* eslint-disable no-param-reassign */
const lang = require('lodash/lang')
const { AuthorizationVerifier } = require('../authorization/authorizationVerifier')

const issueVerifier = async (req, res, next) => {
  const { logger } = req.app.locals
  const { identifiedUser } = req
  const { body } = req
  const authorizationToken = req.header('x-authorization-token')
  const verificationToken = req.header('x-verification-token')
  try {
    await AuthorizationVerifier.issuePrescription(authorizationToken, verificationToken, body, identifiedUser)
    return next()
  } catch (e) {
    return next(e)
  }
}

const receiveVerifier = async (req, res, next) => {
  const { logger } = req.app.locals
  const { identifiedUser } = req
  const { body } = req
  const authorizationToken = req.header('x-authorization-token')
  const verificationToken = req.header('x-verification-token')
  try {
    if (body.status === 'RECEIVE') {
      const prescription = {
        id: +req.params.id,
        items: lang.cloneDeep(body.data.items)
      }
      prescription.items.forEach((item) => { item.medicine = { id: item.medicine.id } })
      await AuthorizationVerifier.receivePrescription(authorizationToken, verificationToken, prescription, identifiedUser)
    }
    return next()
  } catch (e) {
    return next(e)
  }
}

module.exports = {
  issueVerifier,
  receiveVerifier
}