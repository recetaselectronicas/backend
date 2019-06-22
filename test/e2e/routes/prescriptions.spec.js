const request = require('supertest')
const { init } = require('../../../src/init/initServer')
const { InstitutionRepository } = require('../../../src/repositories/institutionRepository')

const app = init()
app.locals.logger = { info: () => {}, error: () => {} }

describe('when do a get in /prescriptions', () => {
  const filtersValue = {
    id: {
      key: 'id'
    },
    status: {
      key: 'status',
      values: [
        {
          id: 'CONFIRMED',
          value: 'CONFIRMADA'
        },
        {
          id: 'ISSUED',
          value: 'EMITIDA'
        },
        {
          id: 'EXPIRED',
          value: 'VENCIDA'
        },
        {
          id: 'RECEIVED',
          value: 'RECEPCIONADA'
        },
        {
          id: 'PARTIALLY_RECEIVED',
          value: 'PARCIALMENTE_RECEPCIONADA'
        },
        {
          id: 'CANCELLED',
          value: 'CANCELADA'
        }
      ]
    },
    issueDateRange: {
      keyFrom: 'fromIssueDate',
      keyTo: 'toIssueDate',
      format: 'DD/MM/YYYY HH:mm'
    },
    soldDateRange: {
      keyFrom: 'fromSoldDate',
      keyTo: 'toSoldDate',
      format: 'DD/MM/YYYY HH:mm'
    },
    institution: {
      key: 'institution',
      values: [
        {
          id: 0,
          value: 'Instucion de mentira'
        }
      ]
    },
    medicalInsurance: {
      key: 'medicalInsurance',
      values: []
    },
    medicine: {
      key: 'medicine'
    }
  }
  const ordersValue = {
    key: 'orderBy',
    values: {
      id: {
        key: 'id',
        sorting: {
          asc: 'asc'
        }
      },
      issuedDate: {
        key: 'issuedDate',
        sorting: {
          asc: 'asc',
          dsc: 'desc'
        }
      },
      soldDate: {
        key: 'soldDate',
        sorting: {
          asc: 'asc',
          dsc: 'desc'
        }
      }
    }
  }
  beforeAll(() => {
    InstitutionRepository.getAll = () => [
      {
        id: 0,
        description: 'Instucion de mentira'
      }
    ]
  })
  it('respond with correct filters', () => request(app)
    .get('/prescriptions')
    .expect(200)
    .then((res) => {
      expect(res.body.filters).toEqual(filtersValue)
      expect(res.body.orders).toEqual(ordersValue)
    }))
})
