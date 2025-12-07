import express from "express";
import MediaController from "./controller.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// 🔹 Configuración de multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // carpeta uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Rutas
router
  .get("/", MediaController.getMedias)
  .get("/:id", MediaController.getMedia)
  .post("/", upload.single("imagenFile"), MediaController.crearMedia)
  .put("/:id", upload.single("imagenFile"), MediaController.actualizarMedia)
  .delete("/:id", MediaController.eliminarMedia);

export const MediaAPI = (app) => {
  app.use("/api/media", router);
};
