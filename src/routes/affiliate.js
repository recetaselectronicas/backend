const express = require('express')
const moment = require('moment')

const router = express.Router()
const { AffiliateRepository } = require('../repositories/affiliateRepository')
const { SessionRepository } = require('../repositories/sessionRepository')
const { userTypes } = require('../permissions/identifiedUser')

router.get('/', async (req, res, next) => {
  const { query } = req
  query.datetime = moment()
  try {
    const affiliates = await AffiliateRepository.getByQuery(query)
    return res.status(200).send(affiliates.map(affiliate => affiliate.toRecudeObject()))
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const affiliate = await AffiliateRepository.getById(id)
    return res.json(affiliate.toPlainObject())
  } catch (e) {
    return next(e)
  }
})

router.get('/:id/authentication/default', async (req, res, next) => {
  const { id } = req.params
  try {
    const affiliate = await AffiliateRepository.getById(id)
    const defaultAuthentication = await SessionRepository.getUserDefaultAuthentication(userTypes.AFFILIATE, affiliate.idPatient)
    return res.json(defaultAuthentication)
  } catch (e) {
    return next(e)
  }
})

module.exports = router
