import { useForm } from "react-hook-form";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";


export default function FormularioEstimulo({ tipoTest = "pre" }) {
const { register, handleSubmit, reset, formState: { errors } } = useForm({mode: "onTouched"});
const navigate = useNavigate();


  const preguntas = [
    {
      texto: "1. Me gustaría aprender más del cuerpo humano",
      etiquetas: ["No me gusta nada", "Poco", "Neutral", "Me gusta", "Me encanta"]
    },
    {
      texto: "2. Siento que la ingeniería es muy difícil para mí",
      etiquetas: ["Muy en desacuerdo", "En desacuerdo", "Neutral", "De acuerdo", "Muy de acuerdo"]
    },
    {
      texto: "3. Me divierte imaginar cómo funcionan las cosas por dentro",
      etiquetas: ["No me gusta nada", "Poco", "Neutral", "Me gusta", "Me encanta"]
    },
    {
      texto: "4. Me pregunto muchas veces cómo funcionan las cosas en la naturaleza",
      etiquetas: ["Nada", "Poco", "Neutral", "Bastante", "Muchísimo"]
    },
    {
      texto: "5. Me gusta hacer experimentos o descubrir cosas nuevas",
      etiquetas: ["No me gusta nada", "Poco", "Neutral", "Me gusta", "Me encanta"]
    },
    {
      texto: "6. A veces siento que la tecnología es complicada y no es para mí",
      etiquetas: ["Muy en desacuerdo", "En desacuerdo", "Neutral", "De acuerdo", "Muy de acuerdo"]
    },
    {
      texto: "7. Me gustaría saber cómo se crean los videojuegos o las aplicaciones",
      etiquetas: ["No me gusta nada", "Poco", "Neutral", "Me gusta", "Me encanta"]
    },
    {
      texto: "8. Me emociona pensar en inventar algo usando tecnología",
      etiquetas: ["No me gusta nada", "Poco", "Neutral", "Me gusta", "Me encanta"]
    },
    {
      texto: "9. No me imagino estudiando algo relacionado con STEM cuando sea grande",
      etiquetas: ["Muy en desacuerdo", "En desacuerdo", "Neutral", "De acuerdo", "Muy de acuerdo"]
    },
    {
      texto: "10. Resolver problemas matemáticos me parece divertido",
      etiquetas: ["Muy en desacuerdo", "En desacuerdo", "Neutral", "De acuerdo", "Muy de acuerdo"]
    },
    {
      texto: "11. A veces las matemáticas me parecen confusas o aburridas",
      etiquetas: ["Muy en desacuerdo", "En desacuerdo", "Neutral", "De acuerdo", "Muy de acuerdo"]
    },
    {
      texto: "12. Me gustaría tener un trabajo en el futuro que use ciencia, tecnología o matemáticas",
      etiquetas: ["No me gusta nada", "Poco", "Neutral", "Me gusta", "Me encanta"]
    },
    {
      texto: "13. Me parece interesante construir cosas o resolver problemas con mis manos",
      etiquetas: ["No me gusta nada", "Poco", "Neutral", "Me gusta", "Me encanta"]
    },
    {
      texto: "14. Me encanta usar el celular, tablet o la computadora para aprender",
      etiquetas: ["No me gusta nada", "Poco", "Neutral", "Me gusta", "Me encanta"]
    },
    {
      texto: "15. Si tuviera que escoger ahora, elegiría una carrera donde pueda inventar, descubrir o resolver problemas",
      etiquetas: ["No me gusta nada", "Poco", "Neutral", "Me gusta", "Me encanta"]
    },
    {
      texto: "16. Creo que las personas que trabajan en STEM ayudan a mejorar el mundo",
      etiquetas: ["Muy en desacuerdo", "En desacuerdo", "Neutral", "De acuerdo", "Muy de acuerdo"]
    },
    {
      texto: "17. Me gustaría usar las matemáticas para cosas reales, como hacer un presupuesto o diseñar algo",
      etiquetas: ["No me gusta nada", "Poco", "Neutral", "Me gusta", "Me encanta"]
    },
    {
      texto: "18. Me gustaría ser parte de un equipo que crea algo nuevo, como un puente, una máquina o un robot",
      etiquetas: ["No me gusta nada", "Poco", "Neutral", "Me gusta", "Me encanta"]
    },
    {
      texto: "19. Siento que la ciencia no tiene mucho que ver conmigo",
      etiquetas: ["Muy en desacuerdo", "En desacuerdo", "Neutral", "De acuerdo", "Muy de acuerdo"]
    },
    {
      texto: "20. Me siento bien cuando logro entender algo difícil en matemáticas",
      etiquetas: ["No me gusta nada", "Poco", "Neutral", "Me gusta", "Me encanta"]
    }
  ];

  const onSubmit = async (data) => {
    const respuestas = {
      name: data.name,
      age: parseInt(data.age),
      type_test: tipoTest,
      ...Object.fromEntries(
        preguntas.map((_, i) => [`q${i + 1}`, parseInt(data[`q${i + 1}`])])
      )
    };

    const { error } = await supabase.from("cuestionario_estimulacion").insert([respuestas]);

    if (error) {
      console.error("Error Supabase:", error);
      alert("Error al enviar respuestas");
    } else {
      localStorage.setItem("nombreParticipante", data.name);
      navigate("/gracias");
      reset();
    }
  };

  return (
    <div className="container mt-4">
      <div className="mx-auto card shadow-lg p-4 p-md-5" style={{ maxWidth: "900px" }}>
        <h1 className="text-center mb-4 text-primary">
          {tipoTest === "pre" ? "1." : "2."} Cuestionario de Estimulación {tipoTest === "pre" ? "Pre-Test" : "Post-Test"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-bold">Nombre</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Tu nombre"
              {...register("name", {
                required: "⚠️ Este campo es obligatorio",
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                  message: "⚠️ Solo se permiten letras y espacios",
                },
              })}
              
            />
            {errors.name && (
              <p className="text-danger mt-1 ms-1">{errors.name.message}</p>
            )}

          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Edad</label>
                <input
                type="number"
                className={`form-control ${errors.age ? "is-invalid" : ""}`}
                placeholder="Tu edad"
                min={13}
                max={20}
                onInput={(e) => {
                    if (e.target.value.length > 2) {
                    e.target.value = e.target.value.slice(0, 2);
                    }
                }}
                {...register("age", {
                    required: "⚠️ Este campo es obligatorio",
                    min: {
                    value: 13,
                    message: "⚠️ La edad mínima es 13",
                    },
                    max: {
                    value: 20,
                    message: "⚠️ La edad máxima es 20",
                    },
                })}
                />
                {errors.age && (
                <p className="text-danger mt-1 ms-1">{errors.age.message}</p>
                )}
          </div>
        </div>


          {preguntas.map((pregunta, i) => (
            <div key={i} className="mb-4">
              <label className="form-label d-block">{pregunta.texto}</label>

              {pregunta.etiquetas.map((etiqueta, val) => (
                <div key={val} className="form-check">
                  <input
                    className={`form-check-input ${errors[`q${i + 1}`] ? "is-invalid" : ""}`}
                    type="radio"
                    id={`q${i + 1}_opt${val + 1}`}
                    value={val + 1}
                    {...register(`q${i + 1}`, { required: true })}
                  />
                  <label className="form-check-label" htmlFor={`q${i + 1}_opt${val + 1}`}>
                    {val + 1} - {etiqueta}
                  </label>
                </div>
              ))}

              {/* Mensaje de error */}
              {errors[`q${i + 1}`] && (
                <p className="text-danger mt-1 ms-1">
                  ⚠️ Falta responder la pregunta para que se envíe el formulario
                </p>
              )}
            </div>
          ))}


          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Enviar respuestas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
