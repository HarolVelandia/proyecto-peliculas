import express from "express";
import ProductoraController from "./controller.js";

const router = express.Router();

export const ProductoraAPI = (app) => {
  router
    .get("/", ProductoraController.getProductoras)
    .get("/:id", ProductoraController.getProductora)
    .post("/", ProductoraController.crearProductora)
    .put("/:id", ProductoraController.actualizarProductora)
    .delete("/:id", ProductoraController.eliminarProductora);

  app.use("/api/productora", router);
};
