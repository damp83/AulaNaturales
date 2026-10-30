# AulaNaturales · Exploradores de la Naturaleza

Videojuego educativo de Ciencias de la Naturaleza organizado por temas. Cada tema es un mundo del **mapa del curso** y se desbloquea al vencer al jefe final del tema anterior (o cuando el docente lo abre).

Temas del libro (Ciencias de la Naturaleza 2), agrupados por situación de aprendizaje:

| Situación | Tema | Estado |
|---|---|---|
| ¿Nos vamos de excursión? | 1. Así funciona nuestro cuerpo | 4 misiones + jefe |
| | 2. Cuidamos nuestra salud | 4 misiones + jefe |
| ¿El agua se acaba? | 3. Animales muy diferentes | 5 misiones + jefe |
| | 4. La vida de las plantas | 4 misiones + jefe |
| ¿Te gusta tu barrio? | 5. Nos gusta la ciencia | 5 misiones + jefe |
| | 6. Estamos conectados | 4 misiones + jefe |

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
- **Fichas en papel**: en `fichas/` están los esquemas en PDF para imprimir y completar a mano (uno por tema y un solucionario), pensados para 2.º de Primaria. Se regeneran con `node tools/fichas/generar_fichas.js`.
- **Evaluación**: nivel de logro (SB, NT, SU, IN) de cada alumno por criterio de evaluación y tema, calculado con el mejor resultado de cada reto. Los criterios y saberes básicos se definen en `contenidos.js` (`CURRICULO`).
- **Panel del docente**: progreso de cada alumno/a por tema, opción de abrir un tema a toda la clase y *modo libre* para desbloquear todo.

## Añadir un tema nuevo
Los contenidos están en `contenidos.js`. Cada tema tiene misiones (tarjetas de repaso y retos) y un jefe final; las instrucciones y los tipos de reto están explicados al principio del archivo.

## Uso
Son dos archivos: `index.html` (el juego) y `contenidos.js` (los temas). Ábrelo en el navegador o publícalo con GitHub Pages
(Settings → Pages → Deploy from branch). El progreso se guarda en el navegador del dispositivo (localStorage).

## Versión para Google Classroom
En la carpeta `google-classroom` está la versión que guarda el progreso en la nube. El alumno entra con su cuenta de Google del centro y continúa su partida en cualquier dispositivo. El progreso de la clase se guarda en una hoja de cálculo del Drive del docente. La guía de instalación está en [`google-classroom/INSTRUCCIONES.md`](google-classroom/INSTRUCCIONES.md).

Si se cambia `index.html` o `contenidos.js`, hay que regenerar esa versión con `python3 tools/build_classroom.py`.

## Autoría y licencia
© 2026 **Diego Alberto Moya Puerta**, Maestro de Educación Primaria, Comunidad Autónoma de la Región de Murcia.

[![Licencia CC BY-NC-SA 4.0](https://img.shields.io/badge/licencia-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)

*Exploradores de la Naturaleza* (el juego, sus contenidos, los esquemas y las fichas) se distribuye con una licencia [Creative Commons Reconocimiento-NoComercial-CompartirIgual 4.0 Internacional](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Puedes **compartirlo y adaptarlo** siempre que **cites la autoría**, lo uses **sin fines comerciales** y publiques tus versiones con **la misma licencia**. Más detalles en [`LICENSE`](LICENSE).

Las tipografías Andika y Lilita One se distribuyen con la SIL Open Font License 1.1. Las referencias al libro de texto pertenecen a sus titulares.

