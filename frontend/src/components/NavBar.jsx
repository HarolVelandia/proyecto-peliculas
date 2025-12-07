import { Link } from "react-router-dom";
import { FaFilm } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
        {/* Logo o título */}
        <Link className="navbar-brand text-danger fw-bold d-flex align-items-center" to="/">
          <FaFilm className="me-2" /> Películas IUD
        </Link>

        {/* Menú de navegación */}
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-danger">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/genero" className="nav-link text-danger">Géneros</Link>
            </li>
            <li className="nav-item">
              <Link to="/directores" className="nav-link text-danger">Directores</Link>
            </li>
            <li className="nav-item">
              <Link to="/productoras" className="nav-link text-danger">Productoras</Link>
            </li>
            <li className="nav-item">
              <Link to="/tipos" className="nav-link text-danger">Tipos</Link>
            </li>
            <li className="nav-item">
              <Link to="/media" className="nav-link text-danger">Películas / Series</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
