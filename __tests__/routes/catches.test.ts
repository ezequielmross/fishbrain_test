process.env.NODE_ENV = 'test'
import request from 'supertest'
// import app from '../app'

// let appExpress: any

beforeAll(async () => {
  // appExpress = await app()
})

afterAll(async () => {
})

// Before each test, disable all logging so our test results are cleaner
beforeEach(() => {
  // jest.spyOn(console, 'debug').mockImplementation(() => { })
  jest.spyOn(console, 'log').mockImplementation(() => 0)
  jest.spyOn(console, 'warn').mockImplementation(() => 0)
  jest.spyOn(console, 'error').mockImplementation(() => 0)
})


jest.mock('bull', () => {
  return jest.fn().mockImplementation(() => {
    return {
      process: jest.fn().mockImplementation(() => {
        return {}
      }),
      add: jest.fn().mockImplementation(() => {
        return {}
      })
    }
  })
})

describe('Catches endpoint', () => {
  test('POST /catches - success', async () => {
    it.todo('valid request')
    it.todo('invalid request')
  })

  test('GET /catches - success', async () => {
    it.todo('valid request')
  })
})
