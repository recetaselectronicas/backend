const { logger } = require('../utils/utils')
const { config } = require('../config/config')
const knex = require('./knexConnection')

const initMysqlDB = async () => {
  logger.info('Mysql initialized OK')
  if (config.executeBootstrap.mysql) {
    try {
      await knex.migrate.rollback()
      await knex.migrate.latest()
      await knex.seed.run()
      logger.info('Mysql`s bootstrap ran OK')
    } catch (error) {
      logger.error('Error while running Mysql`s bootstrap ', error)
    }
  } else {
    logger.warn('Mysql`s bootstrap not executed. If you want to execute it, go to config.js and set executeBootstrap.mysql to true')
  }
}

module.exports = { initMysqlDB }