import { productoraService } from "./services.js";

export default class ProductoraController {
  static async getProductoras(req, res) {
    try {
      let data = await productoraService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getProductora(req, res) {
    try {
      let data = await productoraService.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async crearProductora(req, res) {
    try {
      let id = await productoraService.create(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async actualizarProductora(req, res) {
    try {
      await productoraService.update(req.params.id, req.body);
      res.json({ message: "Productora actualizada" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async eliminarProductora(req, res) {
    try {
      await productoraService.remove(req.params.id);
      res.json({ message: "Productora eliminada" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
