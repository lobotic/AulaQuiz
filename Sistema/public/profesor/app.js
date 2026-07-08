const socket = io();

console.log("🔥 Profesor conectado");

// =====================================
// ELEMENTOS
// =====================================

const lista = document.getElementById("lista");
const comenzar = document.getElementById("comenzar");
const siguiente = document.getElementById("siguiente");
const selector = document.getElementById("cuestionario");

// =====================================
// CONEXIÓN
// =====================================

socket.on("connect", () => {

    console.log("✅ Socket:", socket.id);

});

// =====================================
// LISTA DE CUESTIONARIOS
// =====================================

socket.on("listaCuestionarios", (cuestionarios) => {

    selector.innerHTML = "";

    cuestionarios.forEach(nombre => {

        const option = document.createElement("option");

        option.value = nombre;
        option.textContent = nombre;

        selector.appendChild(option);

    });

    // Seleccionar automáticamente el primero
    if (cuestionarios.length > 0) {

        selector.value = cuestionarios[0];

        socket.emit(
            "seleccionarCuestionario",
            cuestionarios[0]
        );

    }

});

// Cambio manual de cuestionario
selector.addEventListener("change", () => {

    socket.emit(
        "seleccionarCuestionario",
        selector.value
    );

});

// =====================================
// LISTA DE ALUMNOS
// =====================================

socket.on("listaAlumnos", (alumnos) => {

    lista.innerHTML = "";

    alumnos.forEach(alumno => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${alumno.numero}</td>

            <td>${alumno.nombre}</td>

            <td class="estado">
                ${alumno.haRespondido ? "🟢" : "🔴"}
            </td>

            <td class="puntos">
                ${alumno.puntos}
            </td>
        `;

        lista.appendChild(fila);

    });

});

// =====================================
// ESTADO DE LA PARTIDA
// =====================================

socket.on("estadoPartida", (game) => {

    if (game.cuestionarioSeleccionado) {

        selector.value = game.cuestionarioSeleccionado;

    }

});

// =====================================
// BOTONES
// =====================================

comenzar.addEventListener("click", () => {

    socket.emit("comenzarPartida");

});

siguiente.addEventListener("click", () => {

    socket.emit("siguientePregunta");

});


// =====================================
// SALIR
// =====================================

document
    .getElementById("btnSalir")
    .addEventListener("click", () => {

        if (

            confirm(
                "¿Desea cerrar AulaQuiz?"
            )

        ) {

            socket.emit(
                "cerrarServidor"
            );

        }

    });
