import { tipoService } from "./services.js";

export default class TipoController {
  static async getTipos(req, res) {
    try {
      let data = await tipoService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getTipo(req, res) {
    try {
      let data = await tipoService.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async crearTipo(req, res) {
    try {
      let id = await tipoService.create(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async actualizarTipo(req, res) {
    try {
      await tipoService.update(req.params.id, req.body);
      res.json({ message: "Tipo actualizado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async eliminarTipo(req, res) {
    try {
      await tipoService.remove(req.params.id);
      res.json({ message: "Tipo eliminado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
