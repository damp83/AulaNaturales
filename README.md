# AulaNaturales · Exploradores del Cuerpo

Videojuego educativo de Ciencias de la Naturaleza organizado por temas. Cada tema es un mundo del **mapa del curso** y se desbloquea al vencer al jefe final del tema anterior (o cuando el docente lo abre).

Ahora mismo tiene contenidos el **Tema 1 «El cuerpo humano»** (págs. 12-19 del libro). Los temas 2 a 6 aparecen como «Próximamente».

## Misiones del Tema 1
| Misión | Lección | Retos |
|---|---|---|
| 1 | ¿Cómo funciona nuestro cuerpo? (funciones vitales y sentidos) | 9 |
| 2 | ¿Cómo nos movemos? (huesos, articulaciones y músculos) | 10 |
| 3 | ¿Cómo respiramos? (el camino del aire) | 8 |
| 4 | ¿Cómo nos alimentamos? (la digestión) | 8 |
| Final | El Gran Reto (10 retos mezclados, 3 corazones) | 10 |

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
- **Panel del docente**: progreso de cada alumno/a por tema, opción de abrir un tema a toda la clase y *modo libre* para desbloquear todo.

## Añadir un tema nuevo
Los contenidos están en `contenidos.js`. Cada tema tiene misiones (tarjetas de repaso y retos) y un jefe final; las instrucciones y los tipos de reto están explicados al principio del archivo.

## Uso
Son dos archivos: `index.html` (el juego) y `contenidos.js` (los temas). Ábrelo en el navegador o publícalo con GitHub Pages
(Settings → Pages → Deploy from branch). El progreso se guarda en el navegador del dispositivo (localStorage).
