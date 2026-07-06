const fs = require("fs");
const path = require("path");

// =====================================

function exportarPartida(game, jugadores) {

    const ahora = new Date();

    const fecha =
        ahora.getFullYear() + "-" +
        String(ahora.getMonth() + 1).padStart(2, "0") + "-" +
        String(ahora.getDate()).padStart(2, "0") + "_" +
        String(ahora.getHours()).padStart(2, "0") + "-" +
        String(ahora.getMinutes()).padStart(2, "0");

    const carpeta = path.join(

        __dirname,

        "..",

        "data",

        "resultados",

        `${fecha}_${game.cuestionarioSeleccionado}`

    );

    fs.mkdirSync(carpeta, { recursive: true });

    generarResumen(carpeta, jugadores);

    generarResultados(carpeta, jugadores);

    generarEstadisticas(
        carpeta,
        game,
        jugadores
    );
    
    generarInformeHTML(
    carpeta,
    game,
    jugadores
);


    console.log("");

    console.log("📁 Exportado en:");

    console.log(carpeta);

}

// =====================================

function generarResumen(carpeta, jugadores) {

    let csv =
        "Numero;Nombre;Aciertos;Fallos;Nota\n";

    jugadores.forEach(j => {

        csv +=

            `${j.numero};` +
            `${j.nombre};` +
            `${j.puntos};` +
            `${j.historial.length - j.puntos};` +
            `${j.nota}\n`;

    });

    fs.writeFileSync(

        path.join(carpeta, "resumen.csv"),

        csv,

        "utf8"

    );

}

// =====================================

function generarResultados(carpeta, jugadores) {

    let csv =
        "Numero;Nombre;Pregunta;Enunciado;Respuesta;Correcta;Resultado\n";

    jugadores.forEach(jugador => {

        jugador.historial.forEach(item => {

            csv +=

                `${jugador.numero};` +

                `${jugador.nombre};` +

                `${item.numeroPregunta};` +

                `"${item.pregunta}";` +

                `"${item.textoElegido}";` +

                `"${item.textoCorrecto}";` +

                `${item.acierto ? "Correcta" : "Incorrecta"}\n`;

        });

    });

    fs.writeFileSync(

        path.join(carpeta, "resultados.csv"),

        csv,

        "utf8"

    );

}

// =====================================

function generarEstadisticas(
    carpeta,
    game,
    jugadores
) {

    let csv =
        "Pregunta;Aciertos;Fallos;Porcentaje\n";

    game.cuestionario.forEach((pregunta, indice) => {

        let aciertos = 0;

        jugadores.forEach(j => {

            if (
                j.historial[indice].acierto
            ) {

                aciertos++;

            }

        });

        const fallos =
            jugadores.length - aciertos;

        const porcentaje =

            jugadores.length === 0

                ? 0

                : (

                    aciertos * 100 /

                    jugadores.length

                ).toFixed(1);

        csv +=

            `${indice + 1};` +

            `${aciertos};` +

            `${fallos};` +

            `${porcentaje}%\n`;

    });

    fs.writeFileSync(

        path.join(carpeta, "estadisticas.csv"),

        csv,

        "utf8"

    );

}
// =====================================
// INFORME HTML
// =====================================

function generarInformeHTML(
    carpeta,
    game,
    jugadores
) {

    let html = `<!DOCTYPE html>

<html lang="es">

<head>

<meta charset="UTF-8">

<title>Informe AulaQuiz by Lobotic</title>

<style>

*{

    box-sizing:border-box;

}

body{

    font-family:Arial,Helvetica,sans-serif;

    margin:20px;

    color:black;

    background:white;

    font-size:12px;

}

h1{

    text-align:center;

    margin-bottom:10px;

}

.cabecera{

    border:2px solid black;

    padding:10px;

    margin-bottom:15px;

}

.cabecera h2{

    margin:0 0 10px 0;

}

.resumen{

    display:flex;

    justify-content:space-between;

    font-weight:bold;

}

.preguntas{

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:10px;

    margin-top:15px;

}

.tarjeta{

    border:1px solid black;

    padding:8px;

    break-inside:avoid;

}

.tarjeta h3{

    margin:0 0 6px 0;

    font-size:14px;

}

.enunciado{

    font-weight:bold;

    margin-bottom:8px;

}

.opcion{

    margin:2px 0;

}

.correcta{

    font-weight:bold;

}

.salto{

    page-break-after:always;

}

@media print{

    body{

        margin:10mm;

    }

}

</style>

</head>

<body>

<h1>AulaQuiz</h1>

`;

    jugadores.forEach(jugador => {

        html += `

<div class="cabecera">

<h2>${jugador.numero} - ${jugador.nombre}</h2>

<div class="resumen">

<span>Cuestionario: ${game.cuestionarioSeleccionado}</span>

<span>Aciertos: ${jugador.puntos}/${jugador.historial.length}</span>

<span>Nota: ${jugador.nota}</span>

</div>

</div>

<div class="preguntas">

`;

        jugador.historial.forEach(item => {

            html += `

<div class="tarjeta">

<h3>

${item.acierto ? "✔" : "✘"}

Pregunta ${item.numeroPregunta}

</h3>

<div class="enunciado">

${item.pregunta}

</div>

`;

            item.opciones.forEach((opcion, indice) => {

                let marca = "☐";

                if (indice === item.respuestaElegida) {

                    marca = "☑";

                }

                const correcta =
                    indice === item.respuestaCorrecta;

                html += `

<div class="opcion ${correcta ? "correcta" : ""}">

${marca}

${opcion}

${correcta ? " ✔" : ""}

</div>

`;

            });

            html += `

</div>

`;

        });

        html += `

</div>

<div style="margin-top:20px;font-size:13px;font-weight:bold;">

Resumen

<br><br>

Aciertos: ${jugador.puntos}

<br>

Fallos: ${jugador.historial.length - jugador.puntos}

<br>

Nota final: ${jugador.nota}/10

</div>

<div class="salto"></div>

`;

    });

    html += `

</body>

</html>

`;

    fs.writeFileSync(

        path.join(carpeta, "informe.html"),

        html,

        "utf8"

    );

}

// =====================================

module.exports = {

    exportarPartida

};
