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

module.exports = router
