const express = require('express')

const router = express.Router()
const { createUser } = require('../useCases/creations/createUser')
const { verifyUser } = require('../useCases/creations/verifyUser')

router.post('/:type', async (req, res, next) => {
  const { type } = req.params
  const user = req.body
  try {
    await createUser(type, user)
    return res.json({ status: 'ok' })
  } catch (e) {
    return next(e)
  }
})

router.post('/:type/confirmation', async (req, res, next) => {
  const { type } = req.params
  const { token } = req.query
  try {
    await verifyUser(type, token)
    return res.json({ status: 'ok' })
  } catch (e) {
    return next(e)
  }
})

module.exports = router
