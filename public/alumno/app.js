const socket = io();

// =====================================
// REGISTRO
// =====================================

const numero = document.getElementById("numero");
const nombre = document.getElementById("nombre");
const entrar = document.getElementById("entrar");
const estado = document.getElementById("estado");

// =====================================
// JUEGO
// =====================================

const registro = document.getElementById("registro");
const juego = document.getElementById("juego");

const pregunta = document.getElementById("pregunta");

const opA = document.getElementById("opA");
const opB = document.getElementById("opB");
const opC = document.getElementById("opC");
const opD = document.getElementById("opD");

const botones = document.querySelectorAll(".respuesta");

const enviar = document.getElementById("enviar");

const estadoJuego = document.getElementById("estadoJuego");

let respuestaSeleccionada = null;

// =====================================
// CONEXIÓN
// =====================================

socket.on("connect", () => {

    console.log("Conectado:", socket.id);

});

// =====================================
// REGISTRO
// =====================================

entrar.addEventListener("click", () => {

    socket.emit("registrarAlumno", {

        numero: Number(numero.value),

        nombre: nombre.value.trim()

    });

});

socket.on("listaAlumnos", () => {

    estado.textContent = "✔ Registrado";

    registro.classList.add("oculto");

    juego.classList.remove("oculto");

});

socket.on("errorRegistro", (mensaje) => {

    estado.textContent = mensaje;

});

// =====================================
// NUEVA PREGUNTA
// =====================================

socket.on("nuevaPregunta", (datos) => {

    console.log(datos);

    respuestaSeleccionada = null;

    botones.forEach((b) => {

        b.disabled = false;
        b.classList.remove("activa");

    });

    enviar.disabled = true;

    estadoJuego.textContent = "";

    pregunta.textContent = datos.pregunta;

    opA.textContent = datos.opciones[0];
    opB.textContent = datos.opciones[1];
    opC.textContent = datos.opciones[2];
    opD.textContent = datos.opciones[3];

});

// =====================================
// SELECCIÓN DE RESPUESTA
// =====================================

botones.forEach((boton) => {

    boton.addEventListener("click", () => {

        const opcion = Number(boton.dataset.opcion);

        // Deseleccionar si se pulsa la misma opción
        if (respuestaSeleccionada === opcion) {

            respuestaSeleccionada = null;

            boton.classList.remove("activa");

            enviar.disabled = true;

            return;

        }

        respuestaSeleccionada = opcion;

        botones.forEach((b) => {

            b.classList.remove("activa");

        });

        boton.classList.add("activa");

        enviar.disabled = false;

    });

});

// =====================================
// ENVIAR RESPUESTA
// =====================================

enviar.addEventListener("click", () => {

    if (respuestaSeleccionada === null) return;

    socket.emit("responder", {

        respuesta: respuestaSeleccionada

    });

    botones.forEach((b) => {

        b.disabled = true;

    });

    enviar.disabled = true;

    estadoJuego.textContent = "✔ Respuesta enviada";

});

// =====================================
// ESTADO PARTIDA
// =====================================

socket.on("estadoPartida", (game) => {

    console.log(game);

});

// =====================================
// FIN DE LA PARTIDA
// =====================================

socket.on("finPartida", () => {

    pregunta.textContent = "🎉 Fin del juego";

    opA.textContent = "";
    opB.textContent = "";
    opC.textContent = "";
    opD.textContent = "";

    botones.forEach((b) => {

        b.disabled = true;
        b.classList.remove("activa");

    });

    enviar.disabled = true;

    estadoJuego.textContent = "Gracias por participar.";

});
