import request from 'supertest'
import app from '../app'

let appExpress: any

beforeAll(async () => {
  appExpress = await app()
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
    const res = await request(appExpress)
      .post('/catches/')
      .send({
        anglerName: 'TEST',
        species: 'fish',
        weight: 10,
        length: 10,
        latitude: 1000,
        longitude: -1000
      })

    expect(res.status).toEqual(200)
    expect(res.body).toEqual(200)
    // expect(res.body?.devices.length).toEqual(3)
    // expect(res.body?.devices).toEqual(
    //   expect.arrayContaining(fakeDevices.map(d => ({ serialNumber: d.thingName, type: d.thingTypeName })))
    // )
    // expect(res.body?.nextToken).toEqual('test_1')
    // expect(res.body?.totalCount).toEqual(3)
  })

  test('GET /catches - success', async () => {
    const res = await request(appExpress).get('/catches/')

    expect(res.status).toEqual(200)
    expect(res.body.length).toBeGreaterThan(0)
    // expect(res.body?.devices.length).toEqual(3)
    // expect(res.body?.devices).toEqual(
    //   expect.arrayContaining(fakeDevices.map(d => ({ serialNumber: d.thingName, type: d.thingTypeName })))
    // )
    // expect(res.body?.nextToken).toEqual('test_1')
    // expect(res.body?.totalCount).toEqual(3)
  })

  // test('GET /devices - success maxResults', async () => {
  //   const res = await request(appExpress)
  //     .get('/restful/devices/')
  //     .query({ nextToken: 'test_2', maxResults: 1 })
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)

  //   expect(res.statusCode).toEqual(200)
  //   expect(res.body?.devices.length).toEqual(1)
  //   expect(res.body?.devices?.[0].serialNumber).toEqual(fakeDevices[0].thingName)
  //   expect(res.body?.devices?.[0].type).toEqual(fakeDevices[0].thingTypeName)
  //   expect(res.body?.nextToken).toEqual('test_2')
  //   expect(res.body?.totalCount).toEqual(3)
  // })


  // test('GET /devices/ - invalid request', async () => {
  //   const res = await request(appExpress)
  //     .get('/restful/devices/')
  //     .query({ nextToken: 10, maxResults: '123' })
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)

  //   expect(res.statusCode).toEqual(400)
  // })

  // test('GET /devices/:deviceType - success', async () => {
  //   const res = await request(appExpress)
  //     .get('/restful/devices/UVA20')
  //     .query({ nextToken: 'test_3' })
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)

  //   const expectedDevices = fakeDevices
  //     .filter(d => d.thingTypeName === 'UVA20')
  //     .map(d => ({ serialNumber: d.thingName, type: d.thingTypeName }))

  //   expect(res.statusCode).toEqual(200)
  //   expect(res.body?.devices.length).toEqual(expectedDevices.length)
  //   expect(res.body?.devices).toEqual(
  //     expect.arrayContaining(expectedDevices)
  //   )
  //   expect(res.body?.nextToken).toEqual('test_3')
  //   expect(res.body?.totalCount).toEqual(3)
  // })

  // test('GET /devices/:deviceType - success maxResults', async () => {
  //   const res = await request(appExpress)
  //     .get('/restful/devices/UVA20')
  //     .query({ nextToken: 'test_4', maxResults: 1 })
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)

  //   const expectedDevices = fakeDevices
  //     .filter(d => d.thingTypeName === 'UVA20')

  //   expect(res.statusCode).toEqual(200)
  //   expect(res.body?.devices.length).toEqual(1)
  //   expect(res.body?.devices?.[0].serialNumber).toEqual(expectedDevices[0].thingName)
  //   expect(res.body?.devices?.[0].type).toEqual(expectedDevices[0].thingTypeName)
  //   expect(res.body?.nextToken).toEqual('test_4')
  //   expect(res.body?.totalCount).toEqual(3)
  // })


  // test('GET /devices/:deviceType - invalid request', async () => {
  //   const res = await request(appExpress)
  //     .get('/restful/devices/UVA20')
  //     .query({ nextToken: 10, maxResults: '123' })
  //     .set('Accept', 'application/json')
  //     .set('Authorization', token)

  //   expect(res.statusCode).toEqual(400)
  // })
})
