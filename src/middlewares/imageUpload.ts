import multer from 'multer'
import { extname } from 'path'

const storage = multer.memoryStorage()

const parser = multer({
  dest: 'public/uploads/',
  // storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
  limits: { fileSize: parseInt(process.env.IMG_UPLOAD_MAX_SIZE!) }
})

export default (fieldName: string) => parser.single(fieldName)