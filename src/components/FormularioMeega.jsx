import { useForm } from "react-hook-form";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function FormularioEstimulo({ tipoTest = "pre" }) {
const { register, handleSubmit, reset, formState: { errors } } = useForm({mode: "onTouched"});
const navigate = useNavigate();

  const preguntas = [
    "1. El diseño del juego es atractivo (interfaz, gráficos, elementos visuales).",
    "2. La fuente y los colores del texto están bien combinados y son consistentes.",
    "3. Tuve que aprender algunas cosas antes de poder jugar el juego.",
    "4. Aprender a jugar este juego fue fácil para mí.",
    "5. Creo que la mayoría de las personas podrían aprender a jugar este juego rápidamente.",
    "6. Los controles del juego responden correctamente a mis acciones.",
    "7. Fue fácil entender qué botones o acciones realizar en cada momento.",
    "8. El juego evitó que yo cometa errores graves (por ejemplo, me avisó antes de una acción irreversible).",
    "9. Cuando cometía un error, el juego me ofrecía ayuda o mensajes para corregirlo.",
    "10. Me sentí segura al navegar por las distintas pantallas y menús del juego.",
    "11. El juego me ofreció opciones o configuraciones que podía adaptar a mi forma de jugar.",
    "12. El juego permite personalizar la apariencia según mis preferencias.",
    "13. El juego me resultó motivador para seguir jugando.",
    "14. Sentí que el juego se adaptaba a mi nivel de habilidad.",
    "15. El entorno del juego (fondos, música, efectos) me pareció agradable.",
    "16. La historia o el contexto del juego me resultó relevante e interesante.",
    "17. El juego me mantuvo concentrada y sin distracciones.",
    "18. Las tareas o misiones del juego me parecieron retadoras en la medida justa.",
    "19. Disfruté jugando y me sentí satisfecha/o con la experiencia.",
    "20. Me sentí estresada o ansiosa mientras jugaba.",
    "21. Creí que aprendí conceptos o habilidades nuevas jugando.",
    "22. Pude interactuar con otras jugadoras o personajes de forma significativa.",
    "23. El juego fomentó la colaboración o la competencia de manera adecuada.",
    "24. Las instrucciones dentro del juego (tutoriales, ayudas) fueron claras.",
    "25. Encontré útil la retroalimentación que daba el juego sobre mi desempeño.",
    "26. La estética general del juego (tono, estilo gráfico) me resultó coherente.",
    "27. Los efectos de sonido y la música contribuyeron positivamente a la experiencia.",
    "28. Pude pausar o reanudar el juego cuando lo necesité sin problemas.",
    "29. Las mecánicas de juego (controles, dinámicas) fueron fáciles de recordar.",
    "30. El nivel de desafío se ajustó bien a mi ritmo de aprendizaje.",
    "31. Sentí que estaba progresando y mejorando mis habilidades a medida que jugaba.",
    "32. El juego generó emociones positivas (diversión, curiosidad).",
    "33. En general, estoy satisfecha con esta experiencia de juego.",
    "34. Recomendaría este juego a otras personas interesadas en aprender de forma lúdica.",
    "35. El juego me permitió ajustar aspectos visuales (colores, avatares) según mis gustos."
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
