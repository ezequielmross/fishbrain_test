import imageResize from '../../src/jobs/imageResize'
import Bull from 'bull'
import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'

const imgDist = path.join(__dirname, '../../public/resized/test_img.png')

beforeAll(async () => {
})

afterAll(async () => {
  fs.unlinkSync(imgDist)
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
    await imageResize({
      name: 'testing',
      data: {
        img: '__tests__/static/test_img', imgName: 'test_img'
      }
    } as Bull.Job<any>)
    const dimensions = sizeOf(imgDist)

    console.debug(dimensions)

    expect(dimensions).toBeTruthy()
    expect(dimensions.height).toEqual(140)
    expect(dimensions.width).toEqual(140)
  })
})
