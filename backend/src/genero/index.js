import express from "express";
import GeneroController from "./controller.js";

const router = express.Router();

export const GeneroAPI = (app) => {
  router
    .get("/", GeneroController.getGeneros)
    .get("/:id", GeneroController.getGenero)
    .post("/", GeneroController.crearGenero)
    .put("/:id", GeneroController.actualizarGenero)
    .delete("/:id", GeneroController.eliminarGenero);

  app.use("/api/genero", router);
};
