# AulaNaturales · Exploradores de la Naturaleza

Videojuego educativo de Ciencias de la Naturaleza organizado por temas. Cada tema es un mundo del **mapa del curso** y se desbloquea al vencer al jefe final del tema anterior (o cuando el docente lo abre).

Temas de Ciencias de la Naturaleza de 2.º de Primaria, agrupados por situación de aprendizaje. Los títulos de temas, situaciones y misiones son propios del juego; las páginas del libro solo se indican como referencia para el docente.

| Situación | Tema | Estado |
|---|---|---|
| Expedición al aire libre | 1. La máquina del cuerpo | 4 misiones + jefe |
| | 2. Misión: vida sana | 4 misiones + jefe |
| La ruta del agua | 3. Safari animal | 5 misiones + jefe |
| | 4. El reino verde | 4 misiones + jefe |
| Misión en el barrio | 5. El laboratorio secreto | 5 misiones + jefe |
| | 6. Planeta digital | 4 misiones + jefe |

Cada misión empieza con tarjetas de repaso (con lectura en voz alta) y sigue con retos de varios tipos:
elegir respuesta, verdadero/falso, seleccionar varias, ordenar secuencias, clasificar, unir parejas y completar huecos.

## Gamificación
- Estética de videojuego: Glo, un glóbulo rojo explorador que reacciona a cada respuesta, fondo animado, música 8 bits y efectos de sonido.
- Pantalla «¡Preparados… ¡YA!» al empezar cada misión, combos y respuestas de colores con formas.
- Jefe final: el Virus Gruñón, con barra de vida que baja con cada acierto.
- Puntos de experiencia (XP), 6 niveles y barra de progreso.
- 1 a 3 estrellas por misión según los aciertos a la primera (3 estrellas con un 85 %).
- Rachas de aciertos y 9 insignias.
- Mapa del curso con todos los temas y, dentro de cada tema, un mapa de misiones que se desbloquean en orden.
- 8 personajes jugables dibujados (exploradora, astronauta, científico, robot, superheroína, ninja, doctora y alienígena).
- **Zona de calma**: ejercicio guiado de respiración (inspiración, mantener, espiración) de la pág. 17.
- **Esquemas**: cada misión termina con un esquema para completar (mapa conceptual o secuencia de pasos con huecos). En el mapa de cada tema, «Esquemas del tema» permite repasar los esquemas completados.
- **Fichas en papel**: en `fichas/<curso>/` (por ejemplo, `fichas/2-primaria/`) están los esquemas en PDF para imprimir y completar a mano (uno por tema y un solucionario), pensados para 2.º de Primaria. Las fichas en inglés están en la subcarpeta `en/`. Se regeneran con `node tools/fichas/generar_fichas.js`.
- **Evaluación**: nivel de logro (SB, NT, SU, IN) de cada alumno por criterio de evaluación y tema, calculado con el mejor resultado de cada reto. Los criterios y saberes básicos se definen en el `contenidos.js` de cada curso (`CURRICULO`).
- **Panel del docente**: progreso de cada alumno/a por tema, opción de abrir un tema a toda la clase y *modo libre* para desbloquear todo.
- **Minijuegos de premio**: al vencer al jefe final de algunos temas se desbloquea un minijuego. *Carrera saludable* (tema 1 de 3.º y tema 2 de 2.º): el alumno corre con su personaje, recoge hábitos saludables, salta los que no lo son y responde preguntas cruzando la puerta de arriba (saltando) o la de abajo (por el suelo). *Rescate en el bosque* (tema 2 de 3.º y tema 3 de 2.º): el alumno mueve a su personaje por el bosque, recoge animales perdidos y lleva cada uno al refugio de su grupo, esquivando al villano. *Parejas* (memoria): destapar cartas de dos en dos hasta encontrar todas las parejas. *Lluvia*: mover al personaje para atrapar solo lo que pide cada ronda. Todos los temas de 2.º y 3.º tienen su minijuego. Se guarda el récord de cada alumno y el docente puede desactivar los minijuegos desde su panel.

## Varios cursos
La plataforma puede tener varios cursos con el mismo juego. Están registrados en `cursos.js` y cada uno tiene su carpeta en `cursos/<curso>/` con sus contenidos.

- En la pantalla de inicio aparece un selector de **curso** cuando hay más de uno.
- Cada curso tiene su enlace directo para el alumnado: `https://damp83.github.io/AulaNaturales/?curso=2-primaria`. Está en el panel del docente, con un botón para copiarlo.
- Cada curso guarda su progreso por separado.

Para crear un curso nuevo:

```
python3 tools/nuevo_curso.py 3-primaria "3.º de Primaria" "Primary 3" --temas 6
```

Crea `cursos/3-primaria/contenidos.js` con los temas vacíos («Próximamente») y añade el curso a `cursos.js`. Después se rellenan los temas, el currículo y la evaluación siguiendo el ejemplo de `cursos/2-primaria/contenidos.js`.

