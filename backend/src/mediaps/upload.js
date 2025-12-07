import multer from "multer";
import path from "path";

// Carpeta donde se guardarán las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombre = `${Date.now()}${ext}`;
    cb(null, nombre);
  },
});

export const upload = multer({ storage });
