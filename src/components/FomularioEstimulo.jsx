import { useForm } from "react-hook-form";
import { supabase } from "../supabaseClient";

export default function FormularioEstimulo({ tipoTest = "pre" }) {
  const { register, handleSubmit, reset } = useForm();

  const preguntas = [
    "1. Me gustaría aprender más del cuerpo humano (Puntuación de 1 a 5, donde 1 es 'No me gusta nada' y 5 es 'Me encanta').",
    "2. Siento que la ingeniería es muy difícil para mí (Puntuación de 1 a 5, donde 1 es 'Muy en desacuerdo' y 5 es 'Muy de acuerdo').",
    "3. Me divierte imaginar cómo funcionan las cosas por dentro (Puntuación de 1 a 5, donde 1 es 'No me gusta nada' y 5 es 'Me encanta').",
    "4. Me pregunto muchas veces cómo funcionan las cosas en la naturaleza (Puntuación de 1 a 5, donde 1 es 'nada' y 5 es 'Muchísimo').",
    "5. Me gusta hacer experimentos o descubrir cosas nuevas (Puntuación de 1 a 5, donde 1 es 'No me gusta nada' y 5 es 'Me encanta').",
    "6. A veces siento que la tecnología es complicada y no es para mí (Puntuación de 1 a 5, donde 1 es 'Muy en desacuerdo' y 5 es 'Muy de acuerdo').",
    "7. Me gustaría saber cómo se crean los videojuegos o las aplicaciones (Puntuación de 1 a 5, donde 1 es 'No me gusta nada' y 5 es 'Me encanta').",
    "8. Me emociona pensar en inventar algo usando tecnología  (Puntuación de 1 a 5, donde 1 es 'No me gusta nada' y 5 es 'Me encanta').",
    "9. No me imagino estudiando algo relacionado con STEM cuando sea grande. (Puntuación de 1 a 5, donde 1 es 'Muy en desacuerdo' y 5 es 'Muy de acuerdo').",
    "10. Resolver problemas matemáticos me parece divertido (Puntuación de 1 a 5, donde 1 es 'Muy en desacuerdo' y 5 es 'Muy de acuerdo').",
    "11. A veces las matemáticas me parecen confusas o aburridas (Puntuación de 1 a 5, donde 1 es 'Muy en desacuerdo' y 5 es 'Muy de acuerdo').",
    "12. Me gustaría tener un trabajo en el futuro que use ciencia, tecnología o matemáticas (Puntuación de 1 a 5, donde 1 es 'No me gusta nada' y 5 es 'Me encanta').",
    "13. Me parece interesante construir cosas o resolver problemas con mis manos (Puntuación de 1 a 5, donde 1 es 'No me gusta nada' y 5 es 'Me encanta').",
    "14. Me encanta usar el celular, tablet o la computadora para aprender (Puntuación de 1 a 5, donde 1 es 'No me gusta nada' y 5 es 'Me encanta').",
    "15. Si tuviera que escoger ahora, elegiría una carrera donde pueda inventar, descubrir o resolver problemas (Puntuación de 1 a 5, donde 1 es 'No me gusta nada' y 5 es 'Me encanta').",
    "16. Creo que las personas que trabajan en STEM ayudan a mejorar el mundo (Puntuación de 1 a 5, donde 1 es 'Muy en desacuerdo' y 5 es 'Muy de acuerdo').",
    "17. Me gustaría usar las matemáticas para cosas reales, como hacer un presupuesto o diseñar algo (Puntuación de 1 a 5, donde 1 es 'No me gusta nada' y 5 es 'Me encanta').",
    "18. Me gustaría ser parte de un equipo que crea algo nuevo, como un puente, una máquina o un robot (Puntuación de 1 a 5, donde 1 es 'No me gusta nada' y 5 es 'Me encanta').",
    "19. Siento que la ciencia no tiene mucho que ver conmigo (Puntuación de 1 a 5, donde 1 es 'Muy en desacuerdo' y 5 es 'Muy de acuerdo').",
    "20. Me siento bien cuando logro entender algo difícil en matemáticas (Puntuación de 1 a 5, donde 1 es 'No me gusta nada' y 5 es 'Me encanta')."
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

    const { error } = await supabase.from("cuestionario_estimulacion").insert([respuestas]);

    if (error) {
      console.error("Error Supabase:", error);
      alert("Error al enviar respuestas");
    } else {
      alert("¡Respuestas enviadas gracias por participar!");
      reset();
    }
  };

  return (
    <div className="container mt-4">
      <div className="mx-auto card shadow-lg p-4 p-md-5" style={{ maxWidth: "900px" }}>
        <h1 className="text-center mb-4 text-primary">
          Cuestionario de Estimulación ({tipoTest === "pre" ? "Pre-Test" : "Post-Test"})
        </h1>

                <div>
            <h5>
                Responda las preguntas de acuerdo con su opinión, se presentan las opciones
                de puntaje que van desde 1 (el valor más bajo) hasta 5 (el valor más alto).
            </h5>
            <br />
        </div>
        

        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
          {/* Nombre y Edad */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label fw-bold">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tu nombre"
                {...register("name", { required: true })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Edad</label>
              <input
                type="number"
                className="form-control"
                min={3}
                max={120}
                {...register("age", { required: true })}
                required
              />
            </div>
          </div>

          {/* Preguntas */}
          {preguntas.map((pregunta, i) => (
            <div key={i} className="mb-4">
              <label className="form-label fw-semibold">{pregunta}</label>
              <select
                className="form-select"
                {...register(`q${i + 1}`, { required: true })}
                required
              >
                <option value="">Selecciona una opción</option>
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
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
