const socket = io();

const preguntas =
    document.getElementById("preguntas");

const totalPreguntas =
    document.getElementById("totalPreguntas");

const btnAñadir =
    document.getElementById("btnAñadir");

const btnGuardar =
    document.getElementById("btnGuardar");

// ======================================
// EVENTOS
// ======================================

btnAñadir.addEventListener(
    "click",
    añadirPregunta
);

btnGuardar.addEventListener(
    "click",
    guardarCuestionario
);

// ======================================
// AÑADIR PREGUNTA
// ======================================

function añadirPregunta() {

    preguntas.insertAdjacentHTML(

        "beforeend",

        crearPregunta()

    );

    renumerarPreguntas();

}

// ======================================
// CREAR PREGUNTA
// ======================================

function crearPregunta() {

    return `

    <article class="pregunta">

        <h2>

            Pregunta

        </h2>

        <label>

            Enunciado

        </label>

        <input
            type="text"
            class="enunciado">

        <label>

            Opción A

        </label>

        <input
            type="text"
            class="opcion">

        <label>

            Opción B

        </label>

        <input
            type="text"
            class="opcion">

        <label>

            Opción C

        </label>

        <input
            type="text"
            class="opcion">

        <label>

            Opción D

        </label>

        <input
            type="text"
            class="opcion">

        <label>

            Respuesta correcta

        </label>

        <select class="correcta">

            <option value="0">A</option>
            <option value="1">B</option>
            <option value="2">C</option>
            <option value="3">D</option>

        </select>

        <button
            onclick="eliminarPregunta(this)">

            Eliminar pregunta

        </button>

    </article>

    `;

}

// ======================================
// ELIMINAR
// ======================================

function eliminarPregunta(boton) {

    boton
        .closest(".pregunta")
        .remove();

    renumerarPreguntas();

}

// ======================================
// RENUMERAR
// ======================================

function renumerarPreguntas() {

    const lista =
        document.querySelectorAll(".pregunta");

    lista.forEach((pregunta, indice) => {

        pregunta.querySelector("h2").textContent =

            "Pregunta " + (indice + 1);

    });

    totalPreguntas.textContent = lista.length;

}

// ======================================
// RECOGER FORMULARIO
// ======================================

function recogerFormulario() {

    const lista = [];

    document

        .querySelectorAll(".pregunta")

        .forEach(bloque => {

            const opciones =

                bloque.querySelectorAll(
                    ".opcion"
                );

            lista.push({

                pregunta:

                    bloque.querySelector(
                        ".enunciado"
                    ).value.trim(),

                opciones: [

                    opciones[0].value.trim(),
                    opciones[1].value.trim(),
                    opciones[2].value.trim(),
                    opciones[3].value.trim()

                ],

                correcta:

                    Number(

                        bloque.querySelector(
                            ".correcta"
                        ).value

                    )

            });

        });

    return lista;

}

// ======================================
// GUARDAR
// ======================================

function guardarCuestionario() {

    const nombre =

        document
            .getElementById("nombre")
            .value
            .trim();

    if (!nombre) {

        alert(
            "Debe indicar un nombre para el cuestionario."
        );

        return;

    }

    const cuestionario =
        recogerFormulario();

    socket.emit(

        "guardarCuestionario",

        {

            nombre,

            preguntas:
                cuestionario

        }

    );

}

// ======================================
// RESPUESTA SERVIDOR
// ======================================

socket.on(

    "cuestionarioGuardado",

    () => {

        alert(
            "Cuestionario guardado correctamente."
        );

        location.href =
            "/profesor";

    }

);

// ======================================
// INICIO
// ======================================

añadirPregunta();
