const request = require('supertest')
const { init } = require('../../../src/init/initServer')
const { InstitutionRepository } = require('../../../src/repositories/institutionRepository')
const { Institution } = require('../../../src/domain/institution')

const app = init()
app.locals.logger = { info: () => {}, error: () => {} }

describe('when do a get in /institutions', () => {
  describe('and the repository response ok', () => {
    const institutionsValue = [
      Institution.fromObject({
        id: 0,
        description: 'Hospital Italiano',
        address: 'La crujia',
      }),
      Institution.fromObject({
        id: 1,
        description: 'Corporacion medica',
        address: 'Olazabal 210',
      }),
    ]

    beforeAll(() => {
      InstitutionRepository.getAll = () => institutionsValue
    })

    it('return all available the institutions', () => request(app)
      .get('/institutions')
      .expect(200)
      .then((res) => {
        const firstInstitution = res.body[0]
        expect(firstInstitution).toHaveProperty('id')
        expect(firstInstitution).toHaveProperty('description')
        expect(firstInstitution).toHaveProperty('address')
        expect(res.body).toEqual(institutionsValue)
      }))
  })

  describe('and the repository fails on search', () => {
    beforeAll(() => {
      InstitutionRepository.getAll = () => {
        throw {}
      }
    })

    it('respond with 500 ', () => request(app)
      .get('/institutions')
      .expect(500))
  })
})
