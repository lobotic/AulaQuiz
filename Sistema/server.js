const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const os = require("os");
const qrcode = require("qrcode-terminal");
const QRCode = require("qrcode");

const configurarSockets = require("./src/sockets");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const { exec } = require("child_process");

// SOCKETS
configurarSockets(io);

// STATIC (TODO público)
app.use(express.static("public"));

// RUTAS EXPLÍCITAS (SIN AMBIGÜEDAD)
app.get("/alumno", (req, res) => {
    res.sendFile(__dirname + "/public/alumno/index.html");
});

app.get("/profesor", (req, res) => {
    res.sendFile(__dirname + "/public/profesor/index.html");
});

app.get("/pantalla", (req, res) => {
    res.sendFile(__dirname + "/public/pantalla/index.html");
});

app.get("/qr", (req, res) => {
    res.json({
        qr: qrAlumno
    });
});

// IP
function obtenerIP() {
    const interfaces = os.networkInterfaces();

    for (const name in interfaces) {
        for (const net of interfaces[name]) {
            if (net.family === "IPv4" && !net.internal) {
                return net.address;
            }
        }
    }
    return "localhost";
}

// START
let qrAlumno = "";

server.listen(3000, "0.0.0.0", () => {

    const ip = obtenerIP();
    const url = `http://${ip}:3000`;

    QRCode.toDataURL(url + "/alumno")
        .then(qr => {

            qrAlumno = qr;

        })
        .catch(console.error);

    console.clear();

    console.log("==================================");
    console.log("           AulaQuiz");
    console.log("==================================\n");

    console.log("Alumno   :", url + "/alumno");
    console.log("Profesor :", url + "/profesor");
    console.log("Pantalla :", url + "/pantalla\n");

    qrcode.generate(url + "/alumno", { small: true });

    console.log("\nEsperando conexiones...\n");

    // Abrir automáticamente las páginas
    exec(`xdg-open ${url}/alumno`);
    exec(`xdg-open ${url}/pantalla`);
    exec(`xdg-open ${url}/profesor`);

});
