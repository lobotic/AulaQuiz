const jugadores = [];

// =====================================
// AÑADIR JUGADOR
// =====================================

function añadir(numero, nombre, socketId) {

    const existe = jugadores.find(
        j => j.numero === numero
    );

    if (existe) return false;

    jugadores.push({

        numero,
        nombre,
        socketId,

        // Resultado
        puntos: 0,
        nota: 0,

        // Pregunta actual
        respuestaActual: null,
        haRespondido: false,

        // Historial completo
        historial: []

    });

    return true;

}

// =====================================
// LISTAR
// =====================================

function listar() {

    return jugadores;

}

// =====================================
// BUSCAR POR SOCKET
// =====================================

function buscarPorSocket(socketId) {

    return jugadores.find(
        j => j.socketId === socketId
    );

}

// =====================================
// REINICIAR RESPUESTAS
// =====================================

function reiniciarRespuestas() {

    jugadores.forEach(j => {

        j.respuestaActual = null;
        j.haRespondido = false;

    });

}

// =====================================
// GUARDAR RESPUESTA
// =====================================

function guardarRespuesta(jugador, pregunta, respuestaElegida) {

    jugador.historial.push({

        numeroPregunta: pregunta.numero,

        pregunta: pregunta.pregunta,

        opciones: [...pregunta.opciones],

        respuestaElegida,

        respuestaCorrecta: pregunta.correcta,

        textoElegido:

            respuestaElegida !== null

                ? pregunta.opciones[respuestaElegida]

                : "",

        textoCorrecto:

            pregunta.opciones[pregunta.correcta],

        acierto:

            respuestaElegida === pregunta.correcta

    });

}

// =====================================
// CALCULAR NOTA
// =====================================

function calcularNotas(totalPreguntas) {

    jugadores.forEach(j => {

        if (totalPreguntas === 0) {

            j.nota = 0;

            return;

        }

        j.nota = Number(
            (
                j.puntos * 10 /
                totalPreguntas
            ).toFixed(2)
        );

    });

}

// =====================================
// REINICIAR PARTIDA
// =====================================

function reiniciarPartida() {

    jugadores.forEach(j => {

        j.puntos = 0;

        j.nota = 0;

        j.respuestaActual = null;

        j.haRespondido = false;

        j.historial = [];

    });

}

// =====================================
// BORRAR TODOS
// =====================================

function borrarTodos() {

    jugadores.length = 0;

}

// =====================================

module.exports = {

    añadir,

    listar,

    buscarPorSocket,

    reiniciarRespuestas,

    guardarRespuesta,

    calcularNotas,

    reiniciarPartida,

    borrarTodos

};
