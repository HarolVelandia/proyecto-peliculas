import express from "express";
import DirectorController from "./controller.js";

const router = express.Router();

export const DirectorAPI = (app) => {
  router
    .get("/", DirectorController.getDirectores)
    .get("/:id", DirectorController.getDirector)
    .post("/", DirectorController.crearDirector)
    .put("/:id", DirectorController.actualizarDirector)
    .delete("/:id", DirectorController.eliminarDirector);

  app.use("/api/director", router);
};
