import { useForm } from "react-hook-form";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function FormularioEstimulo({ tipoTest = "pre" }) {
const { register, handleSubmit, reset, formState: { errors } } = useForm({mode: "onTouched"});
const navigate = useNavigate();

const preguntas = [
  "1. El diseño del juego es atractivo (interfaz, gráficos, tableros, cartas, etc.)",
  "2. La tipografía y los colores del texto están bien combinados y son consistentes.",
  "3. Necesité aprender algunas cosas antes de poder jugar.",
  "4. Aprender a jugar este juego fue fácil para mí.",
  "5. Creo que la mayoría de las personas aprenderían a jugar este juego muy rápido.",
  "6. Considero que el juego es fácil de jugar.",
  "7. Las reglas del juego son claras y fáciles de entender.",
  "8. Las fuentes (tamaño y estilo) usadas en el juego son fáciles de leer.",
  "9. Los colores usados en el juego son significativos.",
  "10. El juego permite personalizar la apariencia (fuente y/o color) según mis preferencias.",
  "11. El juego evita que yo cometa errores.",
  "12. Cuando cometo un error, es fácil recuperarse rápidamente.",
  "13. Cuando vi el juego por primera vez, tuve la impresión de que sería fácil para mí.",
  "14. Los contenidos y la estructura me ayudaron a sentir confianza en que aprendería con este juego.",
  "15. Este juego es apropiadamente desafiante para mí.",
  "16. El juego presenta nuevos desafíos (nuevos obstáculos, situaciones o variaciones) a un ritmo adecuado.",
  "17. El juego no se vuelve monótono a medida que avanza (tareas repetitivas o aburridas).",
  "18. Completar las tareas del juego me dio una sensación satisfactoria de logro.",
  "19. Avancé en el juego gracias a mi esfuerzo personal.",
  "20. Me siento satisfecho/a con las cosas que aprendí con el juego.",
  "21. Recomendaría este juego a mis compañeros/as.",
  "22. Pude interactuar con otras personas durante el juego.",
  "23. El juego promueve la cooperación y/o la competencia entre los jugadores.",
  "24. Me sentí bien al interactuar con otros jugadores durante el juego.",
  "25. Me divertí con el juego.",
  "26. Ocurrió algo durante el juego (elementos del juego, competencia, etc.) que me hizo sonreír.",
  "27. Al inicio del juego hubo algo interesante que capturó mi atención.",
  "28. Estuve tan involucrado/a en la tarea del juego que perdí la noción del tiempo.",
  "29. Me olvidé de mi entorno inmediato mientras jugaba.",
  "30. Los contenidos del juego son relevantes para mis intereses.",
  "31. Me queda claro cómo se relacionan los contenidos del juego con el curso.",
  "32. Este juego es un método de enseñanza adecuado para este curso.",
  "33. Prefiero aprender con este juego que mediante otras formas (p. ej., otros métodos de enseñanza).",
  "34. El juego contribuyó a mi aprendizaje en este curso.",
  "35. El juego permitió un aprendizaje eficiente en comparación con otras actividades del curso."
];

  

  const onSubmit = async (data) => {
    const respuestas = {
      name: data.name,
      age: parseInt(data.age),
      type_test: tipoTest,
      ...Object.fromEntries(
        preguntas.map((_, i) => [`q${i + 1}`, parseInt(data[`q${i + 1}`])])
      ),
    };

    const { error } = await supabase.from("cuestionario_meega").insert([respuestas]);

    if (error) {
      console.error("Error Supabase:", error);
      alert("Error al enviar respuestas");
    } else {
      localStorage.setItem("nombreParticipante", data.name);
      localStorage.setItem("tipoCuestionario", "meega");
      navigate("/gracias");
      reset();
    }
  };

  return (
    <div className="container mt-4">
      <div className="mx-auto card shadow-lg p-4 p-md-5" style={{ maxWidth: "900px" }}>
        <h1 className="text-center mb-4 text-primary">
          3. Cuestionario de Experiencia de usuario y usabilidad ({tipoTest === "pre" ? "Pre-Test" : "Post-Test"})
        </h1>
        <div>
            <h5>
                Responda las preguntas de acuerdo con su opinión, se presentan las opciones
                de puntaje que van desde 1 (el valor más bajo) hasta 5 (el valor más alto).
                <br />
                1: Muy en desacuerdo<br />
                2: En desacuerdo<br />
                3: Ni de acuerdo ni en desacuerdo<br />
                4: De acuerdo<br />
                5: Muy de acuerdo
            </h5>
        </div>
<br />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Nombre y Edad */}
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
                    message: "⚠️ Solo se permiten letras y espacios"
                }
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
                <label className="form-label fw-semibold">{pregunta}</label>
                <div className= "d-flex flex-column ms-3">
                {[1, 2, 3, 4, 5].map((val) => {
                    const etiquetas = {
                    1: "Muy en desacuerdo",
                    2: "En desacuerdo",
                    3: "Ni de acuerdo ni en desacuerdo",
                    4: "De acuerdo",
                    5: "Muy de acuerdo"
                    };
                    return (
                    <div key={val} className="form-check">
                        <input
                        className="form-check-input"
                        type="radio"
                        id={`q${i + 1}_opt${val}`}
                        value={val}
                        {...register(`q${i + 1}`, { required: true })}
                        />
                        <label className="form-check-label" htmlFor={`q${i + 1}_opt${val}`}>
                        {val} - {etiquetas[val]}
                        </label>
                    </div>
                    );
                })}
                </div>
                {errors[`q${i + 1}`] && (
                <p className="text-danger mt-1 ms-2">
                    ⚠️ Falta responder esta pregunta para poder enviar el formulario.
                </p>
                )}
            </div>
            ))}


          {/* Botón */}
          <div className="text-center pt-3">
            <button type="submit" className="btn btn-primary px-4">
              Enviar respuestas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
