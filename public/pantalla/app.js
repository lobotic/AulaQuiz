const socket = io();

const espera = document.getElementById("espera");
const juego = document.getElementById("juego");
const fin = document.getElementById("fin");

const qr = document.getElementById("qr");

const numeroPregunta = document.getElementById("numeroPregunta");
const pregunta = document.getElementById("pregunta");
const opciones = document.getElementById("opciones");
const alumnos = document.getElementById("alumnos");
let tiempo = 20;
let temporizador = null;

// =====================
// Cargar QR
// =====================

fetch("/qr")
    .then(res => res.json())
    .then(data => {

        qr.src = data.qr;

    });

// =====================
// Estado de la partida
// =====================

socket.on("estadoPartida", (game) => {

    if (game.estado === "esperando") {

        espera.style.display = "flex";
        juego.style.display = "none";
        fin.style.display = "none";

    }

    if (game.estado === "jugando") {

        espera.style.display = "none";
        juego.style.display = "flex";
        fin.style.display = "none";

    }

    if (game.estado === "finalizada") {

        espera.style.display = "none";
        juego.style.display = "none";
        fin.style.display = "flex";

    }

});

// =====================
// Nueva pregunta
// =====================

socket.on("nuevaPregunta", (p) => {

    clearInterval(temporizador);

tiempo = 20;

contador.textContent = tiempo;

temporizador = setInterval(() => {

    tiempo--;

    contador.textContent = tiempo;

    if (tiempo <= 0) {

        clearInterval(temporizador);

    }

}, 1000);
    numeroPregunta.textContent = "Pregunta";

    pregunta.textContent = p.pregunta;

    opciones.innerHTML = "";

    p.opciones.forEach((texto, i) => {

        opciones.innerHTML += `
            <div class="opcion">
                ${String.fromCharCode(65 + i)}) ${texto}
            </div>
        `;

    });

});

// =====================
// Lista de alumnos
// =====================

socket.on("listaAlumnos", (lista) => {

    alumnos.innerHTML = "";

    lista.forEach(a => {

        alumnos.innerHTML += `
            <div class="alumno">
                ${a.haRespondido ? "✅" : "⏳"} ${a.nombre}
            </div>
        `;

    });

});
