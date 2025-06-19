import { Routes, Route, Link, useLocation } from "react-router-dom";
import FormularioMeega from "./components/FormularioMeega";
import FormularioEstimulo from "./components/FomularioEstimulo";
import Gracias from "./components/Gracias";

export default function App() {
  const location = useLocation();
  const esPaginaGracias = location.pathname === "/gracias";

  return (
    <div className="container py-5">
      {/* Solo mostrar el nav si NO es la página de gracias */}
      {!esPaginaGracias && (
        <nav className="mb-4">
          <ul className="nav nav-pills justify-content-center gap-3">
            <li className="nav-item">
              <Link to="/estimulo-pre" className="nav-link">1. Estimulación Pre</Link>
            </li>
            <li className="nav-item">
              <Link to="/estimulo-post" className="nav-link">2. Estimulación Post</Link>
            </li>
            <li className="nav-item">
              <Link to="/meega" className="nav-link">3. Experiencia de usuario y usabilidad Post</Link>
            </li>
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="/meega" element={<FormularioMeega tipoTest="post" />} />
        <Route path="/estimulo-pre" element={<FormularioEstimulo tipoTest="pre" />} />
        <Route path="/estimulo-post" element={<FormularioEstimulo tipoTest="post" />} />
        <Route path="/gracias" element={<Gracias />} />
        <Route path="*" element={<h2 className="text-center text-muted">Selecciona una opción arriba</h2>} />
      </Routes>
    </div>
  );
}
