# AulaQuiz

**AulaQuiz** es una aplicación web de código abierto para realizar cuestionarios interactivos en el aula utilizando la red local del centro, sin necesidad de conexión a Internet.

El proyecto está pensado para funcionar en entornos educativos como MAX (Madrid_Linux), Ubuntu y cualquier sistema capaz de ejecutar Node.js.

---

## Objetivos

- 100 % software libre.
- Funcionamiento íntegro en la red local.
- Sin depender de servicios externos.
- Compatible con ordenadores, tablets y móviles.
- Pensado para el profesorado.

---

## Tecnologías

- Node.js
- Express
- Socket.IO
- HTML5
- CSS3
- JavaScript

---

## Estructura del proyecto

```
aulaquiz/
│
├── data/
│   ├── configuracion.json
│   ├── cuestionarios/
│   └── resultados/
│
├── public/
│   ├── alumno/
│   ├── profesor/
│   ├── pantalla/
│   └── assets/
│
├── src/
│
├── package.json
├── server.js
└── README.md
```

---

## Instalación

Clonar el proyecto o descargar el código.

Instalar las dependencias:

```bash
npm install
```

---

## Ejecución

```bash
node server.js
```

El servidor mostrará automáticamente:

- Dirección IP local.
- URL de acceso.
- Código QR para que el alumnado pueda conectarse.

---

## Estado del proyecto

Versión actual: **0.1**

### Implementado

- Servidor Express.
- Comunicación mediante Socket.IO.
- Registro de alumnado.
- Acceso desde la red local.
- Código QR automático.

### En desarrollo

- Gestión de partidas.
- PIN de acceso.
- Banco de cuestionarios.
- Temporizador.
- Sistema de puntuación.
- Exportación de resultados.

---

## Filosofía

AulaQuiz pretende ser una alternativa libre a plataformas comerciales de cuestionarios, permitiendo que cualquier docente pueda utilizarla sin depender de Internet ni de servicios de terceros.

Todos los datos permanecen bajo el control del profesorado.

---

## Licencia

Pendiente de decidir.

Se recomienda utilizar la licencia **GPL v3**.
