const lang = require('lodash/lang')
const { NormRepository } = require('../repositories/normRepository')
const { logger } = require('../utils/utils')
const { config } = require('../config/config')
const { normalizeNorm } = require('../norms/norm')

const genericNorm = {
  description: 'Norma para entidad',
  type: 'EXECUTABLE',
  name: 'NORM',
  states: [
    {
      type: 'EXECUTABLE',
      name: 'NORM_STATE',
      state: 'ISSUED',
      value: 'EMITIDA',
      description: 'EMITIDA',
      rules: []
    },
    {
      type: 'EXECUTABLE',
      name: 'NORM_STATE',
      state: 'PARTIALLY_RECEIVED',
      value: 'PARCIALMENTE RECEPCIONADA',
      description: 'PARCIALMENTE RECEPCIONADA',
      rules: []
    },
    {
      type: 'EXECUTABLE',
      name: 'NORM_STATE',
      state: 'RECEIVED',
      value: 'RECEPCIONADA',
      description: 'RECEPCIONADA',
      rules: []
    },
    {
      type: 'EXECUTABLE',
      name: 'NORM_STATE',
      state: 'AUDITED',
      value: 'AUDITADA',
      description: 'AUDITADA',
      rules: []
    }
  ]
}

let norm1 = lang.cloneDeep(genericNorm)
let norm2 = lang.cloneDeep(genericNorm)
let norm3 = lang.cloneDeep(genericNorm)

norm1.medicalInsurance = 1
norm1.ttl = 30
norm2.medicalInsurance = 2
norm2.ttl = 30
norm3.medicalInsurance = 3
norm3.ttl = 30

module.exports = {
  generateNormsData: async () => {
    if (config.executeBootstrap.mongo) {
      norm1 = normalizeNorm(norm1)
      norm2 = normalizeNorm(norm2)
      norm3 = normalizeNorm(norm3)
      await NormRepository.create(norm1)
      await NormRepository.create(norm2)
      await NormRepository.create(norm3)
      logger.info('All norms generated ok')
    } else {
      logger.info('Norm`s bootstrap not executed. If you want to execute it, go to config.js and set executeBootstrap.mongo to true')
    }
  }
}