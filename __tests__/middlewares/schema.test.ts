import { schemaValidator, RouteSchema } from '../../src/middlewares/schemaValidator'
import Joi from 'joi'
import {
  createRequest,
  fakeResponse
} from '../util'

const schema: RouteSchema = {
  query: Joi.object({
    q: Joi.string().required()
  }),
  body: Joi.object({
    text: Joi.string().optional(),
    number: Joi.number().default(10).max(50).optional()
  }),
  params: Joi.object({
    id: Joi.string().required()
  })
}

const validSchema = {
  query: {
    q: 'Devices x'
  },
  body:{
    text: 'test',
    number: 15
  },
  params: {
    id: '10000'
  }
}

type RespData = {
  body?: { error: string },
  code?: number
}

// Before each test, disable all logging so our test results are cleaner
beforeEach(() => {
  // jest.spyOn(console, 'debug').mockImplementation(() => { })
  jest.spyOn(console, 'log').mockImplementation(() => 0)
  jest.spyOn(console, 'warn').mockImplementation(() => 0)
  jest.spyOn(console, 'error').mockImplementation(() => 0)
})

describe('SchemaValidator Middleware', () => {
  test('valid schema', async () => {
    const req = createRequest(validSchema)
    const fail = (respData: RespData) => {
      // Fail
      expect(respData?.code).not.toBeTruthy()
      expect(respData?.body).not.toBeTruthy()
    }
    const resp = fakeResponse(fail)

    schemaValidator(schema)(req, resp, () => {
      // Success
      expect(req.query).toEqual(validSchema.query)
      expect(req.params).toEqual(validSchema.params)
      expect(req.body).toEqual(validSchema.body)
    })
  })
  test('invalid schema body', async () => {
    const req = createRequest({
      ...validSchema,
      body: {
        ...validSchema.body,
        number: 51
      }
    })
    const fail = (respData: RespData) => {
      // Fail
      expect(respData?.body?.error).toContain('"number"')
      expect(respData?.code).toEqual(400)
    }
    const resp = fakeResponse(fail)

    schemaValidator(schema)(req, resp, () => 0)
  })
  test('invalid schema query', async () => {
    const req = createRequest({
      ...validSchema,
      query: {}
    })
    const fail = (respData: RespData) => {
      // Fail
      expect(respData?.body?.error).toContain('"q" is required')
      expect(respData?.code).toEqual(400)
    }
    const resp = fakeResponse(fail)

    schemaValidator(schema)(req, resp, () => 0)
  })
  test('invalid schema params', async () => {
    const req = createRequest({
      ...validSchema,
      params: {}
    })
    const fail = (respData: RespData) => {
      // Fail
      expect(respData?.body?.error).toContain('"id" is required')
      expect(respData?.code).toEqual(400)
    }
    const resp = fakeResponse(fail)

    schemaValidator(schema)(req, resp, () => 0)
  })
})
