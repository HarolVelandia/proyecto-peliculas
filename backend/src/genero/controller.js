import { generoService } from "./services.js";

export default class GeneroController {
  static async getGeneros(req, res) {
    try {
      let data = await generoService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getGenero(req, res) {
    try {
      let data = await generoService.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async crearGenero(req, res) {
    try {
      let id = await generoService.create(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async actualizarGenero(req, res) {
    try {
      await generoService.update(req.params.id, req.body);
      res.json({ message: "Género actualizado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async eliminarGenero(req, res) {
    try {
      await generoService.remove(req.params.id);
      res.json({ message: "Género eliminado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
