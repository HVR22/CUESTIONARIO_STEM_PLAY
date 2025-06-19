import { useEffect, useState } from "react";

export default function Gracias() {
  const [nombre, setNombre] = useState("Estudiante");
  const [tipoCuestionario, setTipoCuestionario] = useState("");

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombreParticipante");
    const tipo = localStorage.getItem("tipoCuestionario");
    if (nombreGuardado) setNombre(nombreGuardado);
    if (tipo) setTipoCuestionario(tipo);


    return () => {
      localStorage.removeItem("nombreParticipante");
      localStorage.removeItem("tipoCuestionario");
    };
  }, []);

  const mensajes = {
    "estimulo-pre": {
      texto: "1. Cuestionario de Estimulación Pre-Test",
      estilo: "text-dark fw-bold"
    },
    "estimulo-post": {
      texto: "2. Cuestionario de Estimulación Post-Test",
      estilo: "text-pink"
    },
    "meega": {
      texto: "3. Cuestionario de Experiencia y Usabilidad",
      estilo: "text-warning"
    }
  };

  const mensaje = mensajes[tipoCuestionario] || {
    texto: "Cuestionario",
    estilo: "text-secondary"
  };


  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className="card shadow-lg p-4 p-md-5 text-center" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-success">¡Gracias por participar, {nombre}!</h2>
        <h4 className="lead">¡Tu respuesta ha sido registrada correctamente en el cuestionario!</h4>
        <p
        className="lead"
        style={{
            color:
            tipoCuestionario === "estimulo-pre"
                ? "#000"
                : tipoCuestionario === "estimulo-post"
                ? "#e91e63"
                : tipoCuestionario === "meega"
                ? "#ffc107"
                : "#6c757d",
                fontWeight: "bold"
        }}
        >
        {mensaje.texto}
        </p>

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
