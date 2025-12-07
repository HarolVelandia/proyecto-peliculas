import React, { useEffect, useState } from "react";
import axios from "axios";
import EntityCard from "../components/EntityCard";

const ProductoraPage = () => {
  const [productoras, setProductoras] = useState([]);
  const [nuevaProductora, setNuevaProductora] = useState("");
  const [editando, setEditando] = useState(null);
  const [productoraEditada, setProductoraEditada] = useState("");

  const fetchProductoras = async () => {
    try {
      const res = await axios.get("https://peliculas-w6nl.onrender.com/api/productora");
      setProductoras(res.data);
    } catch (error) {
      console.error("Error cargando productoras:", error);
    }
  };

  const agregarProductora = async () => {
    if (!nuevaProductora.trim()) return;
    try {
      await axios.post("https://peliculas-w6nl.onrender.com/api/productora", {
        nombre: nuevaProductora,
      });
      setNuevaProductora("");
      fetchProductoras();
    } catch (error) {
      console.error("Error agregando productora:", error);
    }
  };

  const eliminarProductora = async (id) => {
    try {
      await axios.delete(`https://peliculas-w6nl.onrender.com/api/productora/${id}`);
      fetchProductoras();
    } catch (error) {
      console.error("Error eliminando productora:", error);
    }
  };

  const iniciarEdicion = (p) => {
    setEditando(p._id);
    setProductoraEditada(p.nombre);
  };

  const guardarEdicion = async (id) => {
    try {
      await axios.put(`https://peliculas-w6nl.onrender.com/api/productora/${id}`, {
        nombre: productoraEditada,
      });
      setEditando(null);
      setProductoraEditada("");
      fetchProductoras();
    } catch (error) {
      console.error("Error editando productora:", error);
    }
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setProductoraEditada("");
  };

  useEffect(() => {
    fetchProductoras();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Gestión de Productoras</h1>

      {/* Formulario agregar */}
      <div className="card mb-4 p-3 shadow-sm">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nueva productora"
            value={nuevaProductora}
            onChange={(e) => setNuevaProductora(e.target.value)}
          />
          <button className="btn btn-primary" onClick={agregarProductora}>
            Agregar
          </button>
        </div>
      </div>

      {/* Lista de productoras */}
      <div className="row">
        {productoras.map((p) => (
          <EntityCard
            key={p._id}
            entity={p}
            editando={editando}
            entityEditado={productoraEditada}
            iniciarEdicion={iniciarEdicion}
            guardarEdicion={guardarEdicion}
            setEntityEditado={setProductoraEditada}
            cancelarEdicion={cancelarEdicion}
            eliminarEntity={eliminarProductora}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductoraPage;
