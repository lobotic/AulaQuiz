const fs = require("fs");
const path = require("path");

const carpeta = path.join(__dirname, "../../cuestionarios");

// ===============================
// LISTAR CUESTIONARIOS
// ===============================

function listarCuestionarios() {

    if (!fs.existsSync(carpeta)) return [];

    return fs.readdirSync(carpeta)

        .filter(f => f.endsWith(".json"))

        .map(f => f.replace(".json", ""))

        .sort();

}

// ===============================
// CARGAR CUESTIONARIO
// ===============================

function cargarCuestionario(nombre) {

    const archivo = path.join(carpeta, nombre + ".json");

    if (!fs.existsSync(archivo)) {

        throw new Error(
            `No existe el cuestionario ${nombre}`
        );

    }

    return JSON.parse(
        fs.readFileSync(archivo, "utf8")
    );

}

// ===============================
// GUARDAR CUESTIONARIO
// ===============================

function guardarCuestionario(nombre, preguntas) {

    if (!nombre || !nombre.trim()) {

        throw new Error(
            "El cuestionario debe tener un nombre."
        );

    }

    const archivo = path.join(
        carpeta,
        nombre.replace(".json", "") + ".json"
    );

    fs.writeFileSync(

        archivo,

        JSON.stringify(
            preguntas,
            null,
            4
        ),

        "utf8"

    );

}

module.exports = {

    listarCuestionarios,
    cargarCuestionario,
    guardarCuestionario

};
