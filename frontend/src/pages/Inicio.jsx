import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

function Inicio() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://peliculas-w6nl.onrender.com/api/media")
      .then((response) => {
        setPeliculas(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando películas:", err);
        setError("No se pudieron cargar las películas");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando películas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-danger mb-4 text-center">🎬 Películas</h2>
      <div className="row">
        {peliculas.map((peli) => (
          <div key={peli._id} className="col-12 col-md-6 col-lg-4 mb-4">
            <MovieCard pelicula={peli} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inicio;