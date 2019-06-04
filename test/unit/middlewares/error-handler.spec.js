const errorHandler = require('../../../src/middlewares/error-handler')
const errors = require('../../../src/utils/errors')

describe('when err passed to middleware errorHandler', () => {
    let err = null
    let req = null
    let res = null
    let next = null

    beforeEach(() => {
        err = errors.newBadRequestError()
        req = {app: {locals:{logger:{info: () => {}}}}}
        res = {
            json: jest.fn((json) => {}),
            send: jest.fn((data) => {}),
            status: jest.fn((status) => {return res})
        }
        next = jest.fn((error) => {})
    })

    describe('and res.headersSent is true', () => {
        beforeEach(() => {
            res.headersSent = true
        })
        it('calls next handler with err as argument', () => {
            errorHandler(err, req, res, next)
            expect(next.mock.calls.length).toBe(1)
            expect(next.mock.calls[0][0]).toEqual(err)
        })

        it('doesn´t call res.json', () => {
            errorHandler(err, req, res, next)
            expect(res.json.mock.calls.length).toBe(0)
        })
    })

    describe('and res.headersSent is false', () => {
        beforeEach(() => {
            res.headersSent = false
        })
        it('doesn`t call next handler', () => {
            errorHandler(err, req, res, next)
            expect(next.mock.calls.length).toBe(0)
        })

        it('calls res.status', () => {
            errorHandler(err, req, res, next)
            expect(res.status.mock.calls.length).toBe(1)
            expect(res.status.mock.calls[0][0]).toBeTruthy()
        })

        it('calls res.json', () => {
            errorHandler(err, req, res, next)
            expect(res.json.mock.calls.length).toBe(1)
            expect(res.json.mock.calls[0][0]).toBeTruthy()
        })
    })
})