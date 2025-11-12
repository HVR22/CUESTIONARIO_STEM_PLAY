import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import FormularioMeega from "./components/FormularioMeega";
import FormularioEstimulo from "./components/FomularioEstimulo";
import Gracias from "./components/Gracias";

export default function App() {
  const location = useLocation();
  const esPaginaGracias = location.pathname === "/gracias";

  const cls = (isActive) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <div className="container py-5">
      {!esPaginaGracias && (
        <nav className="mb-4">
          <ul className="nav nav-pills justify-content-center gap-3">
            <li className="nav-item">
              <a
                href="https://hvr22.github.io/STEM_Play/"
                className="nav-link fw-semibold"
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir juego (se abre en una nueva pestaña)"
              >
                🎮 Jugar STEM_Play
              </a>
            </li>
            <li className="nav-item">
              <NavLink to="/estimulo-pre" className={({ isActive }) => cls(isActive)}>
                1. Estimulación Pre
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/estimulo-post" className={({ isActive }) => cls(isActive)}>
                2. Estimulación Post
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/meega" className={({ isActive }) => cls(isActive)}>
                3. Experiencia de usuario y usabilidad Post
              </NavLink>
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
