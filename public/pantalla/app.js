const socket = io();

const pantalla =
    document.getElementById("pantalla");

socket.on("estadoPartida", (game) => {

    switch (game.estado) {

        case "esperando":

            mostrarEspera(game);

            break;

        case "jugando":

            pantalla.innerHTML =
                "<h1>Comienza el juego...</h1>";

            break;

        case "finalizada":

            pantalla.innerHTML =
                "<h1>Juego terminado</h1>";

            break;

    }

});

socket.on("listaAlumnos", alumnos => {

    const contador =
        document.getElementById("contador");

    if (contador) {

        contador.textContent =
            alumnos.length;

    }

});

function mostrarEspera(game) {

    pantalla.innerHTML = `

<div class="espera">

<h1>AulaQuiz</h1>

<div class="qr">

QR

</div>

<div class="direccion">

${window.location.origin}/alumno

</div>

<div class="info">

<div>

<b>Cuestionario</b>

<br>

${game.cuestionarioSeleccionado || "Sin seleccionar"}

</div>

<div>

<b>Alumnado conectado</b>

<br>

<span id="contador">0</span>

</div>

</div>

<p>

Esperando al profesorado...

</p>

</div>

`;

}
