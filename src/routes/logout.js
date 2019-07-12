const express = require('express')
const { SessionRepository } = require('../repositories/sessionRepository')

const router = express.Router()

router.post('/', async (req, res, next) => {
  await SessionRepository.logout(req.token)
  return res.json()
})

module.exports = router
