# Plantilla para crear un nuevo juego a partir de Exploradores de la Naturaleza

Esta plantilla sirve para pedirle a Claude (Claude Code) un videojuego como este para **otra área o curso**. Se reutiliza todo el motor ya probado: evaluación, versión para Google Classroom, fichas en papel… Solo cambian **la temática visual y los contenidos**.

Copia el texto del recuadro, sustituye lo que va entre [corchetes] y adjunta las fotos del libro.

---

```text
Partiendo del repositorio https://github.com/damp83/AulaNaturales (videojuego
«Exploradores de la Naturaleza»), crea un nuevo videojuego para otra área.
Mantén el motor, la mecánica y todas las funcionalidades; cambia SOLO la
temática visual y los contenidos.

## 1. Datos del nuevo juego
- Área: [p. ej. Matemáticas]
- Curso y edad: [p. ej. 2.º de Primaria, 7-8 años]
- Título del juego: [p. ej. «Aventureros de los Números»]
- Ambientación: [p. ej. viaje espacial / reino medieval / fondo marino]
- Personaje guía (sustituye a Glo): [nombre y cómo es, o «invéntalo»]
- Villanos de los jefes finales: [uno por tema, o «invéntalos según la ambientación»]
- Autoría: [Nombre y apellidos, cargo, comunidad autónoma]
- Licencia: Creative Commons BY-NC-SA 4.0
- Repositorio de destino: [usuario/nombre-del-repositorio]

## 2. Contenidos (te los adjunto)
- Índice del libro con los temas y las situaciones de aprendizaje: [foto]
- Páginas de cada tema: [fotos, tema a tema]
- Criterios de evaluación y saberes básicos: [texto pegado]

## 3. Qué tienes que generar
1. contenidos.js nuevo. Para cada tema:
   - Entre 4 y 5 misiones, una por doble página del libro. Cada misión lleva:
     - tarjetas de repaso con lo esencial;
     - de 7 a 10 retos que mezclen los 7 tipos: elegir respuesta, verdadero
       o falso, seleccionar varias, ordenar, clasificar, unir parejas y
       completar huecos;
     - un esquema para completar como último reto.
   - Un jefe final con un villano propio.
   - Usa el vocabulario, los ejemplos y las actividades del libro.
2. Currículo y evaluación:
   - criterios numerados por competencia y criterio (1.1, 2.3…);
   - saberes básicos numerados por bloque, apartado y saber (A.1.1…);
   - asociación de cada misión con su criterio y excepciones para retos
     concretos;
   - criterios no evaluables en el juego marcados como tales.
3. Temática visual en index.html:
   - título y paleta de colores;
   - personaje guía en SVG con 3 expresiones (normal, alegre y sorpresa);
   - villano en SVG;
   - fondo animado acorde a la ambientación;
   - nombres de niveles e insignias temáticos;
   - un mapa ilustrado para el primer tema, o el camino genérico.
4. Regenerar con el nuevo nombre y la nueva autoría:
   - las fichas en papel en PDF y su solucionario (tools/fichas);
   - la versión para Google Classroom (tools/build_classroom.py);
   - README, LICENSE e INSTRUCCIONES.

## 4. Qué debe mantenerse igual
- 8 personajes jugables, puntos de experiencia, niveles, estrellas
  (3 estrellas con un 85 % de aciertos a la primera), rachas e insignias.
- Desbloqueo de cada tema al vencer al jefe del anterior.
- Mapa del curso agrupado por situaciones de aprendizaje.
- Opciones y retos en orden aleatorio.
- Lectura en voz alta con la voz más natural del dispositivo.
- Zona de calma, o adaptar la actividad de bienestar a la temática.
- Panel del docente con:
  - progreso del alumnado;
  - abrir temas a toda la clase y modo libre;
  - ajustes de voz;
  - evaluación SB/NT/SU/IN con el mejor resultado de cada reto;
  - enlaces a las fichas;
  - autoría y licencia.
- Versión para Google Classroom: el alumnado entra con su cuenta del
  centro y el progreso se guarda en una hoja del Drive del docente,
  cumpliendo la protección de datos.

## 5. Criterios de calidad
- Lenguaje adaptado a la edad: frases cortas, letra grande y sin ambigüedad.
- Cada reto debe tener una sola respuesta correcta, con opciones de
  despiste creíbles.
- Si el libro no da la solución de un ejercicio, dame una lista con las
  respuestas que hayas decidido, para que las revise.
- Antes de entregar, prueba automáticamente todos los temas en ordenador y
  en móvil. Comprueba también que cada ficha cabe en una página A4.
- Trabaja en una rama, abre una pull request y no fusiones sin mi
  confirmación.
```

---

## Consejos para que salga bien

- **Envía las fotos por tandas, tema a tema.** Pasa primero el índice y el tema 1, revisa el resultado y después sigue con los demás.
- **Crea antes el repositorio vacío en GitHub** y dale acceso a Claude.
- **Revisa siempre las respuestas que decida Claude** en los ejercicios abiertos del libro.
- **Licencia:** este juego tiene licencia CC BY-NC-SA 4.0, así que las adaptaciones tienen que **citar la autoría original** y mantener **la misma licencia**.

## Dónde está cada cosa en este repositorio

| Archivo | Qué contiene |
|---|---|
| `contenidos.js` | Temas, misiones, retos, esquemas, currículo y su asociación con la evaluación |
| `index.html` | El juego: diseño, personajes, mecánicas y panel del docente |
| `google-classroom/` | Versión que guarda el progreso en la nube, con su guía de instalación |
| `tools/build_classroom.py` | Genera la versión de Google Classroom a partir de los dos archivos anteriores |
| `tools/fichas/` | Generador de las fichas en papel (PDF) y sus tipografías |
| `fichas/` | Fichas en PDF ya generadas y su solucionario |

---

*Exploradores de la Naturaleza* · © 2026 Diego Alberto Moya Puerta, Maestro de Educación Primaria, Comunidad Autónoma de la Región de Murcia · Licencia [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)
