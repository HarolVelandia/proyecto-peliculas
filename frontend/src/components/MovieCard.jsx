import React from "react";

function MovieCard({ pelicula, onEditar, onEliminar }) {
  // Determinar la URL de la imagen
  const imagenSrc = pelicula.imagenURL
    ? pelicula.imagenURL
    : pelicula.imagenFile
    ? `http://localhost:3000/uploads/${pelicula.imagenFile}`
    : null;

  return (
    <div className="card h-100 d-flex flex-column shadow-sm border-0">
      {imagenSrc && (
        <img
          src={imagenSrc}
          alt={pelicula.titulo}
          className="card-img-top"
          style={{ height: "260px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
        />
      )}
      <div className="card-body flex-grow-1">
        <h5 className="card-title text-danger fw-bold">{pelicula.titulo}</h5>
        <p className="card-text">{pelicula.descripcion}</p>
        <p className="text-xs text-muted">
          🎬 Género: {pelicula.genero?.nombre || "Sin género"} | 🎥 Director: {pelicula.director?.nombre || "Desconocido"} | 🏢 Productora: {pelicula.productora?.nombre || "N/A"} | 📌 Tipo: {pelicula.tipo?.nombre || "N/A"}
        </p>
      </div>
      {(onEditar || onEliminar) && (
        <div className="card-footer d-flex justify-content-end gap-2">
          {onEditar && (
            <button onClick={() => onEditar(pelicula)} className="btn btn-warning btn-sm">
              Editar
            </button>
          )}
          {onEliminar && (
            <button onClick={() => onEliminar(pelicula._id)} className="btn btn-danger btn-sm">
              Eliminar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieCard;
