import multer from 'multer'
import { extname } from 'path'
import { Request, Response } from 'express'

// Create a multer parse for image upload
const parser = multer({
  dest: 'public/uploads/',
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
  limits: { fileSize: parseInt(process.env.IMG_UPLOAD_MAX_SIZE!) }
})

export default (fieldName: string) => (req: Request, res: Response, next: Function) => {
  const upload = parser.single(fieldName)

  upload(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          res.status(400).json({ error: err.message })
      } else if (err) {
          // An unknown error occurred when uploading.
          res.status(500).json({ error: err.message })
      }
      // Everything went fine.
      next()
  })
}