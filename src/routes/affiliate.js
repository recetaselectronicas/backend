const express = require('express')

const router = express.Router()
const { AffiliateRepository } = require('../repositories/affiliateRepository')

router.get('/', async (req, res, next) => {
  const { query } = req
  try {
    const affiliates = await AffiliateRepository.getByQuery(query)
    return res.status(200).send(affiliates.map(affiliate => affiliate.toPlainObject()))
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

module.exports = router
