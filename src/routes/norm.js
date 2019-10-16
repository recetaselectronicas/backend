const express = require('express')

const router = express.Router()
const { NormRepository } = require('../repositories/normRepository')
const { validateNorm, normalizeNorm } = require('../norms/norm')
const errors = require('../utils/errors')
const { RULE_METADATA } = require('../norms/metadata/generate/generateMetadata')

router.post('/', async (req, res, next) => {
  const norm = req.body
  const { identifiedUser } = req
  try {
    validateNorm(norm)
    const normalizedNorm = normalizeNorm(norm)
    normalizedNorm.medicalInsurance = identifiedUser.id
    const createdNorm = await NormRepository.create(normalizedNorm)
    return res.json(createdNorm)
  } catch (e) {
    if (!errors.isBusinessError(e) || !e.status) {
      return next(errors.newBadRequestError('Error while saving norm.', { error: e.toString() }))
    }
    return next(e)
  }
})

router.get('/actual', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const norm = await NormRepository.getCurrentNormByMedicalInsuranceId(identifiedUser.id)
    return res.json(norm)
  } catch (e) {
    return next(e)
  }
})

router.get('/definition', (req, res) => res.json(RULE_METADATA))

// Este endpoint seguro va a cambiar. Habría que pensar como es mejor
// para el metodo rest la consulta de la norma vigente de la obra social
router.get('/:id', (req, res, next) => NormRepository.getById(req.params.id)
  .then(norm => res.json(norm))
  .catch(next))

router.get('/', (req, res, next) => NormRepository.getAll()
  .then(norms => res.json(norms))
  .catch(next))

module.exports = router