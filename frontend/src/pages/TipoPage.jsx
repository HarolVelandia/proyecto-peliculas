import React, { useEffect, useState } from "react";
import axios from "axios";
import EntityCard from "../components/EntityCard";

const TipoPage = () => {
  const [tipos, setTipos] = useState([]);
  const [nuevoTipo, setNuevoTipo] = useState("");
  const [editando, setEditando] = useState(null);
  const [tipoEditado, setTipoEditado] = useState("");

  const fetchTipos = async () => {
    try {
      const res = await axios.get("https://peliculas-w6nl.onrender.com/api/tipo");
      setTipos(res.data);
    } catch (error) {
      console.error("Error cargando tipos:", error);
    }
  };

  const agregarTipo = async () => {
    if (!nuevoTipo.trim()) return;
    try {
      await axios.post("https://peliculas-w6nl.onrender.com/api/tipo", { nombre: nuevoTipo });
      setNuevoTipo("");
      fetchTipos();
    } catch (error) {
      console.error("Error agregando tipo:", error);
    }
  };

  const eliminarTipo = async (id) => {
    try {
      await axios.delete(`https://peliculas-w6nl.onrender.com/api/tipo/${id}`);
      fetchTipos();
    } catch (error) {
      console.error("Error eliminando tipo:", error);
    }
  };

  const iniciarEdicion = (t) => {
    setEditando(t._id);
    setTipoEditado(t.nombre);
  };

  const guardarEdicion = async (id) => {
    try {
      await axios.put(`https://peliculas-w6nl.onrender.com/api/tipo/${id}`, { nombre: tipoEditado });
      setEditando(null);
      setTipoEditado("");
      fetchTipos();
    } catch (error) {
      console.error("Error editando tipo:", error);
    }
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setTipoEditado("");
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Gestión de Tipos</h1>

      {/* Formulario agregar */}
      <div className="card mb-4 p-3 shadow-sm">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nuevo tipo"
            value={nuevoTipo}
            onChange={(e) => setNuevoTipo(e.target.value)}
          />
          <button className="btn btn-primary" onClick={agregarTipo}>
            Agregar
          </button>
        </div>
      </div>

      {/* Lista de tipos */}
      <div className="row">
        {tipos.map((t) => (
          <EntityCard
            key={t._id}
            entity={t}
            editando={editando}
            entityEditado={tipoEditado}
            iniciarEdicion={iniciarEdicion}
            guardarEdicion={guardarEdicion}
            setEntityEditado={setTipoEditado}
            cancelarEdicion={cancelarEdicion}
            eliminarEntity={eliminarTipo}
          />
        ))}
      </div>
    </div>
  );
};

export default TipoPage;
