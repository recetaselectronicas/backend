const express = require('express')
const { SessionRepository } = require('../repositories/sessionRepository')

const router = express.Router()

router.post('/', async (req, res) => {
  await SessionRepository.logout(req.token)
  return res.json()
})

module.exports = router
