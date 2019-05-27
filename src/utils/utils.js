const winston = require('winston')
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.level} ${info.timestamp}: ${info.message}`)
  )
})

const formats = {
  dateTimeFormat: 'DD/MM/YYYY HH:mm',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm'
}

module.exports = { 
  logger, 
  formats
}