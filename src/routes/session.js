const express = require('express')
const bodyParser = require('body-parser')
const usersLogin = require('../permissions/usersLogin')

const router = express.Router()

router.post('/', bodyParser.json(), async (req, res, next) => {
  const { username, password, type } = req.body
  try {
    const entity = await usersLogin[type].login(username, password)
    return res.status(200).json({ id: entity.id })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
