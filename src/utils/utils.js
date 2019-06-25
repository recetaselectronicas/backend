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
}

const formatter = {
  toString: (date, formatter) => {
    if (moment.isMoment(date)) {
      if (date.isValid()) {
        return date.format(formatter)
      }
      return null
    }
    return null
  },
  toDate: (date, formatter) => {
    if (moment.isMoment(date)) {
      return date
    }
    date = moment(date, formatter)
    if (!date.isValid()) {
      date = null
    }
    return date
  },
}

const dateTimeFormat = {
  toString: date => formatter.toString(date, formats.dateTimeFormat),
  toDate: date => formatter.toDate(date, formats.dateTimeFormat),
}
const dateFormat = {
  toString: date => formatter.toString(date, formats.dateFormat),
  toDate: date => formatter.toDate(date, formats.dateFormat),
}


const generateNewSequencer = () => ({
  actualCount: 0,
  nextValue() {
    return ++this.actualCount
  },
})

const waitAll = promises => promises.map(promise => promise
  .catch(err => ({ result: 'error', res: err }))
  .then(res => ({ result: 'ok', res })))

module.exports = {
  logger,
  formats,
  dateFormat,
  dateTimeFormat,
  generateNewSequencer,
  waitAll
}
