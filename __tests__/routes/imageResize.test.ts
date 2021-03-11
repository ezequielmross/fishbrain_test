import path from 'path'
import sizeOf from 'image-size'

import { createResizeImg, deleteResizeImg } from '../util'

beforeAll(async () => {
})

afterAll(async () => {
  await deleteResizeImg()
})

// Before each test, disable all logging so our test results are cleaner
beforeEach(() => {
  // jest.spyOn(console, 'debug').mockImplementation(() => { })
  jest.spyOn(console, 'log').mockImplementation(() => 0)
  jest.spyOn(console, 'warn').mockImplementation(() => 0)
  jest.spyOn(console, 'error').mockImplementation(() => 0)
})


describe('Image resize', () => {
  test('success', async () => {
    const imgDist = await createResizeImg()
    const dimensions = sizeOf(imgDist)

    expect(dimensions).toBeTruthy()
    expect(dimensions.height).toEqual(140)
    expect(dimensions.width).toEqual(140)
  })
})
