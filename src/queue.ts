import Queue from 'bull'
import path from 'path'

// Create the image queue
const imageQueue = new Queue('image resize', process.env.QUEUE_HOST!)

// Append the background process
imageQueue.process(path.join(__dirname, './jobs/imageResize.js'))

// Only required fields can be added
export default {
  push(img: string, imgName: string) {
    imageQueue.add({ img, imgName })
  }
}