import sharp from 'sharp'
import Queue from 'bull'
import path from 'path'

export default async (job: Queue.Job<any>) => {
  const { img, imgName } = job.data as { img: string, imgName: string }

  const dest = path.resolve(__dirname, '../../public/resized', imgName + '.png')

  try {
    await sharp(img)
      .resize(140, 140)
      .png({ quality: 100 })
      .toFile(dest)
    // Todo: delete file from public/uploads folder
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }

  return Promise.resolve(job.name)
}