import { useEffect, useState } from "react";
import api from "../services/api";
import EntityCard from "../components/EntityCard";

export default function GeneroPage() {
  const [generos, setGeneros] = useState([]);
  const [nuevoGenero, setNuevoGenero] = useState("");
  const [editando, setEditando] = useState(null);
  const [entityEditado, setEntityEditado] = useState("");

  useEffect(() => {
    fetchGeneros();
  }, []);

  const fetchGeneros = async () => {
    try {
      const res = await api.get("/api/genero");
      setGeneros(res.data);
    } catch (err) {
      console.error("Error cargando géneros:", err);
    }
  };

  const agregarGenero = async () => {
    if (!nuevoGenero.trim()) return;
    try {
      await api.post("/api/genero", { nombre: nuevoGenero });
      setNuevoGenero("");
      fetchGeneros();
    } catch (err) {
      console.error("Error agregando género:", err);
    }
  };

  const eliminarEntity = async (id) => {
    try {
      await api.delete(`/api/genero/${id}`);
      fetchGeneros();
    } catch (err) {
      console.error("Error eliminando género:", err);
    }
  };

  const iniciarEdicion = (entity) => {
    setEditando(entity._id);
    setEntityEditado(entity.nombre);
  };

  const guardarEdicion = async (id) => {
    try {
      await api.put(`/api/genero/${id}`, { nombre: entityEditado });
      setEditando(null);
      setEntityEditado("");
      fetchGeneros();
    } catch (err) {
      console.error("Error editando género:", err);
    }
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setEntityEditado("");
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Gestión de Géneros</h1>

      {/* Formulario para agregar nuevo género */}
      <div className="card mb-4 p-3 shadow-sm">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nuevo género"
            value={nuevoGenero}
            onChange={(e) => setNuevoGenero(e.target.value)}
          />
          <button className="btn btn-primary" onClick={agregarGenero}>
            Agregar
          </button>
        </div>
      </div>

      {/* Listado de géneros usando EntityCard */}
      <div className="row">
        {generos.map((g) => (
          <EntityCard
            key={g._id}
            entity={g}
            editando={editando}
            entityEditado={entityEditado}
            iniciarEdicion={iniciarEdicion}
            guardarEdicion={guardarEdicion}
            setEntityEditado={setEntityEditado}
            cancelarEdicion={cancelarEdicion}
            eliminarEntity={eliminarEntity}
          />
        ))}
      </div>
    </div>
  );
}