const express = require('express')

const router = express.Router()

router.get('/menu', async (req, res, next) => {
  const { identifiedUser } = req
  return res.status(200).json(identifiedUser.getMenu())
})

module.exports = router
