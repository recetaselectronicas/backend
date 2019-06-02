const request = require('supertest')
const { init } = require('../../../src/init/initServer')
const { InstitutionRepository } = require('../../../src/repositories/institutionRepository')

const app = init()

describe('when do a get in /institutions', () => {
  describe('and the repository response ok', () => {
    const institutionsValue = [
      {
        id: 0,
        description: 'Hospital Italiano',
        address: 'La crujia'
      },
      {
        id: 1,
        description: 'Corporacion medica',
        address: 'Olazabal 210'
      }
    ]

    beforeAll(() => {
      InstitutionRepository.institutions = institutionsValue
    })

    it('return all available the institutions', () => {
      return request(app)
        .get('/institutions')
        .expect(200)
        .then(res => {
          const firstInstitution = res.body[0]
          expect(firstInstitution).toHaveProperty('id')
          expect(firstInstitution).toHaveProperty('description')
          expect(firstInstitution).toHaveProperty('address')
          expect(res.body).toEqual(institutionsValue)
        })
    })
  })

  describe('and the repository fails on search', () => {
    beforeAll(() => {
      InstitutionRepository.getAll = () => {
        throw {}
      }
    })

    it('respond with 500 ', () => {
      return request(app)
        .get('/institutions')
        .expect(500)
    })
  })
})
