import { directorService } from "./services.js";

export default class DirectorController {
  static async getDirectores(req, res) {
    try {
      let data = await directorService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getDirector(req, res) {
    try {
      let data = await directorService.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async crearDirector(req, res) {
    try {
      let id = await directorService.create(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async actualizarDirector(req, res) {
    try {
      await directorService.update(req.params.id, req.body);
      res.json({ message: "Director actualizado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async eliminarDirector(req, res) {
    try {
      await directorService.remove(req.params.id);
      res.json({ message: "Director eliminado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
