# AulaQuiz

## Manual de usuario

**Versión 1.0**

Aplicación para realizar cuestionarios interactivos en el aula mediante la red local.

---

# 1. Descripción

AulaQuiz es una aplicación que permite realizar cuestionarios tipo test de forma sencilla utilizando cualquier navegador web.

El profesorado controla la actividad desde su ordenador, mientras que el alumnado participa utilizando sus teléfonos móviles, tabletas o cualquier otro dispositivo conectado a la misma red local.

No requiere conexión a Internet durante su utilización. Toda la información permanece en el ordenador del docente.

Entre sus principales funciones destacan:

- Cuestionarios con preguntas tipo test.
- Acceso del alumnado mediante código QR.
- Control de la actividad en tiempo real.
- Corrección automática.
- Exportación de informes individuales y generales.
- Funcionamiento completamente local, sin servidores externos.

---

# 2. Características

- Interfaz sencilla e intuitiva.
- Compatible con cualquier navegador moderno.
- No requiere instalar software en los dispositivos del alumnado.
- Acceso mediante código QR.
- Corrección automática.
- Generación de informes.
- Posibilidad de añadir nuevos cuestionarios simplemente copiando archivos JSON.
- No necesita conexión a Internet una vez iniciada la aplicación.

---

# 3. Requisitos

Para utilizar AulaQuiz únicamente es necesario:

- Un ordenador con Linux de 64 bits.
- Un navegador web.
- Todos los dispositivos conectados a la misma red local (Wi-Fi o cable).

No es necesario instalar Node.js ni ninguna otra dependencia adicional.

---

# 4. Instalación

La instalación de AulaQuiz solo es necesaria la primera vez.

Una vez realizada, bastará con hacer doble clic sobre el acceso directo para iniciar la aplicación.

## Paso 1. Descomprimir AulaQuiz

Descargue el archivo comprimido de AulaQuiz.

Haga doble clic sobre él y extraiga la carpeta **AulaQuiz** en el lugar que prefiera (por ejemplo, el Escritorio o la carpeta Documentos).

Obtendrá una estructura similar a esta:

```text
AulaQuiz/
```

## Paso 2. Abrir una terminal

1. Abra la carpeta **AulaQuiz**.
2. Haga clic con el botón derecho sobre una zona vacía.
3. Seleccione **Abrir en un terminal**.

Se abrirá una ventana negra con un cursor parpadeando.

## Paso 3. Ejecutar AulaQuiz

Escriba exactamente:

```bash
./AulaQuiz
```

y pulse **Intro**.

Es importante escribir los caracteres `./` delante de `AulaQuiz`.

La primera vez aparecerá un mensaje indicando que se ha creado un acceso directo.

También se abrirán automáticamente:

- la página del profesor;
- la pantalla principal del cuestionario.

## Paso 4. Cerrar AulaQuiz

Cuando termine de utilizar la aplicación, cierre la ventana de la terminal.

Al cerrarla, AulaQuiz finalizará automáticamente.

## Paso 5. Utilizar el acceso directo

Después de la primera ejecución aparecerá un nuevo archivo llamado:

```text
Iniciar AulaQuiz.desktop
```

A partir de ese momento ya no será necesario utilizar la terminal.

Bastará con hacer doble clic sobre dicho acceso directo.

### Si aparece un aviso de seguridad

En algunas distribuciones Linux, la primera vez puede aparecer un aviso preguntando cómo desea abrir el archivo.

Seleccione:

**Ejecutar**

Si el sistema pregunta si confía en el acceso directo, confirme la operación.

Este aviso normalmente solo aparece la primera vez.

## Actualizar los cuestionarios

Para añadir nuevos cuestionarios basta con copiar los archivos `.json` dentro de la carpeta:

```text
Cuestionarios/
```

No es necesario reinstalar AulaQuiz.

## Actualizar AulaQuiz

Cuando publique una nueva versión únicamente será necesario sustituir la carpeta:

```text
Sistema/
```

Los cuestionarios y los resultados se conservarán automáticamente.

---

# 5. Uso

## Añadir cuestionarios

Copie los archivos `.json` dentro de:

```text
Cuestionarios/
```

## Iniciar una sesión

1. Haga doble clic sobre **Iniciar AulaQuiz**.
2. Se abrirán automáticamente las páginas del profesor y de la pantalla principal.
3. El alumnado accederá escaneando el código QR.
4. El profesorado seleccionará el cuestionario y pulsará **Comenzar**.

## Durante el cuestionario

El profesorado puede:

- visualizar el alumnado conectado;
- comprobar quién ha respondido;
- avanzar manualmente a la siguiente pregunta;
- consultar la puntuación en tiempo real.

## Finalizar

Al finalizar se generarán automáticamente los informes dentro de:

```text
Resultados/
```

---

# 6. Estructura de carpetas

```text
AulaQuiz/
│
├── AulaQuiz
├── Iniciar AulaQuiz.desktop
├── Cuestionarios/
├── Resultados/
├── Manual.pdf
└── Sistema/
```

| Carpeta | Descripción |
|----------|-------------|
| AulaQuiz | Script de inicio |
| Iniciar AulaQuiz.desktop | Acceso directo |
| Cuestionarios | Archivos JSON |
| Resultados | Informes generados |
| Sistema | Archivos internos |

---

# 7. Crear nuevos cuestionarios

Los cuestionarios son archivos con extensión **.json**.

No utilice LibreOffice Writer.

Utilice un editor de texto como:

- Pluma
- Gedit
- Visual Studio Code
- Notepad++

## Estructura básica

```json
[
  {
    "pregunta": "¿Cuál es la capital de Francia?",
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

## Significado de los campos

### pregunta

Texto de la pregunta.

### opciones

Lista con las cuatro respuestas posibles.

### correcta

Indica la respuesta correcta.

| Valor | Respuesta |
|-------:|-----------|
| 0 | A |
| 1 | B |
| 2 | C |
| 3 | D |

Por ejemplo:

```json
"correcta": 2
```

significa que la respuesta correcta es la tercera opción (C).

## Varias preguntas

```json
[
  {
    "pregunta":"2 + 2 =",
    "opciones":["3","4","5","6"],
    "correcta":1
  },
  {
    "pregunta":"5 × 5 =",
    "opciones":["20","30","25","15"],
    "correcta":2
  }
]
```

---

# 8. Autoría y licencia

**AulaQuiz**

Desarrollado por **Jorge Lobo Martínez (Lobotic)**.

Se distribuye bajo la licencia **GNU General Public License v3.0 (GPL-3.0)**.

Esta licencia permite:

- utilizar el programa libremente;
- estudiar su funcionamiento;
- modificar el código fuente;
- redistribuir copias;
- distribuir versiones modificadas;

siempre que dichas versiones se publiquen también bajo licencia GPL-3.0.

Puede consultar el texto completo en:

- el archivo `LICENSE` incluido con AulaQuiz;
- https://www.gnu.org/licenses/gpl-3.0.html

# Aviso legal

AulaQuiz se distribuye **tal cual** ("as is"), sin ningún tipo de garantía, expresa o implícita.

Aunque se ha probado su funcionamiento, el autor no garantiza que el programa esté libre de errores ni que sea adecuado para un propósito concreto.

El uso de AulaQuiz es responsabilidad exclusiva del usuario.

El autor no se hace responsable de posibles pérdidas de datos, interrupciones del servicio, incompatibilidades con determinados equipos o cualquier otro perjuicio derivado del uso de la aplicación.

Se recomienda realizar copias de seguridad de los cuestionarios y de los resultados antes de realizar modificaciones o actualizaciones del programa.
