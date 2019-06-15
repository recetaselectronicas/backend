const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

router.post('/', bodyParser.json(), (req, res) =>
// TODO: hacer el login
  res.json(req.body))

module.exports = router
