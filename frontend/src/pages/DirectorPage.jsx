import React, { useEffect, useState } from "react";
import axios from "axios";
import EntityCard from "../components/EntityCard";

const DirectorPage = () => {
  const [directores, setDirectores] = useState([]);
  const [nuevoDirector, setNuevoDirector] = useState("");
  const [editando, setEditando] = useState(null);
  const [directorEditado, setDirectorEditado] = useState("");

  const fetchDirectores = async () => {
    try {
      const res = await axios.get("https://peliculas-w6nl.onrender.com/api/director");
      setDirectores(res.data);
    } catch (error) {
      console.error("Error cargando directores:", error);
    }
  };

  const agregarDirector = async () => {
    if (!nuevoDirector.trim()) return;
    try {
      await axios.post("https://peliculas-w6nl.onrender.com/api/director", {
        nombre: nuevoDirector,
      });
      setNuevoDirector("");
      fetchDirectores();
    } catch (error) {
      console.error("Error agregando director:", error);
    }
  };

  const eliminarDirector = async (id) => {
    try {
      await axios.delete(`https://peliculas-w6nl.onrender.com/api/director/${id}`);
      fetchDirectores();
    } catch (error) {
      console.error("Error eliminando director:", error);
    }
  };

  const iniciarEdicion = (director) => {
    setEditando(director._id);
    setDirectorEditado(director.nombre);
  };

  const guardarEdicion = async (id) => {
    try {
      await axios.put(`https://peliculas-w6nl.onrender.com/api/director/${id}`, {
        nombre: directorEditado,
      });
      setEditando(null);
      setDirectorEditado("");
      fetchDirectores();
    } catch (error) {
      console.error("Error editando director:", error);
    }
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setDirectorEditado("");
  };

  useEffect(() => {
    fetchDirectores();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Gestión de Directores</h1>

      {/* Formulario agregar */}
      <div className="card mb-4 p-3 shadow-sm">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nuevo director"
            value={nuevoDirector}
            onChange={(e) => setNuevoDirector(e.target.value)}
          />
          <button className="btn btn-primary" onClick={agregarDirector}>
            Agregar
          </button>
        </div>
      </div>

      {/* Lista de directores */}
      <div className="row">
        {directores.map((d) => (
          <EntityCard
            key={d._id}
            entity={d}
            editando={editando}
            entityEditado={directorEditado}
            iniciarEdicion={iniciarEdicion}
            guardarEdicion={guardarEdicion}
            setEntityEditado={setDirectorEditado}
            cancelarEdicion={cancelarEdicion}
            eliminarEntity={eliminarDirector}
          />
        ))}
      </div>
    </div>
  );
};

export default DirectorPage;
