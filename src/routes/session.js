const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

router.post('/login', bodyParser.json(), (req, res) => {
    //TODO: hacer el login
    return res.json(req.body)
})

module.exports = router