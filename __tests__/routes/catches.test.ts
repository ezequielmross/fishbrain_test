process.env.NODE_ENV = 'test'
import request from 'supertest'
import app from '../app'
import path from 'path'
import { createResizeImg, deleteResizeImg } from '../util'

let appExpress: any

beforeAll(async () => {
  appExpress = await app()
})

afterAll(async () => {
  await deleteResizeImg()
})

// Before each test, disable all logging so our test results are cleaner
beforeEach(() => {
  // jest.spyOn(console, 'debug').mockImplementation(() => { })
  jest.spyOn(console, 'log').mockImplementation(() => 0)
  jest.spyOn(console, 'warn').mockImplementation(() => 0)
  // jest.spyOn(console, 'error').mockImplementation(() => 0)
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
    const testCatch = {
      anglerName: 'Test - 1',
      species: 'fish',
      weight: 10,
      length: 10,
      latitude: 1000,
      longitude: -1000
    }
    const imgDist = path.join(__dirname, '../static/test_img.png')
    const res = await request(appExpress)
      .post('/catches/')
      .field('anglerName', testCatch.anglerName)
      .field('species', testCatch.species)
      .field('weight', testCatch.weight)
      .field('length', testCatch.length)
      .field('latitude', testCatch.latitude)
      .field('longitude', testCatch.longitude)
      .attach('img', imgDist)

    // No errors
    expect(res.error).toBeFalsy()
    // Same keys
    expect(res.body.anglerName).toBe(testCatch.anglerName)
    expect(res.body.species).toBe(testCatch.species)
    expect(res.body.weight).toBe(testCatch.weight)
    expect(res.body.length).toBe(testCatch.length)
    expect(res.body.latitude).toBe(testCatch.latitude)
    expect(res.body.longitude).toBe(testCatch.longitude)
    // New keys
    expect(res.body.id).toBeTruthy()
    expect(res.body.timestamp).toBeTruthy()
  })

  test('POST /catches - fail image required', async () => {
    const testCatch = {
      anglerName: 'Test - 2',
      species: 'fish',
      weight: 10,
      length: 10,
      latitude: 1000,
      longitude: -1000
    }
    const res = await request(appExpress)
      .post('/catches/')
      .field('anglerName', testCatch.anglerName)
      .field('species', testCatch.species)
      .field('weight', testCatch.weight)
      .field('length', testCatch.length)
      .field('latitude', testCatch.latitude)
      .field('longitude', testCatch.longitude)

    expect(res.status).toEqual(400)
    expect(res.error).toBeTruthy()
  })

  test('POST /catches - fail missing some attribute', async () => {
    const testCatch = {
      anglerName: 'Test - 4',
      species: 'fish',
      weight: 10,
      length: 10,
      latitude: 1000,
      longitude: -1000
    }
    const imgDist = path.join(__dirname, '../static/test_img.png')
    const res = await request(appExpress)
      .post('/catches/')
      .field('species', testCatch.species)
      .field('weight', testCatch.weight)
      .field('length', testCatch.length)
      .field('latitude', testCatch.latitude)
      .field('longitude', testCatch.longitude)
      .attach('img', imgDist)

    expect(res.status).toEqual(400)
    expect(res.error).toBeTruthy()
  })

  test('GET /catches - success', async () => {
    const res = await request(appExpress)
      .get('/catches/')

    expect(res.error).toBeFalsy()
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('GET /resized-photo - success', async () => {
    await createResizeImg()

    const res = await request(appExpress)
      .get(`/catches/test_img/resized-photo`)

    expect(res.error).toBeFalsy()
    expect(res.body).toBeTruthy()
  })
})
