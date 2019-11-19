const express = require('express')

const router = express.Router()
const { SessionRepository } = require('../repositories/sessionRepository')
const { linkUpUsers } = require('../useCases/linkUps/linkUpUsers')
const { unlinkUsers } = require('../useCases/unliks/unlinkUsers')
const { getUserLinkUpRequests } = require('../useCases/linkUps/getUserLinkUpRequests')
const { updateUserLinkUpRequest } = require('../useCases/linkUps/updateUserLinkUpRequest')
const { getUserDataFields } = require('../useCases/userData/getUserDataFields')
const { updateUserDataFields } = require('../useCases/userData/updateUserDataFields')

router.get('/menu', async (req, res) => {
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

router.get('/authentication/default', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const defaultAuthentication = await SessionRepository.getUserDefaultAuthentication(identifiedUser.type, identifiedUser.id)
    return res.json(defaultAuthentication)
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

router.post('/authentication/two-factor/generate', async (req, res, next) => {
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
    await SessionRepository.checkAndGetTwoFactorAuthentication(identifiedUser.type, authentication, true)
    return res.status(201).json()
  } catch (e) {
    return next(e)
  }
})

router.get('/data', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const user = await identifiedUser.getData()
    return res.status(200).json(user)
  } catch (e) {
    return next(e)
  }
})

router.get('/data/fields', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const userData = await getUserDataFields(identifiedUser)
    return res.status(200).json(userData)
  } catch (e) {
    return next(e)
  }
})

router.put('/data/fields', async (req, res, next) => {
  const { identifiedUser } = req
  const { body } = req
  try {
    const userData = await updateUserDataFields(identifiedUser, body)
    if (userData.hasErrors) {
      return res.status(400).json(userData.fields)
    }
    return res.status(200).json(userData.fields)
  } catch (e) {
    return next(e)
  }
})

router.post('/link-up', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    await linkUpUsers(identifiedUser, req.body)
    return res.json()
  } catch (e) {
    return next(e)
  }
})

router.get('/link-up/requests', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const linkUpRequests = await getUserLinkUpRequests(identifiedUser)
    return res.json(linkUpRequests)
  } catch (e) {
    return next(e)
  }
})

router.put('/link-up/requests/:id', async (req, res, next) => {
  const { identifiedUser } = req
  const { body } = req
  body.id = req.params.id
  try {
    await updateUserLinkUpRequest(identifiedUser, body)
    return res.json()
  } catch (e) {
    return next(e)
  }
})

router.post('/unlink', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    await unlinkUsers(identifiedUser, req.body)
    return res.json()
  } catch (e) {
    return next(e)
  }
})

module.exports = router
