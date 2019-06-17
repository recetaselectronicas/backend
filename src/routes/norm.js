const express = require('express')

const router = express.Router()
const { NormRepository } = require('../repositories/normRepository')

// Falta el middleware de seguridad para saber de que obra social
// es la norma que se quiere ver o crear

// Agregar la validacion de integridad de la norma
// Probar un armado con una receta dummy
router.post('/', (req, res, next) => NormRepository.create(req.body)
  .then(createdNorm => res.json(createdNorm))
  .catch(next))

// Este endpoint seguro va a cambiar. Habría que pensar como es mejor
// para el metodo rest la consulta de la norma vigente de la obra social
router.get('/:id', (req, res, next) => NormRepository.getById(req.params.id)
  .then(norm => res.json(norm))
  .catch(next))

router.get('/', (req, res, next) => NormRepository.getAll()
  .then(norms => res.json(norms))
  .catch(next))

module.exports = router