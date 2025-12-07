import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const MediaPage = () => {
  const [media, setMedia] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [nuevoMedia, setNuevoMedia] = useState({
    titulo: "",
    descripcion: "",
    generoId: "",
    directorId: "",
    productoraId: "",
    tipoId: "",
    imagenFile: null,
    imagenURL: "",
  });

  const [editandoId, setEditandoId] = useState(null);

  const fetchData = async () => {
    try {
      const [m, g, d, p, t] = await Promise.all([
        axios.get("https://peliculas-w6nl.onrender.com/api/media"),
        axios.get("https://peliculas-w6nl.onrender.com/api/genero"),
        axios.get("https://peliculas-w6nl.onrender.com/api/director"),
        axios.get("https://peliculas-w6nl.onrender.com/api/productora"),
        axios.get("https://peliculas-w6nl.onrender.com/api/tipo"),
      ]);
      setMedia(m.data);
      setGeneros(g.data);
      setDirectores(d.data);
      setProductoras(p.data);
      setTipos(t.data);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  const agregarOModificarMedia = async () => {
    try {
      const formData = new FormData();
      formData.append("titulo", nuevoMedia.titulo);
      formData.append("descripcion", nuevoMedia.descripcion);
      formData.append("generoId", nuevoMedia.generoId);
      formData.append("directorId", nuevoMedia.directorId);
      formData.append("productoraId", nuevoMedia.productoraId);
      formData.append("tipoId", nuevoMedia.tipoId);
      if (nuevoMedia.imagenFile) formData.append("imagenFile", nuevoMedia.imagenFile);
      if (nuevoMedia.imagenURL) formData.append("imagenURL", nuevoMedia.imagenURL);

      if (editandoId) {
        await axios.put(
          `https://peliculas-w6nl.onrender.com/api/media/${editandoId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setEditandoId(null);
      } else {
        await axios.post(
          "https://peliculas-w6nl.onrender.com/api/media",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setNuevoMedia({
        titulo: "",
        descripcion: "",
        generoId: "",
        directorId: "",
        productoraId: "",
        tipoId: "",
        imagenFile: null,
        imagenURL: "",
      });

      fetchData();
    } catch (error) {
      console.error("Error guardando media:", error);
    }
  };

  const eliminarMedia = async (id) => {
    try {
      await axios.delete(`https://peliculas-w6nl.onrender.com/api/media/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error eliminando media:", error);
    }
  };

  const empezarEdicion = (m) => {
    setNuevoMedia({
      titulo: m.titulo,
      descripcion: m.descripcion,
      generoId: m.generoId,
      directorId: m.directorId,
      productoraId: m.productoraId,
      tipoId: m.tipoId,
      imagenFile: null,
      imagenURL: m.imagenURL || "",
    });
    setEditandoId(m._id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container text-black my-4">
      <h1 className="text-center mb-4">Gestión de Películas y Series</h1>

      {/* Formulario */}
      <div className="card mb-4 shadow-sm p-3">
        <input
          type="text"
          placeholder="Título"
          value={nuevoMedia.titulo}
          onChange={(e) => setNuevoMedia({ ...nuevoMedia, titulo: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoMedia.descripcion}
          onChange={(e) => setNuevoMedia({ ...nuevoMedia, descripcion: e.target.value })}
          className="form-control mb-2"
        />

        <select
          value={nuevoMedia.generoId}
          onChange={(e) => setNuevoMedia({ ...nuevoMedia, generoId: e.target.value })}
          className="form-select mb-2"
        >
          <option value="">Seleccionar Género</option>
          {generos.map((g) => <option key={g._id} value={g._id}>{g.nombre}</option>)}
        </select>

        <select
          value={nuevoMedia.directorId}
          onChange={(e) => setNuevoMedia({ ...nuevoMedia, directorId: e.target.value })}
          className="form-select mb-2"
        >
          <option value="">Seleccionar Director</option>
          {directores.map((d) => <option key={d._id} value={d._id}>{d.nombre}</option>)}
        </select>

        <select
          value={nuevoMedia.productoraId}
          onChange={(e) => setNuevoMedia({ ...nuevoMedia, productoraId: e.target.value })}
          className="form-select mb-2"
        >
          <option value="">Seleccionar Productora</option>
          {productoras.map((p) => <option key={p._id} value={p._id}>{p.nombre}</option>)}
        </select>

        <select
          value={nuevoMedia.tipoId}
          onChange={(e) => setNuevoMedia({ ...nuevoMedia, tipoId: e.target.value })}
          className="form-select mb-2"
        >
          <option value="">Seleccionar Tipo</option>
          {tipos.map((t) => <option key={t._id} value={t._id}>{t.nombre}</option>)}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNuevoMedia({ ...nuevoMedia, imagenFile: e.target.files[0] })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Link de imagen (opcional)"
          value={nuevoMedia.imagenURL}
          onChange={(e) => setNuevoMedia({ ...nuevoMedia, imagenURL: e.target.value })}
          className="form-control mb-2"
        />

        <button
          onClick={agregarOModificarMedia}
          className={`btn w-100 ${editandoId ? "btn-warning" : "btn-primary"}`}
        >
          {editandoId ? "Actualizar" : "Agregar"}
        </button>
      </div>

      {/* Lista de media usando MovieCard */}
      <div className="row">
        {media.map((m) => (
          <div key={m._id} className="col-12 col-md-6 col-lg-4 mb-4">
            <MovieCard
              pelicula={m}
              onEditar={empezarEdicion}
              onEliminar={eliminarMedia}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaPage;
