const winston = require('winston')
const moment = require('moment')
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

const dateFormat = {
  toString: (date) => {
    if (moment.isMoment(date)) {
      if (date.isValid()) {
        return date.format(formats.dateFormat)
      }
      return null
    }
    return null
  },
  toDate: (date) => {
    if (moment.isMoment(date)) {
      return date
    } else {
      date = moment(date, formats.dateFormat)
      if (!date.isValid()) {
        date = null
      }
      return date
    }
  }
}

const dateTimeFormat = {
  toString: (date) => {
    if (moment.isMoment(date)) {
      if (date.isValid()) {
        return date.format(formats.dateTimeFormat)
      }
      return null
    }
    return null
  },
  toDate: (date) => {
    if (moment.isMoment(date)) {
      return date
    } else {
      date = moment(date, formats.dateTimeFormat)
      if (!date.isValid()) {
        date = null
      }
      return date
    }
  }
}

module.exports = {
  logger,
  formats,
  dateFormat,
  dateTimeFormat
}