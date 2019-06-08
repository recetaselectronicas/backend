const express = require('express')
const router = express.Router()
const { AffiliateRepository } = require('../repositories/affiliateRepository')

router.get('/', async (req, res, next) => {
    const query = req.query
    try {
        const affiliates = await AffiliateRepository.getByQuery(query)
        return res.status(200).send(affiliates)
    } catch (error) {
        return next(error)
    }
})

module.exports = router