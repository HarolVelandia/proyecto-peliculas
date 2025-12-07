import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import GeneroPage from "./pages/GeneroPage";
import DirectorPage from "./pages/DirectorPage.jsx";
import ProductoraPage from "./pages/ProductoraPage";
import TipoPage from "./pages/TipoPage";
import MediaPage from "./pages/MediaPage";
import Inicio from "./pages/Inicio";

function App() {
  return (
    <Router>
      <NavBar />

      <div className="container mt-5 pt-5 min-vh-100">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/genero" element={<GeneroPage />} />
        <Route path="/directores" element={<DirectorPage />} />
        <Route path="/productoras" element={<ProductoraPage />} />
        <Route path="/tipos" element={<TipoPage />} />
        <Route path="/media" element={<MediaPage />} />
      </Routes>
      </div>
    </Router>
    
  );
}

export default App;
