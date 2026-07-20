import multer from "multer"
import path from "path"
import { v4 as uuid } from "uuid"
import fs from "fs"

// make sure upload folder exists
const uploadDir = "uploads/resumes"
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // uuid prevents filename collisions
    const ext = path.extname(file.originalname)
    cb(null, `${uuid()}${ext}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true)
  } else {
    cb(new Error("Only PDF files are allowed"), false)
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
})