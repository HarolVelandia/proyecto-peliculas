import express from "express";
import TipoController from "./controller.js";

const router = express.Router();

export const TipoAPI = (app) => {
  router
    .get("/", TipoController.getTipos)
    .get("/:id", TipoController.getTipo)
    .post("/", TipoController.crearTipo)
    .put("/:id", TipoController.actualizarTipo)
    .delete("/:id", TipoController.eliminarTipo);

  app.use("/api/tipo", router);
};
