const array = require('lodash/array')
const moment = require('moment')
const { formats } = require('../../utils/utils')

const getMatchingValues = function (key, values) {
  return array.intersection(this.values.map(({ id }) => id), values)
}
module.exports = {
  id: {
    key: 'id',
  },
  status: {
    key: 'status',
    values: [],
    getMatchingValues,
  },
  institution: {
    key: 'institution',
    values: [],
    getMatchingValues,
  },
  medicalInsurance: {
    key: 'medicalInsurance',
    values: [],
    getMatchingValues,
  },
  affiliate: {
    key: 'affiliate',
    getMatchingValues: (key, id) => id,
  },
  doctor: {
    key: 'doctor',
    getMatchingValues: (key, id) => id,
  },
  pharmacist: {
    key: 'pharmacist',
    getMatchingValues: (key, id) => id,
  },
  medicine: {
    key: 'medicine',
    getMatchingValues: (key, id) => id,
  },
  issueDateRange: {
    keyFrom: 'fromIssueDate',
    keyTo: 'toIssueDate',
    getMatchingValues(key, value) {
      const formatedDate = moment(value, this.format)
      return formatedDate.isValid() && value
    },
    format: formats.dateTimeFormat,
  },
  soldDateRange: {
    keyFrom: 'fromSoldDate',
    keyTo: 'toSoldDate',
    format: formats.dateTimeFormat,
  },
  auditedDateRange: {
    keyFrom: 'fromAuditedDate',
    keyTo: 'toAuditedDate',
    format: formats.dateTimeFormat,
  },

  orders: {
    key: 'orderBy',
    getMatchingValues(key, value) {
      const keys = value.split('-')
      const orderKey = keys[0]
      const sortKey = keys[1]
      const seed = {}
      const order = Object.keys(this.values).reduce((value_, valueKey) => {
        let returnedValue = { ...value_ }
        const currentValue = this.values[valueKey]
        if (currentValue.key === orderKey) {
          const sortingCurrentValue = currentValue.sorting
          if (sortingCurrentValue.asc === sortKey || sortingCurrentValue.dsc === sortKey) {
            returnedValue = { orderKey: sortKey }
          }
        }
        return returnedValue
      }, seed)
      return order
    },
    values: {
      id: {
        key: 'id',
        sorting: {
          asc: 'asc',
        },
      },
      issuedDate: {
        key: 'issuedDate',
        sorting: {
          asc: 'asc',
          dsc: 'desc',
        },
      },
      soldDate: {
        key: 'soldDate',
        sorting: {
          asc: 'asc',
          dsc: 'desc',
        },
      },
      auditedDate: {
        key: 'audtitedDate',
        sorting: {
          asc: 'asc',
          dsc: 'desc',
        },
      },
    },
  },
}
