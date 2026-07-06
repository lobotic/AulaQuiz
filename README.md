# AulaQuiz

Aplicación web para realizar cuestionarios interactivos en el aula mediante una red local.

El profesor controla la partida desde su ordenador, los alumnos responden desde cualquier dispositivo móvil mediante un código QR y una pantalla principal muestra en tiempo real el desarrollo del cuestionario.

---

## Características

- Registro de alumnos mediante código QR.
- Selección de cuestionarios en formato JSON.
- Preguntas de opción múltiple.
- Respuestas en tiempo real mediante Socket.IO.
- Pantalla de proyección para el aula.
- Contador visual por pregunta.
- Estado de respuesta de cada alumno.
- Corrección automática.
- Cálculo de notas.
- Exportación automática al finalizar la partida.
- Generación de:
  - `resumen.csv`
  - `resultados.csv`
  - `estadisticas.csv`
  - `informe.html` listo para imprimir o guardar como PDF.

---

# Tecnologías

- Node.js
- Express
- Socket.IO
- QRCode
- QRCode Terminal
- HTML5
- CSS3
- JavaScript

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/TU_USUARIO/aulaquiz.git
cd aulaquiz
```

Instalar dependencias:

```bash
npm install
```

---

# Dependencias

El proyecto utiliza:

```text
express
socket.io
qrcode
qrcode-terminal
```

Si fuese necesario instalarlas manualmente:

```bash
npm install express socket.io qrcode qrcode-terminal
```

---

# Ejecutar

Iniciar el servidor:

```bash
node server.js
```

Aparecerá algo parecido a:

```
Alumno   : http://192.168.1.35:3000/alumno
Profesor : http://192.168.1.35:3000/profesor
Pantalla : http://192.168.1.35:3000/pantalla
```

También se mostrará un código QR en la terminal para acceder directamente desde los dispositivos de los alumnos.

---

# Crear cuestionarios

Los cuestionarios se guardan en:

```
data/cuestionarios
```

Cada cuestionario es un archivo JSON.

Ejemplo:

```json
[
  {
    "pregunta": "¿Capital de Francia?",
    "opciones": [
      "Madrid",
      "París",
      "Roma",
      "Lisboa"
    ],
    "correcta": 1
  }
]
```

---

# Exportación

Al finalizar una partida se crea automáticamente una carpeta en:

```
data/resultados/
```

Ejemplo:

```
2026-07-06_20-30_Ciencias
```

Dentro se generan:

### resumen.csv

Resumen de calificaciones.

### resultados.csv

Todas las respuestas de todos los alumnos.

### estadisticas.csv

Porcentaje de aciertos por pregunta.

### informe.html

Informe individual de cada alumno preparado para imprimir o guardar como PDF.

Cada alumno comienza en una página independiente.

---

# Requisitos

- Node.js 18 o superior recomendado.
- Todos los dispositivos deben estar conectados a la misma red local.

---


# Licencia


 **GPL v3**.
