const express = require('express')

const router = express.Router()

router.get('/menu', async (req, res, next) => {
  const { identifiedUser } = req
  return res.status(200).json(identifiedUser.getMenu())
})

router.get('/data', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const user = await identifiedUser.getData()
    return res.status(200).json(user.toPlainObject())
  } catch (e) {
    next(e)
  }
})

module.exports = router
