// ======================================
// ESTADO GLOBAL DE LA PARTIDA
// ======================================

function generarPIN() {

    return Math.floor(
        100000 + Math.random() * 900000
    ).toString();

}

const game = {

    // Datos generales
    pin: generarPIN(),

    estado: "esperando",      // esperando | jugando | finalizada

    // Cuestionario
    cuestionarioSeleccionado: null,

    cuestionario: null,

    preguntaActual: 0,

    // Temporizador (lo usaremos después)
    tiempoPregunta: 20,

    tiempoRestante: 20

};

module.exports = game;
