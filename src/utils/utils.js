const winston = require('winston')
const moment = require('moment')

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(info => `${info.level} ${info.timestamp}: ${info.message}`),
  ),
})

const formats = {
  dateTimeFormat: 'DD/MM/YYYY HH:mm',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm',
  mysqlDateFormat: 'YYYY-MM-DD',
  mysqlDateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
}

const formatter = {
  toString: (date, format) => {
    if (moment.isMoment(date)) {
      if (date.isValid()) {
        return date.format(format)
      }
      return null
    }
    return null
  },
  toDate: (date, format) => {
    if (moment.isMoment(date)) {
      return date
    }
    let newDate = moment(date, format)
    if (!newDate.isValid()) {
      newDate = moment(date)
      if (!newDate.isValid()) {
        newDate = null
      }
    }
    return newDate
  },
}

const dateTimeFormat = {
  toString: date => formatter.toString(date, formats.dateTimeFormat),
  toDate: date => formatter.toDate(date, formats.dateTimeFormat),
  toMysqlString: date => formatter.toString(date, formats.mysqlDateTimeFormat)
}
const dateFormat = {
  toString: date => formatter.toString(date, formats.dateFormat),
  toDate: date => formatter.toDate(date, formats.dateFormat),
  toMysqlString: date => formatter.toString(date, formats.mysqlDateFormat)
}


const generateNewSequencer = () => ({
  actualCount: 0,
  nextValue() {
    return ++this.actualCount
  },
})

module.exports = {
  logger,
  formats,
  dateFormat,
  dateTimeFormat,
  generateNewSequencer,
}
