const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const os = require("os");
const qrcode = require("qrcode-terminal");

const configurarSockets = require("./src/sockets");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
server.listen(3000, "0.0.0.0", () => {

    const ip = obtenerIP();
    const url = `http://${ip}:3000`;

    console.clear();

    console.log("==================================");
    console.log("           AulaQuiz");
    console.log("==================================\n");

    console.log("Alumno   :", url + "/alumno");
    console.log("Profesor :", url + "/profesor");
    console.log("Pantalla :", url + "/pantalla\n");

    qrcode.generate(url + "/alumno", { small: true });

    console.log("\nEsperando conexiones...\n");
});
