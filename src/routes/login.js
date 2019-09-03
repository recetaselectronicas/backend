const express = require('express')
const { SessionRepository } = require('../repositories/sessionRepository')

const router = express.Router()

router.post('/', async (req, res, next) => {
  const { username, password, type } = req.body
  try {
    const session = await SessionRepository.login(type, username, password)
    return res.status(200).json({ token: session.toJson().token })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
