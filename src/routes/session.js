const express = require('express')

const router = express.Router()
const { SessionRepository } = require('../repositories/sessionRepository')

router.get('/menu', async (req, res, next) => {
  const { identifiedUser } = req
  return res.status(200).json(identifiedUser.getMenu())
})

router.get('/configuration', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const configuration = await SessionRepository.getUserConfiguration(identifiedUser.type, identifiedUser.id)
    return res.json(configuration)
  } catch (e) {
    return next(e)
  }
})

router.get('/authentication/two-factor', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const secret = await SessionRepository.generateAndGetTwoFactorSecret(identifiedUser.type, identifiedUser.username)
    return res.json({ qrData: secret.otpauth_url })
  } catch (e) {
    return next(e)
  }
})

router.post('/authentication/two-factor', async (req, res, next) => {
  const { identifiedUser } = req
  const { authentication } = req.body
  try {
    authentication.id = identifiedUser.id
    const entity = await SessionRepository.checkAndGetTwoFactorAuthentication(identifiedUser.type, authentication, true)
    return res.status(201).json()
  } catch (e) {
    return next(e)
  }
})

module.exports = router
