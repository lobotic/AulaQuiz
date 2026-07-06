const game = require("./game");
const players = require("./players");
const exportar = require("./exportar");

const {
    cargarCuestionario,
    listarCuestionarios
} = require("./questions");

function configurarSockets(io) {

    io.on("connection", (socket) => {

        console.log("🔌 Conectado:", socket.id);

        // =====================================
        // ESTADO INICIAL
        // =====================================

        socket.emit(
            "estadoPartida",
            game
        );

        socket.emit(
            "listaCuestionarios",
            listarCuestionarios()
        );

        // =====================================
        // SELECCIÓN DE CUESTIONARIO
        // =====================================

        socket.on("seleccionarCuestionario", (nombre) => {

            console.log(
                "📚 Cuestionario seleccionado:",
                nombre
            );

            game.cuestionarioSeleccionado = nombre;

            io.emit(
                "estadoPartida",
                game
            );

        });

        // =====================================
        // REGISTRO
        // =====================================

        socket.on("registrarAlumno", (datos) => {

            if (game.estado !== "esperando") {

                socket.emit(
                    "errorRegistro",
                    "La partida ya ha comenzado."
                );

                return;

            }

            const ok = players.añadir(
                datos.numero,
                datos.nombre,
                socket.id
            );

            if (!ok) {

                socket.emit(
                    "errorRegistro",
                    "Ese número ya está registrado."
                );

                return;

            }

            io.emit(
                "listaAlumnos",
                players.listar()
            );

        });

        // =====================================
        // COMENZAR
        // =====================================

        socket.on("comenzarPartida", () => {

            if (!game.cuestionarioSeleccionado) {

                console.log(
                    "⚠ No hay cuestionario seleccionado"
                );

                return;

            }

            console.log(
                "🚀 Comenzando",
                game.cuestionarioSeleccionado
            );

            game.cuestionario = cargarCuestionario(
                game.cuestionarioSeleccionado
            );

            game.estado = "jugando";

            game.preguntaActual = 0;

            players.reiniciarPartida();

            io.emit(
                "estadoPartida",
                game
            );

            io.emit(
                "listaAlumnos",
                players.listar()
            );

            io.emit(
                "nuevaPregunta",
                game.cuestionario[0]
            );

        });

        // =====================================
        // RESPUESTA
        // =====================================

        socket.on("responder", (data) => {

            const alumno =
                players.buscarPorSocket(socket.id);

            if (!alumno) return;

            alumno.respuestaActual =
                data.respuesta;

            alumno.haRespondido = true;

            io.emit(
                "listaAlumnos",
                players.listar()
            );

        });

        // =====================================
        // SIGUIENTE
        // =====================================

        socket.on("siguientePregunta", () => {

            if (!game.cuestionario) return;

            const pregunta =
                game.cuestionario[
                    game.preguntaActual
                ];

            players.listar().forEach(alumno => {

                players.guardarRespuesta(

                    alumno,

                    {
                        numero:
                            game.preguntaActual + 1,

                        pregunta:
                            pregunta.pregunta,

                        opciones:
                            pregunta.opciones,

                        correcta:
                            pregunta.correcta

                    },

                    alumno.respuestaActual

                );

                if (
                    alumno.respuestaActual ===
                    pregunta.correcta
                ) {

                    alumno.puntos++;

                }

            });

            io.emit(
                "listaAlumnos",
                players.listar()
            );

            game.preguntaActual++;

            if (
                game.preguntaActual >=
                game.cuestionario.length
            ) {

                game.estado = "finalizada";

               players.calcularNotas(
    game.cuestionario.length
);

// Exportar datos de la partida
exportar.exportarPartida(
    game,
    players.listar()
);

io.emit(
    "listaAlumnos",
    players.listar()
);

io.emit(
    "estadoPartida",
    game
);

io.emit(
    "finPartida"
);

console.log(
    "🏁 Fin del cuestionario"
);

return;

            }

            players.reiniciarRespuestas();

            io.emit(
                "listaAlumnos",
                players.listar()
            );

            io.emit(
                "nuevaPregunta",
                game.cuestionario[
                    game.preguntaActual
                ]
            );

        });

        // =====================================
        // DESCONECTAR
        // =====================================

        socket.on("disconnect", () => {

            console.log(
                "❌ Desconectado:",
                socket.id
            );

        });

    });

}

module.exports = configurarSockets;
