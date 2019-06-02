const request = require('supertest')
const { init } = require('../../../src/init/initServer')
const app = init()

describe('when do a get at /ping', () => {
  it('respond pong', () => {
    return request(app)
      .get('/ping')
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual('pong')
      })
  })
})
