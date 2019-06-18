const express = require('express')

const router = express.Router()
const { NormRepository } = require('../repositories/normRepository')
const { validateNorm } = require('../norms/norm')
const errors = require('../utils/errors')
const { RULE_METADATA } = require('../norms/metadata/generate/generateMetadata')

// Falta el middleware de seguridad para saber de que obra social
// es la norma que se quiere ver o crear

// Agregar la validacion de integridad de la norma
// Probar un armado con una receta dummy
router.post('/', async (req, res, next) => {
  const norm = req.body
  try {
    validateNorm(norm)
    const createdNorm = await NormRepository.create(norm)
    return res.json(createdNorm)
  } catch (e) {
    if (!errors.isBusinessError(e) || !e.status) {
      return next(errors.newBadRequestError('Error while saving norm.', { error: e.toString() }))
    }
    return next(e)
  }
})

router.get('/definition', (req, res, next) => {
  return res.json(RULE_METADATA)
})

// Este endpoint seguro va a cambiar. Habría que pensar como es mejor
// para el metodo rest la consulta de la norma vigente de la obra social
router.get('/:id', (req, res, next) => NormRepository.getById(req.params.id)
  .then(norm => res.json(norm))
  .catch(next))

router.get('/', (req, res, next) => NormRepository.getAll()
  .then(norms => res.json(norms))
  .catch(next))


module.exports = router