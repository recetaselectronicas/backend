const express = require('express')

const router = express.Router()
const { NormRepository } = require('../repositories/normRepository')
const { validateNorm, normalizeNorm } = require('../norms/norm')
const errors = require('../utils/errors')
const { RULE_METADATA } = require('../norms/metadata/generate/generateMetadata')
const permissions = require('../permissions/identifiedUser')

// Falta el middleware de seguridad para saber de que obra social
// es la norma que se quiere ver o crear


const secureMiddleware = (req, res, next) => {
  req.identifiedUser = permissions.getIdentifiedMedicalInsurance(1)
  return next()
}

// Agregar la validacion de integridad de la norma
// Probar un armado con una receta dummy
router.post('/', secureMiddleware, async (req, res, next) => {
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
      console.log(e)
      return next(errors.newBadRequestError('Error while saving norm.', { error: e.toString() }))
    }
    return next(e)
  }
})

router.get('/actual', secureMiddleware, async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const norm = await NormRepository.getCurrentNormByMedicalInsuranceId(identifiedUser.id)
    return res.json(norm)
  } catch (e) {
    return next(e)
  }
})

router.get('/definition', (req, res, next) => res.json(RULE_METADATA))

// Este endpoint seguro va a cambiar. Habría que pensar como es mejor
// para el metodo rest la consulta de la norma vigente de la obra social
router.get('/:id', (req, res, next) => NormRepository.getById(req.params.id)
  .then(norm => res.json(norm))
  .catch(next))

router.get('/', (req, res, next) => NormRepository.getAll()
  .then(norms => res.json(norms))
  .catch(next))

module.exports = router