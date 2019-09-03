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

router.put('/configuration', async (req, res, next) => {
  const { identifiedUser } = req
  const { body } = req
  try {
    await SessionRepository.updateUserConfiguration(identifiedUser.type, identifiedUser.id, body)
    return res.json()
  } catch (e) {
    return next(e)
  }
})

router.put('/authentication/user-pass', async (req, res, next) => {
  const { identifiedUser } = req
  const { body } = req
  try {
    await SessionRepository.updatePassword(identifiedUser.type, identifiedUser, body)
    return res.json()
  } catch (e) {
    return next(e)
  }
})

router.get('/authentication/two-factor', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const secret = await SessionRepository.generateAndGetTwoFactorSecret(identifiedUser.type, identifiedUser)
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

router.get('/data', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const user = await identifiedUser.getData()
    return res.status(200).json(user.toPlainObject())
  } catch (e) {
    return next(e)
  }
})

module.exports = router
