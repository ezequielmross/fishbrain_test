import multer from 'multer'
import { extname } from 'path'
import { Request, Response, NextFunction } from 'express'

// Create a multer parse for image upload
const parser = multer({
  dest: 'public/uploads/',
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname)
    const allowedTypes = ['.png', '.jpg', '.gif', '.jpeg']
    if (allowedTypes.includes(ext)) {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
  limits: { fileSize: parseInt(process.env.IMG_UPLOAD_MAX_SIZE!) }
})

export default (fieldName: string) => (req: Request, res: Response, next: Function) => {
  // Creates multer middleware
  const upload = parser.single(fieldName)

  // Only allows multipart/form-data request
  const contentType = req.header('content-type')
  if (!(contentType && contentType.indexOf('multipart/form-data') > -1)) {
    return res.status(500).json({ error: 'Request must be a multipart/form-data' })
  }

  // Prevent Multer errors
  upload(req, res, (err: any) => {
    // A Multer error occurred when uploading.
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message })
    }
    // An unknown error occurred when uploading.
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    // Image field is required
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: `Field "${fieldName}" is required` })
    }
    // Everything went fine.
    next()
  })
}