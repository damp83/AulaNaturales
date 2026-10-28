# Exploradores de la Naturaleza en Google Classroom

Con esta versión, cada alumno entra con **su cuenta de Google del centro** (el mismo usuario y contraseña de Classroom) y su progreso **se guarda en la nube**: puede empezar en la tableta del aula y seguir en el ordenador de casa.

El progreso de toda la clase se guarda en una **hoja de cálculo de tu Drive**, y el panel del docente del juego te la muestra.

La instalación se hace una sola vez y se tarda unos 10 minutos.

---

## 1. Crear el proyecto

1. Entra en **https://script.google.com** con tu **cuenta del centro** (la de Classroom, no una cuenta personal).
2. Pulsa **Nuevo proyecto**.
3. Arriba a la izquierda, cambia «Proyecto sin título» por **Exploradores de la Naturaleza**.

## 2. Pegar los tres archivos

Los archivos están en la carpeta `google-classroom` del repositorio: https://github.com/damp83/AulaNaturales/tree/main/google-classroom

Para copiar un archivo: ábrelo en GitHub y pulsa el botón **Copy raw file** (el icono de dos cuadrados, arriba a la derecha del archivo).

| En Apps Script | Qué pegar |
|---|---|
| `Código.gs` (ya existe) | Borra lo que tiene y pega **Codigo.gs** |
| Pulsa **+** → **HTML** → nómbralo **index** | Borra lo que tiene y pega **index.html** |
| Pulsa **+** → **HTML** → nómbralo **contenidos** | Borra lo que tiene y pega **contenidos.html** |

Los nombres tienen que ser exactamente `index` y `contenidos`, en minúsculas. Apps Script añade solo la terminación `.html`.

Pulsa el icono del disquete (**Guardar proyecto**).

## 3. Crear la hoja y dar permisos

1. Arriba, en el desplegable de funciones, elige **prepararHoja** y pulsa **Ejecutar**.
2. Google pedirá permisos: **Revisar permisos** → elige tu cuenta → **Permitir**.
   - Si aparece «Google no ha verificado esta aplicación», pulsa **Configuración avanzada** → **Ir a Exploradores de la Naturaleza**. Es tu propio script y solo accede a la hoja de progreso.
3. En tu Drive aparecerá la hoja **«Exploradores de la Naturaleza · Progreso del alumnado»**.

## 4. Publicar el juego

1. Pulsa **Implementar** → **Nueva implementación**.
2. En el engranaje de «Seleccionar tipo», elige **Aplicación web**.
3. Rellena:
   - **Descripción:** Exploradores de la Naturaleza
   - **Ejecutar como:** **Yo** (tu cuenta)
   - **Quién tiene acceso:** **Cualquier usuario de [tu centro o dominio]**
4. Pulsa **Implementar** y copia la **URL de la aplicación web**. Termina en `/exec`.

> **Importante:** «Ejecutar como: Yo» es lo que permite que el progreso se guarde en tu hoja sin que los alumnos tengan acceso a ella. Con «Cualquier usuario de tu dominio», solo pueden entrar cuentas del centro.

## 5. Ponerlo en Classroom

En tu clase: **Trabajo de clase** → **Crear** → **Material** (o **Tarea**) → **Enlace** → pega la URL → **Publicar**.

Al abrirlo, el alumno elige su personaje y escribe su nombre la primera vez. Las siguientes veces entra directamente a su partida.

**Pruébalo antes con una cuenta de alumno** (o pide a un compañero de otra clase que lo abra). Si entra al juego, el administrador del dominio permite este tipo de aplicaciones. Si sale un mensaje de que no tiene acceso, consulta con el coordinador TIC.

---

## El panel del docente

- Solo aparece para ti (y para las cuentas que añadas en `DOCENTES`, al principio de `Codigo.gs`).
- Muestra a cada alumno con su cuenta, nivel, puntos, estrellas por tema e insignias. El botón **Actualizar** recarga los datos.
- **Abrir ya** y **Modo libre** se aplican a **toda la clase**, en todos los dispositivos.
- **Borrar** elimina por completo el progreso de ese alumno de la hoja.

## Actualizar el juego (temas nuevos o cambios)

1. Sustituye el contenido de los archivos que hayan cambiado (normalmente `contenidos`).
2. **Implementar** → **Gestionar implementaciones** → lápiz (**Editar**) → **Versión: Nueva versión** → **Implementar**.

La URL no cambia, así que el enlace de Classroom sigue sirviendo.

---

## Protección de datos

**Qué se guarda de cada alumno:** su cuenta de correo del centro, el nombre que escribe en el juego, el personaje elegido, el nivel, los puntos, las estrellas, las insignias y la fecha de la última partida. Nada más: no hay fotos, ni datos de contacto, ni respuestas escritas.

**Dónde:** en una hoja de cálculo de **tu Drive del centro**, dentro de Google Workspace for Education. No se usa ningún servicio externo.

**Quién lo ve:** solo tú (y los docentes que añadas). Los alumnos solo pueden leer y guardar **su propia** partida; el script lo comprueba en cada llamada.

**Recomendaciones:**
- Comunícalo al equipo directivo o al coordinador TIC antes de usarlo, porque es una herramienta nueva que trata datos del alumnado.
- Informa a las familias de que el juego guarda el progreso con la cuenta del centro.
- Al final del curso, borra la hoja de progreso (o las filas de los alumnos que ya no estén) desde tu Drive.
- No compartas la hoja de progreso con nadie.

## Problemas frecuentes

| Problema | Solución |
|---|---|
| «No se ha podido entrar» o «Entra con tu cuenta de Google del colegio» | El navegador está usando una cuenta personal. Cierra sesión o abre el enlace en una ventana con solo la cuenta del centro. |
| «Necesitas permiso» al abrir el enlace | La implementación no tiene «Quién tiene acceso: cualquier usuario del dominio», o el administrador no permite aplicaciones de Apps Script. |
| El alumno no ve los cambios que he hecho | Falta crear una **nueva versión** de la implementación (ver «Actualizar el juego»). |
| No se ha guardado una partida | El juego avisa si no puede guardar y lo reintenta solo. Comprueba la conexión a internet. |

---

*Para los que mantengan el código:* `index.html` y `contenidos.html` de esta carpeta se generan con `python3 tools/build_classroom.py` a partir de `index.html` y `contenidos.js` de la raíz. No los edites a mano.