## Añadir un tema nuevo
Los contenidos de cada curso están en `cursos/<curso>/contenidos.js`. Cada tema tiene misiones (tarjetas de repaso y retos) y un jefe final; las instrucciones y los tipos de reto están explicados al principio del archivo.

Cada tema puede tener un mapa ilustrado: añade `map:'huerto'` (o `salud`, `sabana`, `lab`, `digital`, `cuerpo`, `bosque`, `rio`, `mundo`, `energia`) en el tema. Los escenarios están en `ESCENAS`, en `index.html`. Sin `map`, el tema usa el camino sencillo.

Para dar a un tema la *Carrera saludable* como premio, añade en ese tema `minijuego: { tipo:'carrera', titulo:'Carrera saludable', preguntas:[{q:'Pregunta', ok:'Respuesta correcta', no:'Respuesta incorrecta'}, …] }` (de cada partida salen 3 preguntas al azar). Para *Rescate en el bosque*: `minijuego: { tipo:'rescate', titulo:'Rescate en el bosque', refugios:['Grupo A','Grupo B','Grupo C'], animales:[{e:'🐙', n:'Pulpo', g:1}, …] }`, donde `g` es la posición del refugio correcto (empezando en 0); en cada partida salen 8 animales al azar. La carrera admite además `buenos`, `malos` (listas `{e:'🛡️', n:'Antivirus'}`), `intro`, `fin` y `fondo:'digital'`; el rescate, `cosas:true`, `intro` y `fondo:'lab'`. Para las parejas: `minijuego: { tipo:'memoria', titulo, parejas:[['Vista','Ojos'], …] }`. Para la lluvia: `minijuego: { tipo:'lluvia', titulo, necesarios:5, rondas:[{meta:'Atrapa los sólidos', ok:[{e:'🧊', n:'Hielo'}], no:[{e:'💧', n:'Agua'}]}] }`. Hay ejemplos de todos en los `contenidos.js` de 2.º y 3.º. Si el curso tiene inglés, pon también los textos del minijuego en `contenidos-en.js`.

## Uso
El juego es `index.html`; los cursos están en `cursos.js` y sus contenidos en `cursos/`. Ábrelo en el navegador o publícalo con GitHub Pages
(Settings → Pages → Deploy from branch). El progreso se guarda en el navegador del dispositivo (localStorage).

## Versión para Google Classroom
En la carpeta `google-classroom` está la versión que guarda el progreso en la nube. El alumno entra con su cuenta de Google del centro y continúa su partida en cualquier dispositivo. El progreso de la clase se guarda en una hoja de cálculo del Drive del docente. La guía de instalación está en [`google-classroom/INSTRUCCIONES.md`](google-classroom/INSTRUCCIONES.md).

Hay una carpeta por curso (`google-classroom/2-primaria/`) y cada curso se instala como un proyecto distinto; `Codigo.gs` es el mismo para todos. Si se cambia `index.html` o los contenidos, hay que regenerar esa versión con `python3 tools/build_classroom.py`.

## Versión en inglés (Nature Explorers)
Todo el juego está también en inglés: interfaz, tarjetas, retos, esquemas, voz y fichas. El inglés está adaptado a alumnado de 7-8 años que aprende el idioma. Se cambia con el selector **Español / English** de la pantalla de inicio, con el botón **ES/EN** de la barra superior o, para toda la clase, desde el panel del docente. El progreso y la evaluación son los mismos en los dos idiomas.

- Los contenidos en inglés están en `cursos/<curso>/contenidos-en.js`, con la misma estructura que `contenidos.js`. Un curso sin ese archivo se muestra solo en castellano. Tras editarlos, comprueba que encajan con `node tools/validar_ingles.js`.
- Las fichas en inglés están en `fichas/<curso>/en/`.
- Los criterios de evaluación y los saberes básicos se muestran siempre en castellano, como en el currículo oficial.

## Crear un juego como este para otra área
En [`PLANTILLA-NUEVO-JUEGO.md`](PLANTILLA-NUEVO-JUEGO.md) hay una plantilla de instrucciones para pedirle a Claude un videojuego igual para otra área o curso, cambiando solo la temática y los contenidos.

## Autoría y licencia
© 2026 **Diego Alberto Moya Puerta**, Maestro de Educación Primaria, Comunidad Autónoma de la Región de Murcia.

[![Licencia CC BY-NC-SA 4.0](https://img.shields.io/badge/licencia-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)

*Exploradores de la Naturaleza* (el juego, sus contenidos, los esquemas y las fichas) se distribuye con una licencia [Creative Commons Reconocimiento-NoComercial-CompartirIgual 4.0 Internacional](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Puedes **compartirlo y adaptarlo** siempre que **cites la autoría**, lo uses **sin fines comerciales** y publiques tus versiones con **la misma licencia**. Más detalles en [`LICENSE`](LICENSE).

Las tipografías Andika y Lilita One se distribuyen con la SIL Open Font License 1.1. Las referencias al libro de texto pertenecen a sus titulares.

