import Queue from 'bull'
import path from 'path'

const imageQueue = new Queue('image resize', process.env.QUEUE_HOST!)

imageQueue.process(path.join(__dirname, './jobs/imageResize.js'))

export default {
  push(img: string, imgName: string) {
    imageQueue.add({ img, imgName })
  }
}