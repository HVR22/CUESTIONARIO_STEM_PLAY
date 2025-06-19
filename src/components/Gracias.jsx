import { useEffect, useState } from "react";

export default function Gracias() {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombreParticipante");
    setNombre(nombreGuardado || "Estudiante");
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className="card shadow-lg p-4 p-md-5 text-center" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-success">¡Gracias por participar, {nombre}!</h2>
        <p className="lead">Tu respuesta ha sido registrada correctamente.</p>
        <img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHNpZHNnOTljbjB1cjN6NXc0b3hhdmtqcTgxM3o0ZTJhcnp6eTBzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hxERQNWQudqSF1iDnr/giphy.gif"
          alt="STEMPlay Agradecimiento"
          className="img-fluid my-4"
          style={{ maxHeight: "300px" }}
        />
        <p>¡Sigue explorando el mundo STEM con curiosidad e inspiración! 💡</p>
      </div>
    </div>
  );
}
