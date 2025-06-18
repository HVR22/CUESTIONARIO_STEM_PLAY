import { Routes, Route, Link } from "react-router-dom"
import FormularioMeega from "./components/FormularioMeega"
import FormularioEstimulo from "./components/FomularioEstimulo"

export default function App() {
  return (
    <div className="container py-5">
      <nav className="mb-4">
        <ul className="nav nav-pills justify-content-center gap-3">
          <li className="nav-item">
            <Link to="/meega" className="nav-link">Experiencia de usuario y usabilidad Post</Link>
          </li>
          <li className="nav-item">
            <Link to="/estimulo-pre" className="nav-link">Estimulación Pre</Link>
          </li>
          <li className="nav-item">
            <Link to="/estimulo-post" className="nav-link">Estimulación Post</Link>
          </li>
        </ul>
      </nav>

      <Routes>
      <Route path="/meega" element={<FormularioMeega tipoTest="post" />} />
      <Route path="/estimulo-pre" element={<FormularioEstimulo tipoTest="pre" />} />
      <Route path="/estimulo-post" element={<FormularioEstimulo tipoTest="post" />} />
        <Route path="*" element={<h2 className="text-center text-muted">Selecciona una opción arriba</h2>} />
      </Routes>
    </div>
  )
}
