/* =====================================================================
   CONTENIDOS DEL CURSO · Exploradores de la Naturaleza
   © 2026 Diego Alberto Moya · Licencia CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)
   ---------------------------------------------------------------------
   Cada tema tiene misiones (con tarjetas "learn" y retos "ch") y un jefe
   final. Un tema sin misiones aparece en el mapa como "Próximamente".

   Para añadir un tema: rellena "missions" y "boss" copiando el modelo del
   Tema 1. Tipos de reto disponibles:
     mc       elegir una respuesta        {t:'mc', q, opts:[...], a:índice, hint}
     tf       verdadero o falso           {t:'tf', q, a:true|false, hint}
     pick     seleccionar varias          {t:'pick', q, opts:[...], a:[índices], hint}
     order    ordenar una secuencia       {t:'order', q, items:[en orden correcto], hint}
     classify clasificar en grupos        {t:'classify', q, bins:[...], items:[[texto, grupo],...], hint}
     match    unir parejas                {t:'match', q, pairs:[[izq, der],...], hint}
     fill     completar huecos            {t:'fill', q, parts:['texto ',0,' texto ',1], answers:[...], bank:[distractores], hint}
   Los "id" de misiones y jefes deben ser únicos en todo el curso.
   ===================================================================== */

/* ---------- CURRÍCULO: criterios de evaluación y saberes básicos ----------
   Se rellenan aquí y se asocian:
     · a cada tema:   criterios:['1.1','2.3'], saberes:['A.1']      (en CURSO, más abajo)
     · a cada misión: cr:['1.1']   → todos sus retos cuentan para ese criterio
     · a un reto:     cr:['2.3']   → sustituye al de la misión solo para ese reto
   Un criterio del tema sin ningún reto asociado aparece como «no evaluable en el juego».
   Mientras no haya criterios, el panel del docente evalúa por misión. */
const CURRICULO = {
  /* Ciencias de la Naturaleza · Primer ciclo. Numeración: competencia específica.criterio */
  criterios: [
    { id:'1.1', texto:'Utilizar dispositivos y recursos digitales de forma segura y de acuerdo con las necesidades del contexto educativo.' },
    { id:'2.1', texto:'Mostrar curiosidad por objetos, hechos y fenómenos cercanos, formulando preguntas y realizando predicciones.' },
    { id:'2.2', texto:'Buscar información sencilla de diferentes fuentes seguras y fiables de forma guiada, utilizándola en investigaciones relacionadas con el medio natural.' },
    { id:'2.3', texto:'Participar en experimentos pautados o guiados, cuando la investigación lo requiera, utilizando diferentes técnicas sencillas de indagación, empleando de forma segura los instrumentos y registrando las observaciones de forma clara.' },
    { id:'2.4', texto:'Proponer respuestas a las preguntas planteadas, comparando la información y los resultados obtenidos con las predicciones realizadas.' },
    { id:'2.5', texto:'Comunicar de forma oral o gráfica el resultado de las investigaciones explicando los pasos seguidos con ayuda de un guion.' },
    { id:'3.1', texto:'Realizar, de forma guiada, un producto final sencillo que dé solución a un problema de diseño, probando en equipo diferentes prototipos y utilizando de forma segura los materiales adecuados.' },
    { id:'3.2', texto:'Presentar de forma oral o gráfica el producto final de los proyectos de diseño, explicando los pasos seguidos con ayuda de un guion.' },
    { id:'3.3', texto:'Mostrar interés por el pensamiento computacional, participando en la resolución guiada de problemas sencillos de programación.' },
    { id:'4.1', texto:'Reconocer estilos de vida saludables valorando la importancia de una alimentación variada, equilibrada y sostenible, la higiene, el ejercicio físico, el contacto con la naturaleza, el descanso y el uso adecuado de las tecnologías.' },
    { id:'5.1', texto:'Reconocer las características, la organización y las propiedades de los elementos del medio natural a través de la indagación, utilizando las herramientas y procesos adecuados de forma pautada.' },
    { id:'5.2', texto:'Reconocer conexiones sencillas y directas entre diferentes elementos del medio natural por medio de la observación, la manipulación y la experimentación.' },
    { id:'5.3', texto:'Mostrar actitudes de respeto ante el patrimonio natural, reconociéndolo como un bien común.' }
  ],
  /* Numeración: bloque (A Cultura científica, B Tecnología y digitalización).apartado.saber */
  saberes: [
    { id:'A.1.1', bloque:'Iniciación en la actividad científica', texto:'Procedimientos de indagación adecuados a las necesidades de la investigación (observación en el tiempo, identificación y clasificación, búsqueda de patrones...).' },
    { id:'A.1.2', bloque:'Iniciación en la actividad científica', texto:'Instrumentos y dispositivos apropiados para realizar observaciones y mediciones de acuerdo con las necesidades de las diferentes investigaciones.' },
    { id:'A.1.3', bloque:'Iniciación en la actividad científica', texto:'Vocabulario científico básico relacionado con las diferentes investigaciones.' },
    { id:'A.1.4', bloque:'Iniciación en la actividad científica', texto:'La curiosidad y la iniciativa en la realización de las diferentes investigaciones.' },
    { id:'A.1.5', bloque:'Iniciación en la actividad científica', texto:'Las profesiones relacionadas con la ciencia y la tecnología desde una perspectiva de género.' },
    { id:'A.1.6', bloque:'Iniciación en la actividad científica', texto:'Estilos de vida sostenible e importancia del cuidado del planeta a través del conocimiento científico presente en la vida cotidiana.' },
    { id:'A.1.7', bloque:'Iniciación en la actividad científica', texto:'Técnicas de estudio y trabajo. Desarrollo de hábitos de trabajo. Esfuerzo y responsabilidad.' },
    { id:'A.2.1', bloque:'La vida en nuestro planeta', texto:'Necesidades básicas de los seres vivos, incluido el ser humano, y la diferencia con la materia inerte.' },
    { id:'A.2.2', bloque:'La vida en nuestro planeta', texto:'Las adaptaciones de los seres vivos, incluido el ser humano, a su hábitat, concebido como el lugar en el que cubren sus necesidades.' },
    { id:'A.2.3', bloque:'La vida en nuestro planeta', texto:'Clasificación e identificación de los seres vivos, incluido el ser humano, de acuerdo con sus características observables: vertebrados e invertebrados y estructura de las plantas.' },
    { id:'A.2.4', bloque:'La vida en nuestro planeta', texto:'Las relaciones entre los seres humanos, los animales y las plantas. Cuidado y respeto a los seres vivos y al entorno en el que viven, evitando la degradación del suelo, el aire o el agua.' },
    { id:'A.2.5', bloque:'La vida en nuestro planeta', texto:'Hábitos saludables relacionados con el bienestar físico del ser humano: higiene, alimentación variada, equilibrada y sostenible, ejercicio físico, contacto con la naturaleza, descanso y cuidado del cuerpo como medio para prevenir posibles enfermedades.' },
    { id:'A.3.1', bloque:'Materia, fuerzas y energía', texto:'La luz y el sonido como formas de energía. Fuentes y uso en la vida cotidiana.' },
    { id:'A.3.2', bloque:'Materia, fuerzas y energía', texto:'Propiedades observables de los materiales, su procedencia y su uso en objetos de la vida cotidiana de acuerdo a las necesidades de diseño para los que fueron fabricados.' },
    { id:'A.3.3', bloque:'Materia, fuerzas y energía', texto:'Las sustancias puras y las mezclas. Identificación de mezclas homogéneas y heterogéneas. Separación de mezclas heterogéneas mediante distintos métodos.' },
    { id:'A.3.4', bloque:'Materia, fuerzas y energía', texto:'Estructuras resistentes, estables y útiles.' },
    { id:'B.1.1', bloque:'Digitalización del entorno personal de aprendizaje', texto:'Dispositivos y recursos del entorno digital de aprendizaje de acuerdo con las necesidades del contexto educativo.' },
    { id:'B.2.1', bloque:'Proyectos de diseño y pensamiento computacional', texto:'Fases de los proyectos de diseño: prototipado, prueba y comunicación.' },
    { id:'B.2.2', bloque:'Proyectos de diseño y pensamiento computacional', texto:'Materiales adecuados a la consecución del proyecto de diseño.' },
    { id:'B.2.3', bloque:'Proyectos de diseño y pensamiento computacional', texto:'Iniciación en la programación a través de recursos analógicos o digitales adaptados al nivel lector del alumnado (actividades desenchufadas, plataformas digitales de iniciación a la programación, robótica educativa...).' },
    { id:'B.2.4', bloque:'Proyectos de diseño y pensamiento computacional', texto:'Estrategias básicas de trabajo en equipo.' }
  ]
};

/* ---------- TEMA 1 · Así funciona nuestro cuerpo (libro, págs. 12-19) ---------- */
const TEMA1_MISIONES = [
  {
    id:'funciones', badge:'Ojo de lince', title:'¿Cómo funciona nuestro cuerpo?', short:'Las funciones vitales', pages:'Págs. 12-13',
    color:'--sense', icon:'eye', node:[150,60],
    learn:[
      {h:'Las tres funciones vitales', p:'Todos los seres vivos realizamos tres <mark>funciones vitales</mark>: <mark>relación</mark>, <mark>nutrición</mark> y <mark>reproducción</mark>.'},
      {h:'Función de relación', p:'A través de los <mark>sentidos</mark> captamos lo que sucede a nuestro alrededor y reaccionamos ante ello. Tenemos cinco sentidos y cada uno tiene su órgano.',
        extra:'<div class="senses"><b>Vista</b><span>los ojos</span><b>Olfato</b><span>la nariz</span><b>Oído</b><span>los oídos</span><b>Gusto</b><span>la lengua</span><b>Tacto</b><span>la piel</span></div>'},
      {h:'Función de nutrición', p:'Respiramos y tomamos alimentos que nos permiten <mark>crecer</mark> y tener <mark>energía</mark> para realizar nuestras actividades diarias.'},
      {h:'Función de reproducción', p:'Las personas adultas pueden reproducirse, es decir, <mark>tener hijos e hijas</mark>.'}
    ],
    ch:[
      {t:'mc', q:'¿Cuántas funciones vitales realizamos los seres vivos?', opts:['Dos','Tres','Cinco'], a:1, hint:'Son relación, nutrición y reproducción.'},
      {t:'match', q:'Une cada sentido con su órgano.', pairs:[['Vista','Ojos'],['Olfato','Nariz'],['Oído','Oídos'],['Gusto','Lengua'],['Tacto','Piel']], hint:'Piensa con qué parte del cuerpo ves, hueles, oyes, saboreas y tocas.'},
      {t:'mc', q:'Iván coge una mandarina porque ve que es naranja. ¿Qué parte del cuerpo le sirve?', opts:['👁️ Los ojos','👅 La lengua'], a:0, hint:'Para ver el color usamos el sentido de la vista.'},
      {t:'mc', q:'A Iván le parece que la mandarina es muy suave. ¿Qué parte del cuerpo le sirve?', opts:['👅 La lengua','✋ La piel'], a:1, hint:'Si algo es suave o áspero lo notamos con el tacto.'},
      {t:'mc', q:'A Iván le resulta muy agradable el olor de la mandarina. ¿Qué parte del cuerpo le sirve?', opts:['👂 Los oídos','👃 La nariz'], a:1, hint:'Los olores los captamos con el sentido del olfato.'},
      {t:'tf', q:'Una niña toca un cactus, se pincha y aparta la mano. Ha recibido la información por el sentido del tacto.', a:true, hint:'El tacto está en la piel. Por eso nota el pinchazo.'},
      {t:'classify', q:'¿A qué función vital corresponde cada actividad?', bins:['Relación','Nutrición','Reproducción'],
        items:[['🥣 Tomar el desayuno',1],['⚽ Jugar en el recreo',0],['🌬️ Respirar',1],['🎵 Escuchar música',0],['👶 Una persona adulta tiene un bebé',2],['🌸 Oler una flor',0],['🍎 Comer fruta',1]],
        hint:'Relación: usamos los sentidos y reaccionamos. Nutrición: comemos y respiramos. Reproducción: tener hijos e hijas.'},
      {t:'mc', q:'¿Cuál de las funciones vitales no se puede realizar en la infancia?', opts:['Relación','Nutrición','Reproducción'], a:2, hint:'Solo las personas adultas pueden tener hijos e hijas.'},
      {t:'tf', q:'Tenemos tres sentidos: la vista, el oído y el gusto.', a:false, hint:'Tenemos cinco sentidos: vista, olfato, oído, gusto y tacto.'}
    ]
  },
  {
    id:'movemos', badge:'Esqueleto de acero', title:'¿Cómo nos movemos?', short:'Huesos, articulaciones y músculos', pages:'Págs. 14-15',
    color:'--bone', icon:'bone', node:[221,205],
    learn:[
      {h:'Los huesos', p:'Los <mark>huesos</mark> están en el interior de nuestro cuerpo. Son <mark>duros y rígidos</mark>: no se pueden doblar. El conjunto de todos los huesos se llama <mark>esqueleto</mark>.',
        extra:'<div class="tags"><span class="tag">cráneo</span><span class="tag">costillas</span><span class="tag">columna vertebral</span><span class="tag">fémur</span><span class="tag">tibia</span></div>'},
      {h:'Las articulaciones', p:'Las <mark>articulaciones</mark> son las uniones de los huesos. Gracias a ellas podemos <mark>doblar</mark> algunas partes del cuerpo.',
        extra:'<div class="tags"><span class="tag">hombro</span><span class="tag">codo</span><span class="tag">muñeca</span><span class="tag">rodilla</span><span class="tag">tobillo</span></div>'},
      {h:'Los músculos', p:'Los <mark>músculos</mark> están bajo la piel y recubren los huesos. Son <mark>blandos y elásticos</mark>: se estiran y se encogen sin romperse. Para movernos, los músculos <mark>tiran de los huesos</mark>.',
        extra:'<div class="tags"><span class="tag">bíceps</span><span class="tag">pectoral</span><span class="tag">abdominales</span><span class="tag">glúteo</span><span class="tag">gemelos</span></div>'},
      {h:'Cuida tu cuerpo', p:'Es importante hacer <mark>ejercicio físico</mark> para tener unos huesos y unos músculos sanos.'}
    ],
    ch:[
      {t:'mc', q:'¿Cómo se llama el conjunto de todos los huesos del cuerpo?', opts:['Músculo','Esqueleto','Articulación'], a:1, hint:'Todos los huesos juntos forman el esqueleto.'},
      {t:'classify', q:'¿Es un hueso, una articulación o un músculo?', bins:['Hueso','Articulación','Músculo'],
        items:[['Cráneo',0],['Codo',1],['Bíceps',2],['Fémur',0],['Rodilla',1],['Gemelos',2],['Costillas',0],['Tobillo',1],['Pectoral',2],['Hombro',1],['Tibia',0],['Abdominales',2]],
        hint:'Articulaciones: hombro, codo, muñeca, rodilla y tobillo. Músculos: bíceps, pectoral, abdominales, glúteo y gemelos.'},
      {t:'classify', q:'¿Es una característica de los huesos o de las articulaciones?', bins:['Huesos','Articulaciones'],
        items:[['No se pueden doblar',0],['Forman el esqueleto',0],['Nos permiten doblar algunas partes del cuerpo',1],['Son duros y rígidos',0],['Son las uniones de los huesos',1]],
        hint:'Los huesos son duros y forman el esqueleto. Las articulaciones unen los huesos y nos dejan doblarnos.'},
      {t:'pick', q:'Toca los DOS huesos de las piernas.', opts:['Fémur','Cráneo','Tibia','Costillas','Codo'], a:[0,2], hint:'El codo es una articulación. El cráneo y las costillas no están en las piernas.'},
      {t:'pick', q:'Toca las articulaciones de los brazos.', opts:['Hombro','Rodilla','Codo','Tobillo','Muñeca'], a:[0,2,4], hint:'La rodilla y el tobillo están en las piernas.'},
      {t:'pick', q:'Toca los objetos que son elásticos como los músculos.', opts:['🎈 Globo','🔩 Tornillo','➰ Goma elástica','🪨 Piedra','🌀 Muelle'], a:[0,2,4], hint:'Elástico quiere decir que se estira y se encoge sin romperse.'},
      {t:'pick', q:'Toca los músculos del tronco.', opts:['Pectoral','Gemelos','Abdominales','Bíceps'], a:[0,2], hint:'Los gemelos están en las piernas y el bíceps en el brazo.'},
      {t:'mc', q:'Para movernos, los músculos…', opts:['tiran de los huesos','se rompen','se vuelven duros'], a:0, hint:'Los músculos tiran de los huesos y así nos movemos.'},
      {t:'tf', q:'Los músculos son duros y rígidos.', a:false, hint:'Los músculos son blandos y elásticos. Los huesos sí son duros y rígidos.'},
      {t:'tf', q:'Hacer ejercicio físico nos ayuda a tener huesos y músculos sanos.', a:true, hint:'El ejercicio cuida los huesos y los músculos.'}
    ]
  },
  {
    id:'respiramos', badge:'Pulmones de campeón', title:'¿Cómo respiramos?', short:'El camino del aire', pages:'Págs. 16-17',
    color:'--lung', icon:'lungs', node:[128,168],
    learn:[
      {h:'El oxígeno', p:'Cuando respiramos obtenemos el <mark>oxígeno</mark> que necesitamos para vivir. El oxígeno es un <mark>gas que está en el aire</mark>.'},
      {h:'El camino del aire', p:'Así viaja el aire por nuestro cuerpo:',
        extra:'<ol class="steps"><li>Tomamos aire por la <mark>nariz</mark> o por la <mark>boca</mark>.</li><li>El aire pasa por un tubo llamado <mark>tráquea</mark>.</li><li>El aire llega a los <mark>pulmones</mark>. Allí el cuerpo toma el oxígeno.</li><li>El aire que queda vuelve a la boca y a la nariz y sale al exterior.</li></ol>'},
      {h:'Inspiración y espiración', p:'En la <mark>inspiración</mark> el aire entra y se llenan los pulmones. En la <mark>espiración</mark> el aire sale del cuerpo.'},
      {h:'Respirar para calmarnos', p:'Respirar profundamente nos ayuda a <mark>calmarnos</mark>. Toma aire por la nariz, mantenlo unos segundos y expúlsalo poco a poco por la boca.'}
    ],
    ch:[
      {t:'mc', q:'Cuando respiramos obtenemos un gas que necesitamos para vivir. ¿Cuál es?', opts:['💨 El oxígeno','🔥 El humo','☁️ El vapor'], a:0, hint:'Es un gas que está en el aire y empieza por O.'},
      {t:'order', q:'Ordena el recorrido del aire en el cuerpo.', items:['Tomamos aire por la nariz o por la boca','El aire pasa por la tráquea','El aire llega a los pulmones','El aire que queda sale por la boca y la nariz'], hint:'Empieza por donde entra el aire y termina por donde sale.'},
      {t:'fill', q:'Completa el recorrido del aire.', parts:['Entra por la ',0,' → pasa por la ',1,' → llega a los ',2,'.'], answers:['nariz','tráquea','pulmones'], bank:['esófago','estómago'], hint:'El esófago y el estómago son de la digestión, no de la respiración.'},
      {t:'mc', q:'¿En qué parte del cuerpo se toma el oxígeno que necesitamos?', opts:['En el estómago','En los pulmones','En la tráquea'], a:1, hint:'La tráquea solo es el tubo. El oxígeno se toma en los pulmones.'},
      {t:'classify', q:'¿Es inspiración o espiración?', bins:['Inspiración','Espiración'],
        items:[['El aire entra en el cuerpo',0],['El aire sale del cuerpo',1],['Se llenan los pulmones',0],['Expulsamos el aire por la boca',1]],
        hint:'Inspiración: el aire entra. Espiración: el aire sale.'},
      {t:'classify', q:'¿Cómo es tu respiración cuando…?', bins:['Tranquila','Acelerada'],
        items:[['📖 lees un cuento',0],['🏃 corres',1],['✏️ dibujas',0],['💃 bailas',1],['😴 duermes',0],['🪁 corres con la cometa',1]],
        hint:'Cuando nos movemos mucho, respiramos más rápido.'},
      {t:'order', q:'Ordena el ejercicio para calmarte.', items:['Toma aire por la nariz hasta llenar los pulmones','Mantén el aire dentro unos segundos','Expulsa poco a poco el aire por la boca'], hint:'Primero inspiración, después mantener y al final espiración.'},
      {t:'mc', q:'Te pones nervioso o nerviosa. ¿Qué te puede ayudar a calmarte?', opts:['Respirar profundamente varias veces','Gritar muy fuerte','Aguantar sin respirar mucho rato'], a:0, hint:'Respirar despacio y profundo nos ayuda a calmarnos.'}
    ]
  },
  {
    id:'alimentamos', badge:'Superdigestión', title:'¿Cómo nos alimentamos?', short:'La digestión', pages:'Págs. 18-19',
    color:'--food', icon:'apple', node:[168,226],
    learn:[
      {h:'La digestión', p:'La alimentación forma parte de la función de nutrición. En el interior del cuerpo la <mark>digestión</mark> transforma los alimentos en unas sustancias más sencillas que llamamos <mark>nutrientes</mark>.'},
      {h:'Los nutrientes', p:'Los nutrientes nos dan dos cosas muy importantes:',
        extra:'<div class="flow"><span class="box fill">Los alimentos</span><span class="arrow">están formados por ↓</span><span class="box">Nutrientes</span><span class="arrow">que nos proporcionan ↓</span><div class="split"><div class="flow"><span class="box">Materia</span><span class="arrow">que nos ayuda a crecer</span></div><div class="flow"><span class="box">Energía</span><span class="arrow">para realizar nuestras actividades</span></div></div></div>'},
      {h:'El camino de los alimentos', p:'Este es el camino que siguen los alimentos:',
        extra:'<ol class="steps"><li>Tomamos la comida por la <mark>boca</mark> y la masticamos con los <mark>dientes</mark>.</li><li>La comida triturada pasa por un tubo llamado <mark>esófago</mark>.</li><li>En el <mark>estómago</mark> los alimentos se deshacen en sustancias más pequeñas.</li><li>Los nutrientes llegan al cuerpo a través de los <mark>intestinos</mark>.</li><li>Los restos que no se aprovechan se expulsan por el <mark>ano</mark>.</li></ol>'}
    ],
    ch:[
      {t:'mc', q:'¿Qué es la digestión?', opts:['El paso de los alimentos desde la boca hasta el estómago','El proceso de transformación de los alimentos dentro de nuestro cuerpo'], a:1, hint:'La digestión transforma los alimentos en nutrientes.'},
      {t:'mc', q:'Los alimentos están formados por…', opts:['nutrientes','huesos','aire'], a:0, hint:'La digestión saca de los alimentos los nutrientes.'},
      {t:'classify', q:'Los nutrientes nos dan materia y energía. ¿Para qué sirve cada una?', bins:['Materia','Energía'],
        items:[['📏 Crecer',0],['🥋 Hacer kárate',1],['🏃 Correr y jugar',1],['🧒 Hacernos más altos',0]],
        hint:'La materia nos ayuda a crecer. La energía sirve para realizar nuestras actividades.'},
      {t:'pick', q:'Toca las partes del cuerpo que intervienen en la digestión.', opts:['Estómago','Tibia','Codo','Dientes','Intestinos','Boca','Ano','Glúteo'], a:[0,3,4,5,6], hint:'La tibia es un hueso, el codo una articulación y el glúteo un músculo.'},
      {t:'order', q:'Ordena el camino de los alimentos.', items:['La comida entra por la boca','Los dientes trituran los alimentos','La comida pasa por el esófago','Los alimentos se deshacen en el estómago','Las sustancias que necesitamos pasan a nuestro cuerpo','Los restos de los alimentos se expulsan'], hint:'Empieza en la boca y termina cuando se expulsan los restos.'},
      {t:'mc', q:'Cuando la comida está bien triturada, pasa por un tubo llamado…', opts:['tráquea','esófago','intestino'], a:1, hint:'Por la tráquea va el aire. Por el esófago va la comida.'},
      {t:'match', q:'Une cada parte con lo que hace.', pairs:[['Dientes','Trituran la comida'],['Esófago','Tubo por el que baja la comida'],['Estómago','Deshace los alimentos'],['Intestinos','Pasan los nutrientes al cuerpo'],['Ano','Expulsa los restos']], hint:'Repasa el camino de los alimentos en la lección.'},
      {t:'tf', q:'Los nutrientes llegan al cuerpo a través de los intestinos.', a:true, hint:'Sí: los intestinos hacen que los nutrientes pasen al cuerpo.'}
    ]
  }
];
const TEMA1_JEFE = {
  id:'reto', boss:true, villain:'Virus Gruñón', badge:'Gran explorador', title:'El Gran Reto', short:'Repaso de todo el viaje', pages:'Págs. 12-19',
  color:'--virus', icon:'trophy', node:[150,442],
  extra:[
    {t:'classify', q:'¿Por dónde pasa: el aire o la comida?', bins:['Aire','Comida'],
      items:[['Tráquea',0],['Esófago',1],['Pulmones',0],['Estómago',1],['Intestinos',1],['Nariz',0]],
      hint:'El aire va por la tráquea hasta los pulmones. La comida va por el esófago hasta el estómago.'}
  ]
};

/* ---------- TEMA 2 · Cuidamos nuestra salud (libro, págs. 26-41) ---------- */
const TEMA2_MISIONES = [
  {
    id:'salud1', badge:'Superdoctor', title:'¿Cómo cuidamos nuestra salud?', short:'Enfermedades, vacunas y profesionales', pages:'Págs. 28-29',
    color:'--sense', icon:'heartplus',
    learn:[
      {h:'La salud', p:'Tenemos buena <mark>salud</mark> cuando nuestro cuerpo funciona correctamente y nos sentimos bien por fuera y por dentro. Si una parte del cuerpo no funciona bien, nos sentimos mal porque estamos <mark>enfermos</mark>.',
        extra:'<div class="tags"><span class="tag">el resfriado</span><span class="tag">la gripe</span><span class="tag">la COVID</span></div>'},
      {h:'El centro de salud', p:'Cuando no nos sentimos bien, acudimos al <mark>centro de salud</mark>. Allí, los <mark>pediatras</mark>, que son los doctores y doctoras que se ocupan de la infancia, nos revisan y nos recetan <mark>medicamentos</mark> para curarnos.'},
      {h:'Las vacunas', p:'Para evitar algunas enfermedades debemos ponernos <mark>vacunas</mark>. Las vacunas son un tipo de medicamento que ayuda a <mark>prevenir</mark> una enfermedad, es decir, a evitar que aparezca.'},
      {h:'Profesionales de la salud', p:'En el centro de salud nos atienden distintos profesionales:',
        extra:'<div class="senses"><b>Médico</b><span>averigua qué enfermedad tenemos y decide cómo curarla.</span><b>Enfermera</b><span>nos cura las heridas y nos pone las vacunas.</span><b>Psicóloga</b><span>nos ayuda cuando estamos tristes o preocupados.</span></div>'}
    ],
    ch:[
      {t:'tf', q:'Tenemos buena salud cuando nuestro cuerpo funciona correctamente y nos sentimos bien por fuera y por dentro.', a:true, hint:'Así define el libro la buena salud.'},
      {t:'pick', q:'Toca las enfermedades.', opts:['El resfriado','La gripe','La vacuna','La COVID','El pediatra'], a:[0,1,3], hint:'La vacuna es un medicamento y el pediatra es un doctor.'},
      {t:'mc', q:'¿Cómo se llaman los doctores y doctoras que se ocupan de la infancia?', opts:['Pediatras','Psicólogos','Veterinarios'], a:0, hint:'Nos revisan en el centro de salud cuando somos niños y niñas.'},
      {t:'fill', q:'¿Qué se usa en cada caso?', parts:['Para prevenir enfermedades → ',0,'. Para curar enfermedades → ',1,'.'], answers:['vacunas','medicamentos'], bank:['juguetes','caramelos'], hint:'Las vacunas evitan que la enfermedad aparezca. Los medicamentos nos curan.'},
      {t:'match', q:'Une cada profesional de la salud con lo que hace.', pairs:[['Médico','Averigua qué enfermedad tenemos y decide cómo curarla'],['Enfermera','Nos cura las heridas y nos pone las vacunas'],['Psicóloga','Nos ayuda cuando estamos tristes o preocupados']], hint:'Repasa la tarjeta de los profesionales de la salud.'},
      {t:'mc', q:'Cuando no nos sentimos bien, ¿adónde acudimos?', opts:['🏥 Al centro de salud','🛒 Al supermercado','🛝 Al parque'], a:0, hint:'Allí nos revisan y nos recetan medicamentos.'},
      {t:'mc', q:'Prevenir una enfermedad quiere decir…', opts:['evitar que aparezca','curarla cuando ya la tenemos','contagiarla a otra persona'], a:0, hint:'Las vacunas sirven para prevenir.'},
      {t:'tf', q:'Las vacunas son un tipo de medicamento.', a:true, hint:'Sí: son medicamentos que ayudan a prevenir enfermedades.'}
    ]
  },
  {
    id:'salud2', badge:'Hábitos de campeón', title:'¿Tenemos hábitos saludables?', short:'Higiene, ejercicio, posturas y descanso', pages:'Págs. 30-31',
    color:'--ok', icon:'drop',
    learn:[
      {h:'Hábitos saludables', p:'Para cuidar nuestra salud es importante mantener unos <mark>hábitos saludables</mark>: higiene, ejercicio, buenas posturas, descanso y buena alimentación.'},
      {h:'Higiene', p:'Para evitar enfermedades debemos <mark>lavarnos bien las manos</mark>, <mark>ducharnos</mark> con frecuencia y <mark>cepillarnos los dientes</mark> después de cada comida.'},
      {h:'Ejercicio y posturas', p:'El deporte y la actividad física <mark>fortalecen</mark> nuestros músculos y huesos. Adoptar <mark>posturas adecuadas</mark> nos ayuda a cuidar el cuerpo y a evitar molestias en la espalda.'},
      {h:'Descanso y alimentación', p:'Los niños y niñas deben dormir unas <mark>diez horas</mark> diarias. Una buena alimentación, con abundantes <mark>frutas y verduras</mark>, nos permite crecer sanos y tener energía.'}
    ],
    ch:[
      {t:'classify', q:'¿Es un hábito saludable?', bins:['Saludable','No saludable'],
        items:[['😴 Dormir diez horas',0],['😪 Dormir seis horas',1],['🪥 Lavarse los dientes una vez al día',1],['🚿 Ducharse a menudo',0],['🎾 Jugar al tenis a menudo',0],['🍎 Comer fruta diariamente',0],['🪑 Sentarse con la espalda recta',0]],
        hint:'Hay que dormir unas diez horas y cepillarse los dientes después de cada comida.'},
      {t:'mc', q:'¿Cuántas horas deben dormir los niños y niñas?', opts:['Unas diez horas','Unas seis horas','Unas tres horas'], a:0, hint:'El descanso es muy importante: unas diez horas diarias.'},
      {t:'pick', q:'Toca los elementos que usas para tu higiene.', opts:['Cepillo y pasta de dientes','Gel','Esponja','Peine','Piruleta','Videoconsola'], a:[0,1,2,3], hint:'La piruleta y la videoconsola no sirven para la higiene.'},
      {t:'mc', q:'¿Qué actividad te ayuda a estar sano?', opts:['⚽ Jugar en el parque con tus amigos','📺 Ver la televisión'], a:0, hint:'Moverse y hacer ejercicio fortalece el cuerpo.'},
      {t:'mc', q:'Debemos cepillarnos los dientes…', opts:['después de cada comida','una vez a la semana','solo los domingos'], a:0, hint:'Después de cada comida.'},
      {t:'tf', q:'El deporte y la actividad física fortalecen nuestros músculos y huesos.', a:true, hint:'Por eso es un hábito saludable.'},
      {t:'tf', q:'Sentarse de cualquier manera no afecta a nuestra espalda.', a:false, hint:'Las posturas adecuadas evitan molestias en la espalda.'},
      {t:'match', q:'Une cada hábito con un ejemplo.', pairs:[['Higiene','Lavarse bien las manos'],['Ejercicio','Nadar en la piscina'],['Descanso','Dormir diez horas'],['Alimentación','Comer frutas y verduras'],['Postura','Sentarse con la espalda recta']], hint:'Repasa las tarjetas de los hábitos saludables.'}
    ]
  },
  {
    id:'salud3', badge:'Chef saludable', title:'¿Nos alimentamos bien?', short:'Los grupos de alimentos', pages:'Págs. 32-33',
    color:'--food', icon:'apple',
    learn:[
      {h:'Comer bien', p:'Para tener buena salud debemos alimentarnos bien:',
        extra:'<ol class="steps"><li>Es necesario realizar <mark>cinco comidas</mark> al día.</li><li>Hay que tomar un <mark>desayuno completo</mark>.</li><li>Es conveniente comer <mark>alimentos frescos</mark>.</li></ol>'},
      {h:'Los grupos de alimentos', p:'Para estar sanos es importante tomar alimentos <mark>variados</mark> y en la cantidad adecuada.',
        extra:'<div class="senses"><b>Energía</b><span>pan, pasta, patatas, aceite.</span><b>Crecer</b><span>leche, huevos, pescado, carne.</span><b>Vitaminas y fibra</b><span>frutas y verduras.</span></div>'},
      {h:'El agua', p:'Además de comer bien, hay que beber suficiente <mark>agua</mark>.'}
    ],
    ch:[
      {t:'mc', q:'¿Cuántas comidas es necesario realizar al día?', opts:['Cinco','Dos','Ocho'], a:0, hint:'Desayuno, almuerzo, comida, merienda y cena.'},
      {t:'classify', q:'¿A qué grupo pertenece cada alimento?', bins:['Energía','Crecer','Vitaminas y fibra'],
        items:[['🍞 Pan',0],['🥔 Patatas',0],['🍝 Pasta',0],['🥛 Leche',1],['🥚 Huevos',1],['🐟 Pescado',1],['🍗 Pollo',1],['🥕 Zanahoria',2],['🍊 Naranja',2],['🥬 Lechuga',2]],
        hint:'Energía: pan, pasta y patatas. Crecer: leche, huevos, pescado y carne. Vitaminas y fibra: frutas y verduras.'},
      {t:'pick', q:'Toca los alimentos que elegirías para un desayuno saludable.', opts:['🍏 Manzana','🍌 Plátano','🥛 Leche','Yogur con frutas','Cereales de chocolate','🥐 Cruasán','Crepe de chocolate'], a:[0,1,2,3], hint:'Elige fruta y lácteos. La bollería y el chocolate no son para cada día.'},
      {t:'mc', q:'Los alimentos que nos ayudan a crecer son…', opts:['la leche, los huevos y el pescado','el pan y la pasta','las frutas y las verduras'], a:0, hint:'El pan y la pasta dan energía; las frutas y verduras, vitaminas.'},
      {t:'mc', q:'Las frutas y las verduras nos aportan…', opts:['vitaminas y fibra','mucho azúcar','mucha grasa'], a:0, hint:'Ayudan a que nuestro cuerpo funcione bien.'},
      {t:'tf', q:'Además de comer bien, hay que beber suficiente agua.', a:true, hint:'El agua es muy importante para estar sanos.'},
      {t:'tf', q:'Para estar sanos debemos comer siempre el mismo alimento.', a:false, hint:'Hay que tomar alimentos variados.'},
      {t:'mc', q:'Menú: lentejas con chorizo, pollo empanado con patatas, bizcocho, refresco y pan. ¿Cómo sería más sano?', opts:['Añadiendo fruta o verdura y bebiendo agua en lugar de refresco','Tomando dos bizcochos','Bebiendo otro refresco'], a:0, hint:'Le faltan alimentos con vitaminas y fibra, y el agua es mejor que el refresco.'}
    ]
  },
  {
    id:'salud4', badge:'Escudo protector', title:'¿Cómo podemos prevenir accidentes?', short:'Seguridad en casa y fuera de casa', pages:'Págs. 34-35',
    color:'--lung', icon:'shield',
    learn:[
      {h:'Los accidentes', p:'Los <mark>accidentes</mark> suponen un riesgo importante para nuestra salud. Actuando con <mark>cuidado</mark>, muchos accidentes se pueden evitar.'},
      {h:'En casa', p:'Prevenimos accidentes en casa:',
        extra:'<ol class="steps"><li>Recoge tus juguetes y tus cosas del suelo para que nadie tropiece.</li><li>Nunca toques los <mark>enchufes</mark> y ten cuidado con los aparatos eléctricos.</li><li>Pon mucha atención al ducharte para no resbalar.</li></ol>'},
      {h:'Fuera de casa', p:'Prevenimos accidentes fuera de casa:',
        extra:'<ol class="steps"><li>Camina por la acera y cruza por el <mark>paso de peatones</mark>.</li><li>Usa <mark>cinturón</mark> en el coche y <mark>casco</mark> si vas en bicicleta o patinete.</li><li>No corras ni juegues en una escalera ni en lugares elevados.</li></ol>'},
      {h:'Protección en el deporte', p:'Algunos elementos protegen nuestro cuerpo cuando hacemos deporte.',
        extra:'<div class="tags"><span class="tag">casco</span><span class="tag">guantes</span><span class="tag">rodilleras</span><span class="tag">gafas</span></div>'}
    ],
    ch:[
      {t:'pick', q:'Toca lo que debes hacer para prevenir accidentes en casa.', opts:['Tener cuidado con los cuchillos y los utensilios de cocina','Calentar la comida en el fuego sin ayuda','Recoger todo lo que veas en el suelo','Andar descalzo cuando el suelo está mojado'], a:[0,2], hint:'El fuego necesita la ayuda de una persona adulta y el suelo mojado resbala.'},
      {t:'pick', q:'Toca los elementos que protegen tu cuerpo cuando practicas deporte.', opts:['⛑️ Casco','🧤 Guantes','Rodilleras','🥽 Gafas','Cinturón de pantalón','🎾 Raqueta'], a:[0,1,2,3], hint:'La raqueta sirve para jugar y el cinturón del pantalón no protege.'},
      {t:'match', q:'Une cada objeto con el accidente que puede causar.', pairs:[['Plancha','Te puedes quemar'],['Tijeras','Te puedes cortar'],['Enchufe','Te puede dar calambre']], hint:'Piensa qué pasa si usas mal cada objeto.'},
      {t:'classify', q:'¿Actúa con cuidado?', bins:['Con cuidado','Sin cuidado'],
        items:[['🛼 Patina con casco y rodilleras',0],['Se sube a la barandilla de la escalera',1],['🚸 Cruza por el paso de peatones',0],['Corre por las escaleras mecánicas',1],['🧸 Recoge sus juguetes del suelo',0],['🔌 Toca los enchufes',1],['🚗 Se pone el cinturón en el coche',0]],
        hint:'Actuar con cuidado evita muchos accidentes.'},
      {t:'mc', q:'¿Por dónde debemos cruzar la calle?', opts:['🚸 Por el paso de peatones','Por donde queramos','Corriendo entre los coches'], a:0, hint:'Siempre por el paso de peatones.'},
      {t:'tf', q:'Si vas en bicicleta o en patinete, debes ponerte un casco.', a:true, hint:'El casco protege la cabeza.'},
      {t:'tf', q:'Muchos accidentes se pueden evitar actuando con cuidado.', a:true, hint:'Así lo explica la lección.'},
      {t:'mc', q:'¿Qué debes hacer al ducharte?', opts:['Poner mucha atención para no resbalar','Correr dentro de la ducha','Jugar a saltar'], a:0, hint:'El suelo mojado resbala.'}
    ]
  }
];
const TEMA2_JEFE = {
  id:'reto-salud', boss:true, villain:'Microbio Mocoso', badge:'Héroe de la salud', title:'El Gran Reto de la salud', short:'Repaso de todo el tema', pages:'Págs. 28-35',
  color:'--virus', icon:'trophy',
  extra:[
    {t:'classify', q:'¿Cuida la salud o no?', bins:['La cuida','No la cuida'],
      items:[['🍎 Comer fruta y verdura',0],['💉 Ponerse las vacunas',0],['Dormir muy poco',1],['🧼 Lavarse las manos',0],['Montar en bici sin casco',1],['No hacer nada de ejercicio',1]],
      hint:'Los hábitos saludables y la prevención cuidan nuestra salud.'}
  ]
};

/* ---------- TEMA 3 · Animales muy diferentes (libro, págs. 46-63) ---------- */
const TEMA3_MISIONES = [
  {
    id:'animales1', badge:'Clasificador experto', title:'¿Cómo se clasifican los animales?', short:'Vertebrados e invertebrados', pages:'Págs. 48-49',
    color:'--sense', icon:'bone',
    learn:[
      {h:'Vertebrados e invertebrados', p:'Algunos animales tienen un esqueleto en su interior y otros no. Los <mark>vertebrados</mark> tienen un esqueleto formado por huesos con una <mark>columna vertebral</mark>. Los <mark>invertebrados</mark> no tienen huesos.',
        extra:'<div class="senses"><b>Vertebrados</b><span>lobo, gaviota, conejo, sapo.</span><b>Invertebrados</b><span>avispa, medusa, caracol, araña.</span></div>'},
      {h:'El cuerpo de los vertebrados', p:'Los vertebrados tienen <mark>cabeza, tronco y cola</mark>, aunque algunos no tienen cola. Sus extremidades pueden ser <mark>patas, aletas o alas</mark>.'},
      {h:'Cinco grupos de vertebrados', p:'Hay cinco grupos de animales vertebrados:',
        extra:'<div class="tags"><span class="tag">mamíferos</span><span class="tag">aves</span><span class="tag">reptiles</span><span class="tag">anfibios</span><span class="tag">peces</span></div>'}
    ],
    ch:[
      {t:'classify', q:'¿Es vertebrado o invertebrado?', bins:['Vertebrado','Invertebrado'],
        items:[['🐜 Hormiga',1],['🕷️ Araña',1],['🐠 Pez payaso',0],['Gaviota',0],['🐸 Sapo',0],['🐰 Conejo',0],['🐌 Caracol',1],['Mejillón',1],['🐺 Lobo',0],['Medusa',1]],
        hint:'Los vertebrados tienen huesos y columna vertebral. Los invertebrados no tienen huesos.'},
      {t:'mc', q:'Los animales vertebrados tienen…', opts:['un esqueleto con columna vertebral','el cuerpo sin huesos','siempre ocho patas'], a:0, hint:'Su nombre viene de las vértebras de la columna.'},
      {t:'tf', q:'Los animales invertebrados no tienen huesos.', a:true, hint:'Sí: no tienen un esqueleto de huesos.'},
      {t:'pick', q:'Toca las partes del cuerpo de los vertebrados.', opts:['Cabeza','Tronco','Cola','Tentáculos','Concha'], a:[0,1,2], hint:'Cabeza, tronco y cola (aunque algunos no tienen cola).'},
      {t:'pick', q:'Toca los cinco grupos de animales vertebrados.', opts:['Mamíferos','Aves','Insectos','Reptiles','Anfibios','Peces','Arañas'], a:[0,1,3,4,5], hint:'Los insectos y las arañas son invertebrados.'},
      {t:'mc', q:'Las extremidades de los vertebrados pueden ser…', opts:['patas, aletas o alas','antenas y tentáculos','conchas y pinzas'], a:0, hint:'La paloma tiene alas y patas; el atún, aletas.'},
      {t:'mc', q:'La libélula y el canario tienen alas. ¿En qué se diferencian?', opts:['El canario es vertebrado y la libélula es invertebrada','Los dos son vertebrados','Los dos son invertebrados'], a:0, hint:'El canario es un ave y la libélula, un insecto.'}
    ]
  },
  {
    id:'animales2', badge:'Pelo y plumas', title:'Los mamíferos y las aves', short:'Vivíparos y ovíparos', pages:'Págs. 50-51',
    color:'--food', icon:'feather',
    learn:[
      {h:'Los mamíferos', p:'Los <mark>mamíferos</mark> son animales <mark>vivíparos</mark>: nacen del vientre de sus madres. Las crías se alimentan de la leche que producen sus madres en las <mark>mamas</mark>.',
        extra:'<div class="tags"><span class="tag">tienen pelo</span><span class="tag">tienen dientes</span><span class="tag">la mayoría tiene cuatro patas</span></div>'},
      {h:'Las aves', p:'Las <mark>aves</mark> son animales <mark>ovíparos</mark>: nacen de huevos.',
        extra:'<div class="tags"><span class="tag">tienen pico</span><span class="tag">cuerpo cubierto de plumas</span><span class="tag">dos alas</span><span class="tag">dos patas</span></div>'},
      {h:'¡Cuidado con las trampas!', p:'El <mark>murciélago</mark> vuela y el <mark>delfín</mark> nada, pero los dos son mamíferos. El <mark>pingüino</mark> y el <mark>avestruz</mark> no vuelan, pero son aves.'}
    ],
    ch:[
      {t:'pick', q:'¿Cómo son los mamíferos? Toca las correctas.', opts:['Tienen pelo y dientes','La mayoría se desplaza andando','Nacen del vientre de sus madres','Son ovíparos','Los recién nacidos maman'], a:[0,1,2,4], hint:'Los mamíferos son vivíparos, no ovíparos.'},
      {t:'classify', q:'¿Es un mamífero o un ave?', bins:['Mamífero','Ave'],
        items:[['🐷 Cerdo',0],['🦅 Águila',1],['🐱 Gato',0],['🦉 Búho',1],['🐧 Pingüino',1],['🐬 Delfín',0],['🦇 Murciélago',0],['Avestruz',1],['Suricata',0]],
        hint:'Pelo y crías que maman: mamífero. Plumas, pico y huevos: ave.'},
      {t:'mc', q:'Los animales que nacen del vientre de su madre se llaman…', opts:['vivíparos','ovíparos','invertebrados'], a:0, hint:'Los que nacen de huevos son ovíparos.'},
      {t:'mc', q:'Las aves nacen de…', opts:['🥚 huevos','el vientre de su madre','las plantas'], a:0, hint:'Las aves son ovíparas.'},
      {t:'pick', q:'Toca lo que tienen todas las aves.', opts:['Pico','Plumas','Dos alas','Dos patas','Pelo','Dientes'], a:[0,1,2,3], hint:'El pelo y los dientes son de los mamíferos.'},
      {t:'tf', q:'El murciélago vuela, pero es un mamífero.', a:true, hint:'Tiene pelo y sus crías maman.'},
      {t:'tf', q:'El cocodrilo es un mamífero.', a:false, hint:'El cocodrilo tiene escamas: es un reptil.'},
      {t:'mc', q:'El pingüino no vuela. ¿Qué es?', opts:['Un ave','Un mamífero','Un pez'], a:0, hint:'Tiene plumas, pico y nace de un huevo.'}
    ]
  },
  {
    id:'animales3', badge:'Escamas y aletas', title:'Los peces, los reptiles y los anfibios', short:'Aletas, escamas y piel desnuda', pages:'Págs. 52-53',
    color:'--ok', icon:'fish',
    learn:[
      {h:'Los peces', p:'Los <mark>peces</mark> son ovíparos y viven en el agua. Tienen <mark>aletas</mark>, su cuerpo está cubierto de <mark>escamas</mark> y respiran en el agua por las <mark>branquias</mark>.'},
      {h:'Los reptiles', p:'Los <mark>reptiles</mark> son ovíparos y pueden ser terrestres o acuáticos. Están cubiertos de <mark>escamas</mark>, tienen una <mark>cola larga</mark> y la mayoría tiene cuatro patas. Algunos tienen <mark>caparazón</mark>.'},
      {h:'Los anfibios', p:'Los <mark>anfibios</mark> son ovíparos y necesitan vivir cerca del agua. Tienen la <mark>piel desnuda</mark> y los adultos se desplazan con sus cuatro patas. Sus crías se llaman <mark>renacuajos</mark>: viven en el agua y se desplazan con su cola.'}
    ],
    ch:[
      {t:'classify', q:'¿A qué grupo pertenece cada animal?', bins:['Pez','Reptil','Anfibio'],
        items:[['🦎 Camaleón',1],['Salamandra',2],['Trucha',0],['🐍 Serpiente',1],['🦈 Tiburón',0],['🐢 Tortuga marina',1],['🐸 Rana',2],['Atún',0]],
        hint:'Aletas y branquias: pez. Escamas y cola larga: reptil. Piel desnuda: anfibio.'},
      {t:'match', q:'Une cada grupo con su característica.', pairs:[['Peces','Tienen aletas'],['Reptiles','Tienen escamas y una cola larga'],['Anfibios','Tienen la piel desnuda']], hint:'Repasa las tres tarjetas de la lección.'},
      {t:'order', q:'¿En qué orden ocurre? Ordena la vida de la rana.', items:['La rana pone sus huevos en el agua','Los renacuajos nacen en el agua y nadan con su cola','Al crecer, les salen las patas y pierden la cola'], hint:'Primero los huevos, después los renacuajos y al final la rana adulta.'},
      {t:'mc', q:'Los peces respiran en el agua por…', opts:['las branquias','la nariz','las aletas'], a:0, hint:'Las aletas sirven para nadar.'},
      {t:'mc', q:'¿Cómo se llaman las crías de los anfibios?', opts:['Renacuajos','Cachorros','Pollitos'], a:0, hint:'Viven en el agua y nadan con su cola.'},
      {t:'tf', q:'Los peces, los reptiles y los anfibios son animales ovíparos.', a:true, hint:'Los tres nacen de huevos.'},
      {t:'tf', q:'Todos los reptiles viven en el agua.', a:false, hint:'Pueden ser terrestres o acuáticos.'},
      {t:'mc', q:'Algunos reptiles, como la tortuga, tienen…', opts:['caparazón','plumas','branquias'], a:0, hint:'El caparazón protege su cuerpo.'}
    ]
  },
  {
    id:'animales4', badge:'Cazabichos', title:'¿Cómo son los animales invertebrados?', short:'Insectos, moluscos y más', pages:'Págs. 54-55',
    color:'--lung', icon:'bug',
    learn:[
      {h:'Los invertebrados', p:'Los animales que no tienen un esqueleto formado por huesos son <mark>invertebrados</mark>. Hay muchos tipos diferentes y la mayoría son <mark>ovíparos</mark>.',
        extra:'<div class="senses"><b>Calamar</b><span>cuerpo blando con ocho brazos y dos tentáculos.</span><b>Caracol</b><span>protegido por una concha.</span><b>Cangrejo</b><span>dos pinzas y un caparazón duro.</span></div>'},
      {h:'Los insectos', p:'Los <mark>insectos</mark> son el grupo más numeroso de invertebrados. La mayoría tiene <mark>alas</mark>, tienen <mark>dos antenas</mark> en la cabeza y <mark>seis patas</mark>.'},
      {h:'De oruga a mariposa', p:'Cuando los insectos salen del huevo son muy diferentes a los adultos.',
        extra:'<ol class="steps"><li>Huevos</li><li>Oruga</li><li>Capullo</li><li>Mariposa</li></ol>'}
    ],
    ch:[
      {t:'match', q:'Une cada animal con su característica.', pairs:[['Almeja','Tiene dos conchas'],['Gamba','Tiene antenas'],['Lombriz','Tiene el cuerpo desnudo'],['Pulpo','Tiene ocho brazos']], hint:'Fíjate en cómo es el cuerpo de cada animal.'},
      {t:'pick', q:'Toca las afirmaciones correctas sobre los invertebrados.', opts:['Algunos tienen alas','La mayoría son ovíparos','Los insectos son invertebrados','Tienen esqueleto de huesos','Son muy parecidos entre sí','Algunos protegen su cuerpo con una concha'], a:[0,1,2,5], hint:'No tienen huesos y hay muchos tipos muy diferentes.'},
      {t:'order', q:'Ordena cómo se transforma una mariposa.', items:['Huevos','Oruga','Capullo','Mariposa'], hint:'Del huevo sale una oruga.'},
      {t:'pick', q:'Toca las características de los insectos.', opts:['Seis patas','Dos antenas','La mayoría tiene alas','Ocho patas','Columna vertebral'], a:[0,1,2], hint:'Los insectos tienen seis patas, no ocho.'},
      {t:'mc', q:'¿Una araña es un insecto?', opts:['No, porque tiene ocho patas y no tiene antenas','Sí, porque tiene alas','Sí, porque tiene seis patas'], a:0, hint:'Cuenta sus patas: tiene ocho.'},
      {t:'mc', q:'¿Cuál de estos animales no vive en el agua?', opts:['Ciempiés','Mejillón','Estrella de mar'], a:0, hint:'El mejillón y la estrella de mar viven en el mar.'},
      {t:'mc', q:'Los cangrejos tienen…', opts:['dos pinzas y un caparazón duro','plumas y pico','pelo y dientes'], a:0, hint:'El caparazón protege su cuerpo blando.'},
      {t:'tf', q:'Los insectos son el grupo más numeroso de animales invertebrados.', a:true, hint:'Hay muchísimas especies de insectos.'}
    ]
  },
  {
    id:'animales5', badge:'Explorador de hábitats', title:'¿Dónde viven los animales?', short:'Medios terrestres y acuáticos', pages:'Págs. 56-57',
    color:'--bone', icon:'tree',
    learn:[
      {h:'Medios terrestres', p:'Algunos lugares están en tierra firme:',
        extra:'<div class="senses"><b>Bosques</b><span>crecen muchos árboles. Viven ardillas y pájaros.</span><b>Praderas</b><span>crece abundante hierba. Viven conejos y cebras.</span><b>Desiertos</b><span>hay muy poca agua. Viven escorpiones y camellos.</span><b>Polos</b><span>cubiertos de hielo. Osos polares en el norte y pingüinos en el sur.</span></div>'},
      {h:'Medios acuáticos', p:'Son lugares cubiertos de agua:',
        extra:'<div class="senses"><b>Ríos y lagos</b><span>agua dulce. Viven peces, ranas e invertebrados.</span><b>Mares y océanos</b><span>agua salada. Viven ballenas, medusas y cangrejos.</span></div>'}
    ],
    ch:[
      {t:'classify', q:'¿Es un medio terrestre o acuático?', bins:['Terrestre','Acuático'],
        items:[['🌳 Bosque',0],['Río',1],['🏜️ Desierto',0],['🌊 Mar',1],['Pradera',0],['Lago',1],['🧊 Polo',0],['Océano',1]],
        hint:'Los medios acuáticos están cubiertos de agua.'},
      {t:'match', q:'Une cada lugar con los animales que viven allí.', pairs:[['Bosque','Ardillas y pájaros'],['Pradera','Conejos y cebras'],['Desierto','Escorpiones y camellos'],['Polos','Osos polares y pingüinos']], hint:'Repasa la tarjeta de los medios terrestres.'},
      {t:'classify', q:'¿Dónde vive cada animal?', bins:['Bosque','Río'],
        items:[['Jabalí',0],['Barbo',1],['Cangrejo de río',1],['🐿️ Ardilla',0]],
        hint:'El barbo es un pez de río.'},
      {t:'mc', q:'¿En qué se diferencian un río y el mar?', opts:['El río tiene agua dulce y el mar, agua salada','El río tiene agua salada y el mar, agua dulce','No hay ninguna diferencia'], a:0, hint:'El agua del mar es salada.'},
      {t:'mc', q:'En los desiertos casi no hay plantas ni animales porque…', opts:['hay muy poca agua','hace mucho frío','hay demasiados árboles'], a:0, hint:'Sin agua es muy difícil vivir.'},
      {t:'tf', q:'En el polo norte viven los osos polares y en el polo sur, los pingüinos.', a:true, hint:'Así lo explica la lección.'},
      {t:'mc', q:'¿Dónde viven las ballenas y las medusas?', opts:['🌊 En los mares y océanos','En los ríos','En el desierto'], a:0, hint:'Viven en agua salada.'},
      {t:'tf', q:'Es importante mantener limpios los ríos y los mares.', a:true, hint:'Allí viven muchos animales.'}
    ]
  }
];
const TEMA3_JEFE = {
  id:'reto-animales', boss:true, villain:'Bichón Gruñón', badge:'Rey de la selva', title:'El Gran Reto de los animales', short:'Repaso de todo el tema', pages:'Págs. 48-57',
  color:'--virus', icon:'trophy',
  extra:[
    {t:'classify', q:'¿Es vivíparo u ovíparo?', bins:['Vivíparo','Ovíparo'],
      items:[['🐄 Vaca',0],['🐔 Gallina',1],['🐬 Delfín',0],['🐍 Serpiente',1],['🐸 Rana',1],['🐱 Gato',0]],
      hint:'Los mamíferos son vivíparos. Aves, reptiles, anfibios y peces son ovíparos.'}
  ]
};

/* ---------- TEMA 4 · La vida de las plantas (libro, págs. 66-73) ---------- */
const TEMA4_MISIONES = [
  {
    id:'plantas1', badge:'Raíz de campeón', title:'¿Cómo son las plantas?', short:'Partes de la planta y fotosíntesis', pages:'Págs. 66-67',
    color:'--ok', icon:'leaf',
    learn:[
      {h:'Seres vivos', p:'Las plantas son <mark>seres vivos</mark>: nacen, crecen, se reproducen y mueren. Tienen partes muy diferentes y cada una cumple una función.'},
      {h:'Las partes de la planta', p:'Cada parte tiene su trabajo:',
        extra:'<div class="senses"><b>Raíces</b><span>sujetan la planta al suelo y absorben el agua y los nutrientes de la tierra.</span><b>Tallo</b><span>sostiene la planta y transporta el agua y los nutrientes.</span><b>Hojas</b><span>captan la luz del sol y el aire.</span><b>Flores</b><span>en la mayoría se transforman en frutos.</span><b>Frutos</b><span>contienen las semillas.</span></div>'},
      {h:'La fotosíntesis', p:'Para vivir, las plantas necesitan <mark>luz del sol, aire, agua y nutrientes</mark>. Usan la luz del sol para convertir el agua y una parte del aire en su alimento. Este proceso se llama <mark>fotosíntesis</mark> y ocurre en las hojas y otras partes verdes.'}
    ],
    ch:[
      {t:'match', q:'Une cada parte de la planta con lo que hace.', pairs:[['Raíces','Sujetan la planta y absorben agua'],['Tallo','Sostiene la planta y transporta el agua'],['Hojas','Captan la luz del sol y el aire'],['Frutos','Contienen las semillas']], hint:'Repasa la tarjeta de las partes de la planta.'},
      {t:'tf', q:'Las plantas son seres vivos: nacen, crecen, se reproducen y mueren.', a:true, hint:'Por eso son seres vivos.'},
      {t:'pick', q:'¿Qué tienen en común todas las plantas? Toca las correctas.', opts:['Tienen partes verdes','Tienen raíces','Pueden desplazarse por sí mismas','Nacen, crecen, se reproducen y mueren'], a:[0,1,3], hint:'Las plantas no pueden desplazarse.'},
      {t:'pick', q:'Toca lo que necesitan las plantas para vivir.', opts:['☀️ Luz del sol','💨 Aire','💧 Agua','Nutrientes de la tierra','🍬 Caramelos','📺 Televisión'], a:[0,1,2,3], hint:'Luz, aire, agua y nutrientes.'},
      {t:'fill', q:'Completa.', parts:['Las hojas captan la ',0,' del sol y el ',1,' que necesitan para fabricar su alimento. Este proceso se llama ',2,'.'], answers:['luz','aire','fotosíntesis'], bank:['digestión','arena'], hint:'Es el proceso con el que las plantas fabrican su alimento.'},
      {t:'mc', q:'¿Dónde ocurre la fotosíntesis?', opts:['En las hojas y otras partes verdes','En las raíces','Dentro de las semillas'], a:0, hint:'Ocurre donde la planta capta la luz.'},
      {t:'mc', q:'Una planta lleva tiempo en un vaso con agua y sin tierra. ¿Podrá seguir creciendo?', opts:['Le costará: necesita los nutrientes de la tierra','Sí, no necesita nada más','Sí, porque tiene hojas'], a:0, hint:'Las raíces absorben los nutrientes de la tierra.'},
      {t:'mc', q:'En la mayoría de las plantas, las flores se transforman en…', opts:['frutos','raíces','tallos'], a:0, hint:'Los frutos contienen las semillas.'}
    ]
  },
  {
    id:'plantas2', badge:'Guardabosques', title:'¿Cómo clasificamos las plantas?', short:'Árboles, arbustos y hierbas', pages:'Págs. 68-69',
    color:'--bone', icon:'tree',
    learn:[
      {h:'Según su tallo', p:'Según la altura y el grosor de su tallo hay tres tipos de plantas:',
        extra:'<div class="senses"><b>Árboles</b><span>tallo grueso, duro y alto llamado tronco. De él salen las ramas. Ej.: pino.</span><b>Arbustos</b><span>tallo fino y no muy alto. Las ramas crecen cerca del suelo. Ej.: retama.</span><b>Hierbas</b><span>tallo fino, flexible y verde. Poca altura. Ej.: menta.</span></div>'},
      {h:'Según sus hojas', p:'Los árboles y arbustos pueden ser:',
        extra:'<div class="senses"><b>Hoja perenne</b><span>tienen hojas durante todo el año. Ej.: pino.</span><b>Hoja caduca</b><span>en otoño sus hojas cambian de color y se caen. Ej.: olmo.</span></div>'},
      {h:'Con flor o sin flor', p:'Las <mark>plantas con flor</mark> producen flores, como el castaño o la lavanda. Las <mark>plantas sin flor</mark> no las producen, como el musgo o el helecho.'}
    ],
    ch:[
      {t:'classify', q:'¿Qué tipo de planta es según su tallo?', bins:['Árbol','Arbusto','Hierba'],
        items:[['🌳 Olivo',0],['Castaño',0],['🌲 Pino',0],['Rosal',1],['Romero',1],['Retama',1],['🌼 Margarita',2],['Amapola',2],['🌿 Menta',2]],
        hint:'Árbol: tronco alto y grueso. Arbusto: ramas cerca del suelo. Hierba: tallo fino, flexible y verde.'},
      {t:'mc', q:'¿Cómo se llama el tallo grueso, duro y alto de los árboles?', opts:['Tronco','Rama','Raíz'], a:0, hint:'De él salen las ramas.'},
      {t:'match', q:'Une cada tipo de hoja con su descripción.', pairs:[['Hoja perenne','Tiene hojas durante todo el año'],['Hoja caduca','En otoño sus hojas se caen']], hint:'Caduca viene de «caer».'},
      {t:'classify', q:'¿Es de hoja perenne o de hoja caduca?', bins:['Hoja perenne','Hoja caduca'],
        items:[['Pino',0],['Olmo',1],['Abeto',0],['Roble',1]],
        hint:'El roble y el olmo pierden las hojas en otoño. El pino y el abeto, no.'},
      {t:'classify', q:'¿Es una planta con flor o sin flor?', bins:['Con flor','Sin flor'],
        items:[['Castaño',0],['Lavanda',0],['Musgo',1],['Helecho',1],['🌹 Rosal',0]],
        hint:'El musgo y el helecho no producen flores.'},
      {t:'mc', q:'¿Qué tienen en común un árbol y un arbusto?', opts:['Los dos tienen tallo leñoso y ramas','Los dos tienen tallo verde y flexible','Los dos miden lo mismo'], a:0, hint:'Se diferencian en la altura y el grosor del tallo.'},
      {t:'tf', q:'Las hierbas tienen un tallo fino y flexible, de color verde.', a:true, hint:'Por ejemplo, la menta.'},
      {t:'tf', q:'Los arbustos tienen un tronco muy alto y grueso.', a:false, hint:'Su tallo es fino y no muy alto.'}
    ]
  },
  {
    id:'plantas3', badge:'Semilla mágica', title:'¿Cómo se reproducen las plantas?', short:'Semillas y esporas', pages:'Págs. 70-71',
    color:'--lung', icon:'apple',
    learn:[
      {h:'Plantas con flor', p:'La mayoría de las plantas con flor se reproducen mediante <mark>semillas</mark>:',
        extra:'<ol class="steps"><li>Una semilla cae al suelo.</li><li>Si hay humedad, de la semilla brota una nueva planta.</li><li>La planta crece y, en la estación adecuada, le salen las flores.</li><li>Los insectos y el viento hacen posible la reproducción.</li><li>Las flores se convierten en frutos, que contienen las semillas.</li></ol>'},
      {h:'Plantas sin flor', p:'Las plantas sin flor, como los <mark>helechos</mark> y los <mark>musgos</mark>, no tienen frutos ni semillas. Se reproducen mediante <mark>esporas</mark>, que cumplen la misma función que las semillas pero son mucho más pequeñas.'}
    ],
    ch:[
      {t:'order', q:'Ordena cómo se reproduce una planta con flor.', items:['Una semilla cae al suelo','Si hay humedad, brota una nueva planta','La planta crece y le salen las flores','Los insectos y el viento hacen posible la reproducción','Las flores se convierten en frutos con semillas'], hint:'Empieza con la semilla y termina con los frutos.'},
      {t:'pick', q:'Toca las plantas sin flor.', opts:['Helecho','Violeta','Musgo','Orquídea'], a:[0,2], hint:'La violeta y la orquídea tienen flores.'},
      {t:'mc', q:'¿Cómo se reproducen los helechos y los musgos?', opts:['Mediante esporas','Mediante semillas','Mediante frutos'], a:0, hint:'Las esporas son mucho más pequeñas que las semillas.'},
      {t:'classify', q:'¿Es de las plantas con flor o de las plantas sin flor?', bins:['Con flor','Sin flor'],
        items:[['El viento es importante para su reproducción',0],['Tienen esporas',1],['Los frutos contienen las semillas',0],['Son, por ejemplo, los helechos y los musgos',1]],
        hint:'Las plantas sin flor no tienen frutos ni semillas.'},
      {t:'mc', q:'¿Qué necesita una semilla para que brote una nueva planta?', opts:['💧 Humedad','Oscuridad total','Mucho frío'], a:0, hint:'Si hay humedad, brota.'},
      {t:'mc', q:'¿Quién ayuda a las plantas con flor a reproducirse?', opts:['🐝 Los insectos y el viento','Las piedras','Los peces'], a:0, hint:'Llevan el polen de unas flores a otras.'},
      {t:'tf', q:'Los frutos contienen las semillas de la planta.', a:true, hint:'Piensa en una manzana.'}
    ]
  },
  {
    id:'plantas4', badge:'Agricultor experto', title:'¿Por qué son importantes las plantas?', short:'Silvestres y cultivadas', pages:'Págs. 72-73',
    color:'--food', icon:'drop',
    learn:[
      {h:'Plantas silvestres', p:'Muchas plantas crecen en el lugar donde encuentran lo que necesitan, formando bosques, praderas o selvas. Son las <mark>plantas silvestres</mark>. Sirven de <mark>alimento y refugio</mark> a muchos animales salvajes.'},
      {h:'El aire', p:'Todas las plantas ayudan a <mark>mejorar la calidad del aire</mark>. Durante la fotosíntesis producen <mark>oxígeno</mark>, que es esencial para la mayoría de los seres vivos.'},
      {h:'Plantas cultivadas', p:'Las plantas que sembramos y cuidamos para obtener <mark>materiales y alimentos</mark> son <mark>plantas cultivadas</mark>. Los agricultores preparan la tierra, siembran, riegan y recogen la cosecha.'}
    ],
    ch:[
      {t:'mc', q:'¿Cómo se llaman las plantas que nacen y crecen sin ayuda de las personas?', opts:['Silvestres','Cultivadas','Artificiales'], a:0, hint:'Forman bosques, praderas y selvas.'},
      {t:'classify', q:'¿Es verdadero o falso?', bins:['Verdadero','Falso'],
        items:[['Las plantas silvestres nacen y crecen sin ayuda de las personas',0],['Durante la fotosíntesis las plantas producen oxígeno',0],['Los animales carnívoros salvajes se alimentan de plantas silvestres',1],['Las plantas pueden servir de refugio a algunos animales',0]],
        hint:'Los carnívoros comen otros animales, no plantas.'},
      {t:'classify', q:'¿Dónde hay plantas silvestres y dónde plantas cultivadas?', bins:['Silvestres','Cultivadas'],
        items:[['Olivar',1],['Pradera',0],['Huerto',1],['🌳 Bosque',0]],
        hint:'El olivar y el huerto los siembran y cuidan las personas.'},
      {t:'classify', q:'Clasifica estos productos de las plantas.', bins:['Alimentos','Materiales'],
        items:[['Paja',1],['Corcho',1],['Madera',1],['Algodón',1],['🌾 Cereales',0],['🍎 Frutas y verduras',0]],
        hint:'Los alimentos se comen. Los materiales sirven para fabricar cosas.'},
      {t:'order', q:'Ordena el trabajo de los agricultores.', items:['Preparan la tierra y siembran las semillas','Riegan y cuidan las plantas para que crezcan sanas','Recogen la cosecha cuando llega el momento'], hint:'Primero se siembra y al final se recoge.'},
      {t:'mc', q:'¿Qué gas producen las plantas que necesitamos para vivir?', opts:['Oxígeno','Humo','Vapor'], a:0, hint:'Lo producen durante la fotosíntesis.'},
      {t:'tf', q:'Las plantas ayudan a mejorar la calidad del aire.', a:true, hint:'Por eso son importantes en las ciudades.'}
    ]
  }
];
const TEMA4_JEFE = {
  id:'reto-plantas', boss:true, villain:'Oruga Tragona', badge:'Pulgar verde', title:'El Gran Reto de las plantas', short:'Repaso de todo el tema', pages:'Págs. 66-73',
  color:'--virus', icon:'trophy',
  extra:[
    {t:'match', q:'Une cada palabra con su significado.', pairs:[['Fotosíntesis','Las plantas fabrican su alimento'],['Esporas','Reproducen helechos y musgos'],['Hoja caduca','Pierde las hojas en otoño']], hint:'Repasa las palabras clave del tema.'}
  ]
};

/* ---------- TEMA 5 · Nos gusta la ciencia (libro, págs. 86-95) ---------- */
const TEMA5_MISIONES = [
  {
    id:'ciencia1', badge:'Pequeño científico', title:'¿Qué es el método científico?', short:'Observar, preguntar, experimentar y concluir', pages:'Págs. 86-87',
    color:'--sense', icon:'flask',
    learn:[
      {h:'Hacerse preguntas', p:'Las personas siempre se han hecho preguntas para comprender el mundo. Para responderlas, los profesionales de la ciencia usan el <mark>método científico</mark>.'},
      {h:'Pasos del método científico', p:'Así investiga un científico:',
        extra:'<ol class="steps"><li><mark>Observamos</mark> nuestro entorno. «¡Cómo calienta el sol!»</li><li>Nos hacemos una <mark>pregunta</mark>. «¿El sol puede quemar?»</li><li>Realizamos <mark>experimentos</mark>. «¡El papel está ardiendo!»</li><li>Obtenemos <mark>conclusiones</mark>. «Sí, el sol quema.»</li></ol>'}
    ],
    ch:[
      {t:'order', q:'Ordena los pasos del método científico.', items:['Observamos algo','Nos hacemos preguntas','Realizamos un experimento','Obtenemos una conclusión'], hint:'Primero observamos y al final sacamos una conclusión.'},
      {t:'match', q:'Une cada paso con lo que dice el niño.', pairs:[['Observar','¡Guau! ¡Cómo calienta el sol!'],['Preguntar','¿El sol puede quemar?'],['Experimentar','¡Uy, el papel está ardiendo!'],['Concluir','Sí, el sol quema.']], hint:'Repasa el ejemplo de la lupa y el papel.'},
      {t:'mc', q:'Ves una planta con las hojas secas. ¿Cuál sería una buena pregunta?', opts:['¿La planta necesita agua para vivir?','¿De qué color es la maceta?','¿Cuánto cuesta la planta?'], a:0, hint:'La pregunta debe ayudar a explicar lo que observas.'},
      {t:'mc', q:'Pones un cubito de hielo al sol. ¿Qué ocurre después de una hora?', opts:['Se derrite y se convierte en agua','Se hace más grande','No le pasa nada'], a:0, hint:'El calor del sol derrite el hielo.'},
      {t:'mc', q:'¿Qué conclusión sacas del experimento del cubito?', opts:['El calor derrite el hielo','El hielo no se derrite nunca','El sol enfría las cosas'], a:0, hint:'Piensa en lo que has observado.'},
      {t:'mc', q:'Para saber cómo el agua líquida se transforma en vapor, ¿qué experimento harías?', opts:['Calentar agua en una cazuela y observar','Meter agua en el congelador','Mezclar agua con arena'], a:0, hint:'El vapor aparece cuando el agua se calienta mucho.'},
      {t:'tf', q:'Los científicos hacen experimentos para responder a sus preguntas.', a:true, hint:'Es el tercer paso del método científico.'}
    ]
  },
  {
    id:'ciencia2', badge:'Maestro del hielo', title:'¿Cuáles son los estados de la materia?', short:'Sólido, líquido y gaseoso', pages:'Págs. 88-89',
    color:'--opt1', icon:'drop',
    learn:[
      {h:'La materia', p:'La mayoría de las cosas que nos rodean están formadas por <mark>materia</mark>: las montañas, las nubes, el agua, el aire, nuestro cuerpo… La materia puede estar en tres <mark>estados</mark>:',
        extra:'<div class="senses"><b>Sólido</b><span>la tierra.</span><b>Líquido</b><span>el agua en su estado natural.</span><b>Gaseoso</b><span>el aire.</span></div>'},
      {h:'Cambios de estado', p:'La materia puede <mark>cambiar de estado</mark> cuando se <mark>calienta</mark> o se <mark>enfría</mark>.',
        extra:'<div class="senses"><b>Metal</b><span>si lo calentamos mucho, se derrite y se convierte en líquido.</span><b>Lava</b><span>es líquida, pero al enfriarse se convierte en roca sólida.</span><b>Agua del mar</b><span>al calentarse se transforma en vapor y queda la sal.</span></div>'}
    ],
    ch:[
      {t:'classify', q:'¿En qué estado está?', bins:['Sólido','Líquido','Gaseoso'],
        items:[['Humo',2],['🌧️ Lluvia',1],['❄️ Nieve',0],['🍫 Chocolate',0],['Aceite',1],['💨 Aire',2],['Tierra',0],['💧 Agua',1]],
        hint:'Los gases no se pueden coger con la mano. Los líquidos se derraman.'},
      {t:'mc', q:'La materia puede encontrarse en…', opts:['tres estados','dos estados','cinco estados'], a:0, hint:'Sólido, líquido y gaseoso.'},
      {t:'match', q:'Une cada cambio con su ejemplo.', pairs:[['De líquido a sólido','Agua en el congelador'],['De sólido a líquido','Mantequilla en la sartén'],['De líquido a gaseoso','Agua hirviendo en una cazuela']], hint:'Piensa si el objeto se calienta o se enfría.'},
      {t:'classify', q:'¿Hace falta calor o frío?', bins:['Calor','Frío'],
        items:[['Que la mantequilla se haga líquida',0],['Que el agua se haga sólida',1],['Que el agua se evapore',0],['Que la lava se convierta en roca',1]],
        hint:'Calentar derrite y evapora. Enfriar solidifica.'},
      {t:'mc', q:'La lava de los volcanes es líquida. Al enfriarse…', opts:['se convierte en roca sólida','se convierte en aire','sigue siendo líquida'], a:0, hint:'El frío la solidifica.'},
      {t:'mc', q:'Cuando el agua del mar se calienta y se evapora, ¿qué queda en la tierra?', opts:['La sal','La arena','Los peces'], a:0, hint:'Así se obtiene la sal en las salinas.'},
      {t:'tf', q:'El aire es materia en estado gaseoso.', a:true, hint:'Así lo explica la lección.'}
    ]
  },
  {
    id:'ciencia3', badge:'Mezclador loco', title:'¿Qué son las mezclas?', short:'Sustancias, mezclas y disoluciones', pages:'Págs. 90-91',
    color:'--food', icon:'flask',
    learn:[
      {h:'Sustancias y mezclas', p:'El aire, el agua o la madera son <mark>sustancias</mark>. Una ensalada o un café con leche son <mark>mezclas</mark> de sustancias.'},
      {h:'Tipos de mezclas', p:'En algunas mezclas no se distinguen las sustancias: son las <mark>disoluciones</mark>. Si mezclamos sal con agua, la sal se disuelve y no la vemos. En otras mezclas las sustancias se distinguen a simple vista: el aceite flota sobre el agua.'},
      {h:'Separar mezclas', p:'Las mezclas se pueden separar de diferentes formas:',
        extra:'<div class="senses"><b>Colador</b><span>separa la arena del agua.</span><b>Evaporar</b><span>para separar la sal del agua, dejamos que el agua se evapore.</span><b>Embudo especial</b><span>separa el agua y el aceite.</span></div>'}
    ],
    ch:[
      {t:'classify', q:'¿Es una sustancia o una mezcla?', bins:['Sustancia','Mezcla'],
        items:[['Oro',0],['💧 Agua',0],['Sal',0],['🥗 Ensalada',1],['☕ Café con leche',1],['🥣 Leche con cereales',1]],
        hint:'Una mezcla tiene varias sustancias juntas.'},
      {t:'classify', q:'¿Es una disolución?', bins:['Es disolución','No es disolución'],
        items:[['Agua con azúcar',0],['Agua con sal',0],['Leche con cereales',1],['Agua con aceite',1]],
        hint:'En una disolución no se ve una de las sustancias.'},
      {t:'match', q:'¿Cómo separarías cada mezcla?', pairs:[['Arena y agua','Con un colador'],['Sal y agua','Dejando que el agua se evapore'],['Agua y aceite','Con un embudo especial'],['Pasta y agua','Con un escurridor']], hint:'Repasa la tarjeta de separar mezclas.'},
      {t:'mc', q:'Si mezclamos aceite y agua, el aceite…', opts:['se queda flotando sobre el agua','desaparece','se vuelve sólido'], a:0, hint:'Se distinguen a simple vista.'},
      {t:'mc', q:'Para separar el azúcar del agua…', opts:['dejamos que el agua se evapore','usamos un colador','lo agitamos mucho'], a:0, hint:'El azúcar disuelto no queda en el colador.'},
      {t:'classify', q:'¿Qué sustancias se mezclan en una ensalada?', bins:['Sólidas','Líquidas'],
        items:[['🥬 Lechuga',0],['🍅 Tomate',0],['Aceite',1],['Vinagre',1],['🧅 Cebolla',0]],
        hint:'Los líquidos se derraman.'},
      {t:'tf', q:'En una disolución no se distinguen las sustancias que la forman.', a:true, hint:'Como la sal en el agua.'}
    ]
  },
  {
    id:'ciencia4', badge:'Constructor', title:'¿Cómo son los materiales?', short:'Origen y propiedades', pages:'Págs. 92-93',
    color:'--bone', icon:'gear',
    learn:[
      {h:'Naturales y artificiales', p:'Los <mark>materiales</mark> son las sustancias que usamos para fabricar objetos.',
        extra:'<div class="senses"><b>Naturales</b><span>se usan tal y como están en la naturaleza: seda (de los gusanos de seda), madera (de los árboles).</span><b>Artificiales</b><span>se elaboran a partir de sustancias naturales que las personas transforman: plástico.</span></div>'},
      {h:'Propiedades', p:'Cada material tiene unas <mark>propiedades</mark> que lo hacen adecuado para un uso:',
        extra:'<div class="senses"><b>Resistentes</b><span>soportan grandes pesos sin romperse.</span><b>Frágiles</b><span>se rompen al golpearse.</span><b>Rígidos</b><span>no se doblan ni se tuercen.</span><b>Flexibles</b><span>se pueden doblar sin romperse.</span><b>Duros</b><span>son difíciles de rayar o cortar.</span><b>Blandos</b><span>se rayan o deforman con facilidad.</span></div>'}
    ],
    ch:[
      {t:'classify', q:'¿Es un material natural o artificial?', bins:['Natural','Artificial'],
        items:[['Cuero',0],['Paja',0],['Algodón',0],['Madera',0],['Seda',0],['Vidrio',1],['Plastilina',1],['Plástico',1]],
        hint:'Los artificiales los fabrican las personas transformando sustancias naturales.'},
      {t:'match', q:'Une cada propiedad con su significado.', pairs:[['Resistente','Soporta grandes pesos sin romperse'],['Frágil','Se rompe al golpearse'],['Flexible','Se puede doblar sin romperse'],['Blando','Se raya o deforma con facilidad']], hint:'Repasa la tarjeta de las propiedades.'},
      {t:'mc', q:'¿De dónde procede la seda?', opts:['De los capullos de los gusanos de seda','Del tronco de los árboles','Del petróleo'], a:0, hint:'Es un material natural de origen animal.'},
      {t:'mc', q:'¿De dónde procede la madera?', opts:['Del tronco y las ramas de los árboles','De las ovejas','De las piedras'], a:0, hint:'Es un material natural de origen vegetal.'},
      {t:'mc', q:'Un jarrón de porcelana se rompe al caer. Es un material…', opts:['frágil','flexible','resistente'], a:0, hint:'Los materiales frágiles se rompen al golpearse.'},
      {t:'mc', q:'¿Qué material es mejor para hacer un barco: la madera o el cartón?', opts:['La madera, porque es resistente y flota sin estropearse','El cartón, porque se moja enseguida'], a:0, hint:'El cartón se estropea con el agua.'},
      {t:'tf', q:'La lana es un material natural.', a:true, hint:'Procede de las ovejas.'}
    ]
  },
  {
    id:'ciencia5', badge:'Ojo y oído', title:'La luz y el sonido', short:'Cómo vemos y cómo oímos', pages:'Págs. 94-95',
    color:'--gold', icon:'eye',
    learn:[
      {h:'La luz', p:'La <mark>luz</mark> nos permite ver las cosas. Sin luz, hay oscuridad. La <mark>luz natural</mark> procede del Sol, las estrellas o los relámpagos. Las personas fabricamos objetos que emiten <mark>luz artificial</mark>, como las bombillas.'},
      {h:'Materiales y luz', p:'La luz atraviesa algunos materiales, pero no todos:',
        extra:'<div class="senses"><b>Transparentes</b><span>la luz los atraviesa con facilidad y vemos lo que hay detrás (cristal).</span><b>Translúcidos</b><span>dejan pasar poca luz y no vemos con claridad (botella de color).</span><b>Opacos</b><span>la luz no los atraviesa y no vemos lo que hay detrás (cartón).</span></div>'},
      {h:'El sonido', p:'Al hablar producimos unas ondas invisibles que viajan por el aire: es el <mark>sonido</mark>. Hay sonidos <mark>naturales</mark> (el canto de los pájaros) y <mark>artificiales</mark> (una guitarra). Pueden ser <mark>fuertes</mark> o <mark>débiles</mark>, <mark>graves</mark> como el mugido de una vaca o <mark>agudos</mark> como un silbido.'}
    ],
    ch:[
      {t:'classify', q:'¿Es luz natural o luz artificial?', bins:['Natural','Artificial'],
        items:[['☀️ Sol',0],['⭐ Estrellas',0],['⚡ Relámpago',0],['💡 Bombilla',1],['🕯️ Vela',1],['🔦 Linterna',1],['Luciérnaga',0]],
        hint:'La luz artificial la producen objetos fabricados por las personas.'},
      {t:'match', q:'¿Cómo son estos materiales?', pairs:[['Transparente','Tarro de cristal'],['Translúcido','Cubitos de colores'],['Opaco','Caja de cartón']], hint:'¿Puedes ver lo que hay detrás?'},
      {t:'mc', q:'Los materiales que no dejan pasar la luz se llaman…', opts:['opacos','transparentes','translúcidos'], a:0, hint:'No podemos ver lo que hay detrás de ellos.'},
      {t:'classify', q:'¿Es un sonido grave o agudo?', bins:['Grave','Agudo'],
        items:[['🥁 Tambor',0],['Silbato',1],['🦁 Rugido de león',0],['🔔 Campanilla',1],['🐄 Mugido de vaca',0]],
        hint:'Los graves suenan «gordos» y los agudos, «finos».'},
      {t:'classify', q:'¿Es un sonido natural o artificial?', bins:['Natural','Artificial'],
        items:[['🐦 Canto de un pájaro',0],['🚗 Claxon de un coche',1],['🐕 Ladrido de un perro',0],['🎸 Guitarra',1],['🗣️ Voz de una persona',0],['🚑 Sirena de ambulancia',1]],
        hint:'Los artificiales los producen máquinas o instrumentos.'},
      {t:'mc', q:'El sonido viaja en forma de…', opts:['ondas invisibles por el aire','rayos de luz','gotas de agua'], a:0, hint:'Como las ondas al tirar una piedra al agua.'},
      {t:'tf', q:'Sin luz no podemos ver nada.', a:true, hint:'Hay oscuridad.'}
    ]
  }
];
const TEMA5_JEFE = {
  id:'reto-ciencia', boss:true, villain:'Doctor Burbujas', badge:'Genio de la ciencia', title:'El Gran Reto de la ciencia', short:'Repaso de todo el tema', pages:'Págs. 86-95',
  color:'--virus', icon:'trophy',
  extra:[
    {t:'match', q:'Une cada palabra con su ejemplo.', pairs:[['Disolución','Agua con sal'],['Material artificial','Plástico'],['Material opaco','Cartón'],['Sonido agudo','Silbato']], hint:'Repasa todo el tema.'}
  ]
};

/* ---------- TEMA 6 · Estamos conectados (libro, págs. 104-111) ---------- */
const TEMA6_MISIONES = [
  {
    id:'digital1', badge:'Tecnoexperto', title:'¿Qué son los dispositivos digitales?', short:'Móvil, tableta y portátil', pages:'Págs. 104-105',
    color:'--sense', icon:'wifi',
    learn:[
      {h:'Para qué sirven', p:'Los <mark>dispositivos digitales</mark> son máquinas que nos permiten realizar muchas tareas:',
        extra:'<div class="senses"><b>Aprender</b><span>escribir textos, buscar información o vídeos para las tareas de clase.</span><b>Divertirnos</b><span>leer, escuchar música, ver vídeos, hacer fotos, jugar…</span><b>Comunicarnos</b><span>enviar o recibir textos, imágenes o vídeos y hacer videollamadas.</span></div>'},
      {h:'Algunos dispositivos', p:'Estos son algunos dispositivos:',
        extra:'<div class="senses"><b>Teléfono móvil</b><span>pequeño, de pantalla táctil. Sirve para llamadas, videollamadas y conectarse a internet.</span><b>Tableta</b><span>más grande que el móvil y más pequeña que el portátil. También es táctil.</span><b>Portátil</b><span>más grande. Con él hacemos tareas más complejas en menos tiempo.</span></div>'}
    ],
    ch:[
      {t:'pick', q:'¿Qué podemos hacer con un teléfono móvil? Toca todas las correctas.', opts:['Jugar','Hacer fotos','Escuchar música','Conectarse a internet','Cocinar la comida'], a:[0,1,2,3], hint:'El móvil no cocina.'},
      {t:'mc', q:'Una pantalla táctil es una pantalla que…', opts:['responde a los toques de nuestros dedos','no se puede tocar','solo funciona con teclado'], a:0, hint:'Como la del móvil o la tableta.'},
      {t:'match', q:'Une cada dispositivo con su descripción.', pairs:[['Teléfono móvil','Pequeño, con pantalla táctil'],['Tableta','Táctil y más grande que el móvil'],['Portátil','Para tareas más complejas'],['Cámara digital','Sirve para hacer fotos']], hint:'Repasa la tarjeta de los dispositivos.'},
      {t:'classify', q:'¿Para qué usamos el dispositivo?', bins:['Aprender','Divertirnos','Comunicarnos'],
        items:[['Buscar información para clase',0],['Escribir un texto',0],['Jugar',1],['Escuchar música',1],['Hacer una videollamada',2],['Enviar un mensaje',2]],
        hint:'Repasa la primera tarjeta de la lección.'},
      {t:'mc', q:'¿En qué se parecen un portátil y una tableta?', opts:['Los dos sirven para conectarse a internet','Los dos son del mismo tamaño','Los dos son teléfonos'], a:0, hint:'Se diferencian en el tamaño y en el teclado.'},
      {t:'mc', q:'¿Qué dispositivo es más grande?', opts:['El portátil','El teléfono móvil','La tableta'], a:0, hint:'El móvil es el más pequeño.'},
      {t:'tf', q:'Los dispositivos digitales también nos sirven para aprender.', a:true, hint:'Por ejemplo, para hacer las tareas de clase.'}
    ]
  },
  {
    id:'digital2', badge:'Detective web', title:'¿Dónde buscamos información?', short:'Internet y navegadores', pages:'Págs. 106-107',
    color:'--ok', icon:'eye',
    learn:[
      {h:'Internet y navegadores', p:'En <mark>internet</mark> tenemos acceso a muchas informaciones. Para encontrarlas usamos unos programas llamados <mark>navegadores</mark>, como Google Chrome o Microsoft Edge.'},
      {h:'¿Cómo buscar información?', p:'Sigue estos pasos:',
        extra:'<ol class="steps"><li>Abre un navegador.</li><li>Escribe lo que quieres saber en la barra donde pone «Buscar».</li><li>Mira la lista de resultados: son las <mark>páginas web</mark>.</li><li>Haz clic en una de ellas y lee hasta encontrar la información.</li></ol>'},
      {h:'¡Cuidado!', p:'Cualquier persona puede publicar una noticia falsa. No hay que creer todo lo que leemos en internet: debemos <mark>consultar páginas diferentes</mark> y contar con la <mark>supervisión de una persona adulta</mark>.'}
    ],
    ch:[
      {t:'order', q:'Ordena los pasos para buscar información.', items:['Abre un navegador','Escribe lo que quieres saber en «Buscar»','Mira la lista de páginas web','Haz clic en una y lee la información'], hint:'Primero se abre el navegador.'},
      {t:'pick', q:'¿Para qué utilizarías internet? Toca las correctas.', opts:['Para buscar información','Para hacer videollamadas','Para escuchar música','Para leer un libro','Para jugar online','Para escribir un texto'], a:[0,1,2,3,4,5], hint:'¡Internet sirve para todo eso!'},
      {t:'mc', q:'¿Cómo se llaman los programas que usamos para navegar por internet?', opts:['Navegadores','Procesadores','Calculadoras'], a:0, hint:'Por ejemplo, Google Chrome o Microsoft Edge.'},
      {t:'pick', q:'¿Cómo puedes saber si una información de internet es cierta?', opts:['Mirar en qué página la has leído','Preguntar a una persona adulta','Consultar lo mismo en otras páginas web','Creer todo lo que leo'], a:[0,1,2], hint:'No hay que creerse todo.'},
      {t:'tf', q:'Todo lo que leemos en internet es verdad.', a:false, hint:'Cualquier persona puede publicar información falsa.'},
      {t:'mc', q:'Para buscar información sobre animales, ¿qué página elegirías?', opts:['Una página sobre la naturaleza y los animales','Una página de recetas para niños','Una página de películas'], a:0, hint:'Elige la página del tema que buscas.'}
    ]
  },
  {
    id:'digital3', badge:'Presentador estrella', title:'¿Cómo presentamos la información?', short:'Programas y almacenamiento', pages:'Págs. 108-109',
    color:'--food', icon:'teacher',
    learn:[
      {h:'Programas informáticos', p:'Para organizar la información y presentar un trabajo usamos <mark>programas informáticos</mark>:',
        extra:'<div class="senses"><b>Procesador de textos</b><span>para escribir y corregir textos. Podemos cambiar el tamaño, el color y el tipo de letra.</span><b>Creador de presentaciones</b><span>para trabajos y exposiciones. Permite añadir texto, dibujos, fotos y tablas.</span></div>'},
      {h:'Guardar la información', p:'Usamos <mark>dispositivos de almacenamiento</mark>:',
        extra:'<div class="senses"><b>Disco duro</b><span>guarda miles y miles de documentos, imágenes o vídeos.</span><b>Memoria portátil</b><span>fácil de transportar, con menos capacidad que un disco duro.</span><b>Tarjeta de memoria</b><span>muy pequeña. Se usa en cámaras digitales y móviles.</span></div>'}
    ],
    ch:[
      {t:'classify', q:'¿Qué programa te resultaría más útil?', bins:['Procesador de textos','Creador de presentaciones'],
        items:[['Para presentar un trabajo',1],['Para escribir una receta',0],['Para preparar diapositivas',1],['Para redactar una noticia',0],['Para escribir un libro',0],['Para realizar un esquema con fotos',1]],
        hint:'El creador de presentaciones sirve para exponer. El procesador, para escribir.'},
      {t:'match', q:'Une cada dispositivo de almacenamiento con su descripción.', pairs:[['Disco duro','Guarda miles y miles de documentos'],['Memoria portátil','Fácil de transportar'],['Tarjeta de memoria','Muy pequeña, para cámaras y móviles']], hint:'Repasa la tarjeta de guardar la información.'},
      {t:'mc', q:'¿Qué dispositivo es pequeño y fácil de transportar?', opts:['La memoria portátil','El disco duro'], a:0, hint:'Se lleva en el bolsillo.'},
      {t:'mc', q:'¿Dónde puedes guardar una mayor cantidad de archivos?', opts:['En el disco duro','En la tarjeta de memoria'], a:0, hint:'Guarda miles y miles de documentos.'},
      {t:'pick', q:'¿En qué aparatos se usan las tarjetas de memoria?', opts:['📷 Cámaras digitales','📱 Teléfonos móviles','🧊 Neveras','🚲 Bicicletas'], a:[0,1], hint:'Aparatos que guardan fotos.'},
      {t:'tf', q:'Es importante guardar la información después de hacer un trabajo.', a:true, hint:'Así no la perdemos.'}
    ]
  },
  {
    id:'digital4', badge:'Ciberguardián', title:'¿Utilizamos bien los dispositivos digitales?', short:'Peligros y buen uso', pages:'Págs. 110-111',
    color:'--lung', icon:'shield',
    learn:[
      {h:'Peligros', p:'Internet y los aparatos digitales no siempre son seguros:',
        extra:'<ol class="steps"><li>No hagas clic en anuncios ni en páginas desconocidas: así evitas <mark>virus informáticos</mark>.</li><li>Muchos contenidos son inadecuados para los niños y niñas: navega siempre con la <mark>supervisión</mark> de una persona adulta.</li></ol>'},
      {h:'Buen uso', p:'Es importante controlar el <mark>tiempo</mark> que pasamos con estos dispositivos, acordando <mark>normas</mark> con los adultos. Mantén una <mark>buena postura</mark>: espalda recta y pantalla a una distancia adecuada para no forzar la vista.'}
    ],
    ch:[
      {t:'pick', q:'Toca lo que debes hacer para usar bien internet.', opts:['Navegar con una persona adulta','No hacer clic en anuncios desconocidos','Acordar un tiempo de uso','Sentarte con la espalda recta','Hablar con desconocidos','Estar horas sin descansar'], a:[0,1,2,3], hint:'Nunca hables con desconocidos.'},
      {t:'match', q:'Une cada problema con su solución.', pairs:[['Virus','No hacer clic en páginas desconocidas'],['Uso excesivo','Acordar normas de tiempo'],['Mala postura','Espalda recta y pantalla a buena distancia']], hint:'Repasa la tarjeta del buen uso.'},
      {t:'mc', q:'Hugo está usando la tableta de su madre sin permiso. ¿Qué le dirías?', opts:['Que pida permiso antes de usarla','Que siga, no pasa nada','Que la esconda'], a:0, hint:'Hay que pedir permiso a los adultos.'},
      {t:'mc', q:'A la madre de Lidia le ha llegado un mensaje de un desconocido al móvil. ¿Qué consejo le darías?', opts:['Que no lo abra ni lo conteste','Que conteste enseguida','Que haga clic en el enlace'], a:0, hint:'Los mensajes de desconocidos pueden ser peligrosos.'},
      {t:'mc', q:'Isa ha visto algo en internet que la ha asustado. ¿Qué debería hacer?', opts:['Contárselo a una persona adulta','No decir nada','Seguir mirando'], a:0, hint:'Los adultos nos ayudan.'},
      {t:'tf', q:'Los virus informáticos pueden estropear el ordenador.', a:true, hint:'Son programas dañinos.'},
      {t:'tf', q:'Es bueno colocar la pantalla muy cerca de los ojos.', a:false, hint:'Hay que ponerla a una distancia adecuada para no forzar la vista.'}
    ]
  }
];
const TEMA6_JEFE = {
  id:'reto-digital', boss:true, villain:'Virus Pixelado', badge:'Héroe digital', title:'El Gran Reto digital', short:'Repaso de todo el tema', pages:'Págs. 104-111',
  color:'--virus', icon:'trophy',
  extra:[
    {t:'classify', q:'¿Es un buen uso o un mal uso?', bins:['Buen uso','Mal uso'],
      items:[['Navegar con un adulto',0],['Hacer clic en anuncios desconocidos',1],['Comprobar la información en varias páginas',0],['Usar la tableta toda la noche',1],['Guardar el trabajo al terminar',0]],
      hint:'Repasa los peligros y el buen uso.'}
  ]
};

const CURSO = {
  asignatura: 'Ciencias de la Naturaleza 2',
  /* Situaciones de aprendizaje del libro: agrupan los temas en el mapa */
  situaciones: [
    { title:'¿Nos vamos de excursión?', temas:['cuerpo','salud'] },
    { title:'¿El agua se acaba?', temas:['animales','plantas'] },
    { title:'¿Te gusta tu barrio?', temas:['ciencia','conectados'] }
  ],
  temas: [
    { id:'cuerpo', n:1, title:'Así funciona nuestro cuerpo', short:'Funciones vitales, movimiento, respiración y digestión', pages:'Págs. 8-25',
      color:'--lung', icon:'person', map:'body', starsBadge:'Constelación',
      missions: TEMA1_MISIONES, boss: TEMA1_JEFE },
    { id:'salud', n:2, title:'Cuidamos nuestra salud', short:'Salud, hábitos, alimentación y accidentes', pages:'Págs. 26-41',
      color:'--ok', icon:'heartplus', starsBadge:'Estrella de la salud',
      missions: TEMA2_MISIONES, boss: TEMA2_JEFE },
    { id:'animales', n:3, title:'Animales muy diferentes', short:'Clasificación de los animales y dónde viven', pages:'Págs. 46-63',
      color:'--food', icon:'paw', starsBadge:'Arca de estrellas',
      missions: TEMA3_MISIONES, boss: TEMA3_JEFE },
    { id:'plantas', n:4, title:'La vida de las plantas', short:'Partes, tipos, reproducción e importancia de las plantas', pages:'Págs. 64-79',
      color:'--virus', icon:'leaf', starsBadge:'Jardín de estrellas',
      missions: TEMA4_MISIONES, boss: TEMA4_JEFE },
    { id:'ciencia', n:5, title:'Nos gusta la ciencia', short:'Método científico, materia, mezclas, materiales, luz y sonido', pages:'Págs. 84-101',
      color:'--sense', icon:'flask', starsBadge:'Laboratorio estelar',
      missions: TEMA5_MISIONES, boss: TEMA5_JEFE },
    { id:'conectados', n:6, title:'Estamos conectados', short:'Dispositivos, internet, presentaciones y buen uso', pages:'Págs. 102-117',
      color:'--bone', icon:'wifi', starsBadge:'Conexión total',
      missions: TEMA6_MISIONES, boss: TEMA6_JEFE }
  ]
};

/* ---------- ESQUEMAS: uno por misión, como último reto ----------
   tipo 'arbol': título arriba y ramas con sus detalles. tipo 'flujo': pasos en orden.
   [[palabra]] es un hueco que el alumno completa. «extra» son palabras para despistar. */
const ESQUEMAS = {
  /* Tema 1 */
  funciones: { titulo:'Las [[funciones vitales]]', nodos:[
    {txt:'Función de [[relación]]', hijos:[{txt:'Usamos los cinco [[sentidos]]'}]},
    {txt:'Función de [[nutrición]]', hijos:[{txt:'[[Respiramos]] y comemos para crecer'}]},
    {txt:'Función de [[reproducción]]', hijos:[{txt:'Las personas adultas pueden tener [[hijos]]'}]} ], extra:['huesos','digestión'] },
  movemos: { titulo:'¿Cómo nos movemos?', nodos:[
    {txt:'Los [[huesos]]', hijos:[{txt:'Son duros y [[rígidos]]'},{txt:'Todos juntos forman el [[esqueleto]]'}]},
    {txt:'Las [[articulaciones]]', hijos:[{txt:'Son las uniones de los huesos'},{txt:'Ej.: el codo y la [[rodilla]]'}]},
    {txt:'Los [[músculos]]', hijos:[{txt:'Son blandos y [[elásticos]]'},{txt:'[[Tiran]] de los huesos'}]} ], extra:['cráneo','duros'] },
  respiramos: { tipo:'flujo', titulo:'El camino del [[aire]]', nodos:[
    {txt:'Entra por la [[nariz]] o por la boca'}, {txt:'Pasa por la [[tráquea]]'}, {txt:'Llega a los [[pulmones]]'},
    {txt:'El cuerpo toma el [[oxígeno]]'}, {txt:'El aire que queda [[sale]] al exterior'} ], extra:['esófago','estómago'] },
  alimentamos: { tipo:'flujo', titulo:'El camino de los [[alimentos]]', nodos:[
    {txt:'Boca: los [[dientes]] trituran la comida'}, {txt:'[[Esófago]]: tubo por el que baja la comida'},
    {txt:'[[Estómago]]: los alimentos se deshacen'}, {txt:'[[Intestinos]]: los nutrientes pasan al cuerpo'},
    {txt:'[[Ano]]: se expulsan los restos'} ], extra:['tráquea','pulmones'] },
  /* Tema 2 */
  salud1: { titulo:'Cuidamos la [[salud]]', nodos:[
    {txt:'Si enfermamos: [[centro de salud]]', hijos:[{txt:'Los [[pediatras]] nos revisan'},{txt:'Los [[medicamentos]] nos curan'}]},
    {txt:'Para prevenir: las [[vacunas]]'},
    {txt:'Profesionales', hijos:[{txt:'[[Médico]]: decide cómo curarnos'},{txt:'[[Enfermera]]: cura heridas'},{txt:'[[Psicóloga]]: ayuda si estamos tristes'}]} ], extra:['caramelos','juguetes'] },
  salud2: { titulo:'Hábitos [[saludables]]', nodos:[
    {txt:'[[Higiene]]', hijos:[{txt:'Lavarse las manos y los [[dientes]]'}]},
    {txt:'[[Ejercicio]]', hijos:[{txt:'Fortalece músculos y huesos'}]},
    {txt:'[[Descanso]]', hijos:[{txt:'Dormir unas [[diez]] horas'}]},
    {txt:'Buena [[postura]]', hijos:[{txt:'Espalda recta al sentarse'}]} ], extra:['seis','televisión'] },
  salud3: { titulo:'Los grupos de [[alimentos]]', nodos:[
    {txt:'Nos dan [[energía]]', hijos:[{txt:'Pan, pasta y [[patatas]]'}]},
    {txt:'Nos ayudan a [[crecer]]', hijos:[{txt:'Leche, huevos y [[pescado]]'}]},
    {txt:'[[Vitaminas]] y fibra', hijos:[{txt:'[[Frutas]] y verduras'}]},
    {txt:'Y beber mucha [[agua]]'} ], extra:['refrescos','bollería'] },
  salud4: { titulo:'Prevenimos [[accidentes]]', nodos:[
    {txt:'En [[casa]]', hijos:[{txt:'Recoger los juguetes del suelo'},{txt:'No tocar los [[enchufes]]'}]},
    {txt:'Fuera de casa', hijos:[{txt:'Cruzar por el paso de [[peatones]]'},{txt:'Usar [[cinturón]] en el coche'},{txt:'Usar [[casco]] en la bici'}]} ], extra:['tijeras','escaleras'] },
  /* Tema 3 */
  animales1: { titulo:'Clasificamos los animales', nodos:[
    {txt:'[[Vertebrados]]: tienen [[huesos]]', hijos:[{txt:'Cinco grupos: mamíferos, aves, reptiles, [[anfibios]] y peces'}]},
    {txt:'[[Invertebrados]]: no tienen huesos', hijos:[{txt:'Insectos, caracoles, medusas...'}]} ], extra:['plumas','escamas'] },
  animales2: { titulo:'Mamíferos y aves', nodos:[
    {txt:'[[Mamíferos]]', hijos:[{txt:'Son [[vivíparos]]'},{txt:'Tienen [[pelo]] y dientes'},{txt:'Las crías [[maman]]'}]},
    {txt:'[[Aves]]', hijos:[{txt:'Son [[ovíparos]]'},{txt:'Tienen [[plumas]] y pico'}]} ], extra:['escamas','aletas'] },
  animales3: { titulo:'Peces, reptiles y anfibios', nodos:[
    {txt:'[[Peces]]', hijos:[{txt:'Tienen [[aletas]] y escamas'},{txt:'Respiran por [[branquias]]'}]},
    {txt:'[[Reptiles]]', hijos:[{txt:'Escamas y cola larga'},{txt:'Algunos tienen [[caparazón]]'}]},
    {txt:'[[Anfibios]]', hijos:[{txt:'Tienen la piel [[desnuda]]'},{txt:'Sus crías son [[renacuajos]]'}]} ], extra:['plumas','pelo'] },
  animales4: { titulo:'Los animales [[invertebrados]]', nodos:[
    {txt:'[[Insectos]]', hijos:[{txt:'Seis [[patas]] y dos [[antenas]]'},{txt:'Huevo, [[oruga]], capullo, mariposa'}]},
    {txt:'Otros invertebrados', hijos:[{txt:'Caracol: tiene [[concha]]'},{txt:'Cangrejo: dos [[pinzas]]'},{txt:'Calamar: ocho [[brazos]]'}]} ], extra:['huesos','plumas'] },
  animales5: { titulo:'¿Dónde viven los animales?', nodos:[
    {txt:'Medios [[terrestres]]', hijos:[{txt:'[[Bosque]]: ardillas y pájaros'},{txt:'Desierto: escorpiones y [[camellos]]'},{txt:'[[Polos]]: osos polares'}]},
    {txt:'Medios [[acuáticos]]', hijos:[{txt:'Ríos y lagos: agua [[dulce]]'},{txt:'Mares y océanos: agua [[salada]]'}]} ], extra:['cebras','caliente'] },
  /* Tema 4 */
  plantas1: { titulo:'Las partes de la [[planta]]', nodos:[
    {txt:'[[Raíces]]', hijos:[{txt:'Sujetan la planta y absorben el agua'}]},
    {txt:'[[Tallo]]', hijos:[{txt:'Sostiene la planta'}]},
    {txt:'[[Hojas]]', hijos:[{txt:'Captan la luz y hacen la [[fotosíntesis]]'}]},
    {txt:'Flores y [[frutos]]', hijos:[{txt:'Los frutos contienen las [[semillas]]'}]} ], extra:['branquias','huesos'] },
  plantas2: { titulo:'Clasificamos las plantas', nodos:[
    {txt:'Según su [[tallo]]', hijos:[{txt:'[[Árbol]]: tronco grueso y alto'},{txt:'[[Arbusto]]: ramas cerca del suelo'},{txt:'[[Hierba]]: tallo verde y flexible'}]},
    {txt:'Según sus [[hojas]]', hijos:[{txt:'Hoja [[perenne]]: todo el año'},{txt:'Hoja [[caduca]]: se caen en otoño'}]} ], extra:['musgo','raíz'] },
  plantas3: { tipo:'flujo', titulo:'Así se reproducen las plantas con [[flor]]', nodos:[
    {txt:'Una [[semilla]] cae al suelo'}, {txt:'Con humedad, [[brota]] una nueva planta'}, {txt:'La planta crece y salen las [[flores]]'},
    {txt:'Los insectos y el [[viento]] ayudan'}, {txt:'Las flores se convierten en [[frutos]]'} ], extra:['esporas','raíces'] },
  plantas4: { titulo:'Las plantas son importantes', nodos:[
    {txt:'Plantas [[silvestres]]', hijos:[{txt:'Crecen sin ayuda de las personas'},{txt:'Dan alimento y [[refugio]] a los animales'}]},
    {txt:'Plantas [[cultivadas]]', hijos:[{txt:'Las cuidan los [[agricultores]]'},{txt:'Nos dan [[alimentos]] y materiales'}]},
    {txt:'Todas producen [[oxígeno]]'} ], extra:['humo','plástico'] },
  /* Tema 5 */
  ciencia1: { tipo:'flujo', titulo:'El método [[científico]]', nodos:[
    {txt:'[[Observamos]] nuestro entorno'}, {txt:'Nos hacemos una [[pregunta]]'}, {txt:'Realizamos [[experimentos]]'}, {txt:'Obtenemos [[conclusiones]]'} ], extra:['adivinamos','olvidamos'] },
  ciencia2: { titulo:'Los estados de la [[materia]]', nodos:[
    {txt:'[[Sólido]]', hijos:[{txt:'La tierra, el hielo'}]},
    {txt:'[[Líquido]]', hijos:[{txt:'El agua, el aceite'}]},
    {txt:'[[Gaseoso]]', hijos:[{txt:'El aire, el humo'}]},
    {txt:'Al [[calentarse]] o enfriarse, cambian de estado'} ], extra:['blando','metálico'] },
  ciencia3: { titulo:'Las [[mezclas]]', nodos:[
    {txt:'[[Disoluciones]]: no se distinguen', hijos:[{txt:'Agua con [[sal]]'}]},
    {txt:'Se distinguen a simple vista', hijos:[{txt:'Agua con [[aceite]]'}]},
    {txt:'Cómo separarlas', hijos:[{txt:'[[Colador]]: arena y agua'},{txt:'Dejar que se [[evapore]]: sal y agua'}]} ], extra:['imán','tijeras'] },
  ciencia4: { titulo:'Los [[materiales]]', nodos:[
    {txt:'[[Naturales]]', hijos:[{txt:'Madera, lana, [[seda]]'}]},
    {txt:'[[Artificiales]]', hijos:[{txt:'El [[plástico]]'}]},
    {txt:'Propiedades', hijos:[{txt:'[[Frágil]]: se rompe al golpearse'},{txt:'[[Flexible]]: se dobla sin romperse'},{txt:'[[Resistente]]: soporta grandes pesos'}]} ], extra:['transparente','líquido'] },
  ciencia5: { titulo:'La luz y el sonido', nodos:[
    {txt:'La [[luz]]', hijos:[{txt:'Natural: el [[Sol]]'},{txt:'Artificial: la [[bombilla]]'},{txt:'[[Opacos]]: no dejan pasar la luz'}]},
    {txt:'El [[sonido]]', hijos:[{txt:'Viaja en [[ondas]] por el aire'},{txt:'Puede ser grave o [[agudo]]'}]} ], extra:['transparentes','agua'] },
  /* Tema 6 */
  digital1: { titulo:'Los dispositivos [[digitales]]', nodos:[
    {txt:'Sirven para', hijos:[{txt:'[[Aprender]]'},{txt:'Divertirnos'},{txt:'[[Comunicarnos]]'}]},
    {txt:'Algunos dispositivos', hijos:[{txt:'Teléfono [[móvil]]: pequeño y táctil'},{txt:'[[Tableta]]: más grande y táctil'},{txt:'[[Portátil]]: para tareas complejas'}]} ], extra:['nevera','lavadora'] },
  digital2: { tipo:'flujo', titulo:'Cómo buscar [[información]]', nodos:[
    {txt:'Abre un [[navegador]]'}, {txt:'Escribe lo que quieres saber en «[[Buscar]]»'}, {txt:'Mira la lista de [[páginas web]]'},
    {txt:'Lee y compara en varias páginas'}, {txt:'Pregunta a una persona [[adulta]]'} ], extra:['desconocido','anuncio'] },
  digital3: { titulo:'Presentamos y guardamos la información', nodos:[
    {txt:'Programas', hijos:[{txt:'Procesador de [[textos]]: escribir'},{txt:'Creador de [[presentaciones]]: exponer'}]},
    {txt:'Dispositivos de [[almacenamiento]]', hijos:[{txt:'Disco [[duro]]: guarda muchísimo'},{txt:'Memoria [[portátil]]: fácil de llevar'},{txt:'[[Tarjeta]] de memoria: cámaras y móviles'}]} ], extra:['bombilla','enchufe'] },
  digital4: { titulo:'Usamos bien los dispositivos', nodos:[
    {txt:'[[Peligros]]', hijos:[{txt:'[[Virus]] informáticos'},{txt:'Contenidos inadecuados: navegar con un [[adulto]]'}]},
    {txt:'Buen [[uso]]', hijos:[{txt:'Controlar el [[tiempo]] de pantalla'},{txt:'Buena [[postura]] y pantalla lejos'}]} ], extra:['velocidad','música'] }
};
CURSO.temas.forEach(t => (t.missions || []).forEach(m => {
  const e = ESQUEMAS[m.id]; if (!e) return;
  m.ch.push(Object.assign({ t:'esquema', tipo:'arbol', q:'Completa el esquema de la misión.', hint:'Repasa las tarjetas de la lección: el esquema las resume.' }, e));
}));

/* ---------- ASOCIACIÓN DE CADA TEMA CON EL CURRÍCULO ----------
   criterios: los del tema (los que no tengan retos aparecen como «no evaluables en el juego»).
   misiones:  criterio que evalúan todos los retos de esa misión (también el jefe final).
   retos:     excepciones para un reto concreto, con la clave «misión#número» (el número empieza en 0;
              en los jefes, los retos propios del jefe son «jefe#x0», «jefe#x1»...). */
const EVALUACION = {
  cuerpo: { criterios:['4.1','5.1','5.2'], saberes:['A.2.1','A.2.5','A.1.3'],
    misiones:{ funciones:['5.1'], movemos:['5.1'], respiramos:['5.1'], alimentamos:['5.1'], reto:['5.1'] },
    retos:{ 'funciones#5':['5.2'], 'movemos#9':['4.1'], 'respiramos#5':['5.2'], 'respiramos#6':['4.1'], 'respiramos#7':['4.1'], 'alimentamos#2':['5.2'] } },
  salud: { criterios:['4.1'], saberes:['A.2.5','A.1.5'],
    misiones:{ salud1:['4.1'], salud2:['4.1'], salud3:['4.1'], salud4:['4.1'], 'reto-salud':['4.1'] } },
  animales: { criterios:['5.1','5.2','5.3'], saberes:['A.2.3','A.2.2','A.2.4','A.1.1'],
    misiones:{ animales1:['5.1'], animales2:['5.1'], animales3:['5.1'], animales4:['5.1'], animales5:['5.2'], 'reto-animales':['5.1'] },
    retos:{ 'animales5#7':['5.3'] } },
  plantas: { criterios:['5.1','5.2','5.3'], saberes:['A.2.1','A.2.3','A.2.4','A.1.6'],
    misiones:{ plantas1:['5.1'], plantas2:['5.1'], plantas3:['5.1'], plantas4:['5.2'], 'reto-plantas':['5.1'] },
    retos:{ 'plantas1#3':['5.2'], 'plantas1#6':['5.2'], 'plantas3#4':['5.2'], 'plantas3#5':['5.2'], 'plantas4#6':['5.3'] } },
  ciencia: { criterios:['2.1','2.3','2.4','2.5','3.1','5.1','5.2'], saberes:['A.1.1','A.1.3','A.1.4','A.3.1','A.3.2','A.3.3'],
    misiones:{ ciencia1:['2.3'], ciencia2:['5.1'], ciencia3:['5.1'], ciencia4:['5.1'], ciencia5:['5.1'], 'reto-ciencia':['5.1'] },
    retos:{ 'ciencia1#2':['2.1'], 'ciencia1#3':['2.1'], 'ciencia1#4':['2.4'], 'ciencia2#3':['5.2'], 'ciencia4#5':['3.1'] } },
  conectados: { criterios:['1.1','2.2','4.1','3.3'], saberes:['B.1.1','A.1.2'],
    misiones:{ digital1:['1.1'], digital2:['2.2'], digital3:['1.1'], digital4:['1.1'], 'reto-digital':['1.1'] },
    retos:{ 'digital2#1':['1.1'], 'digital4#1':['1.1','4.1'], 'digital4#6':['4.1'] } }
};
CURSO.temas.forEach(t => {
  const e = EVALUACION[t.id]; if (!e) return;
  t.criterios = e.criterios; t.saberes = e.saberes;
  [...(t.missions || []), ...(t.boss ? [t.boss] : [])].forEach(m => {
    if (e.misiones && e.misiones[m.id]) m.cr = e.misiones[m.id];
    (m.ch || []).forEach((r, i) => { const k = m.id + '#' + i; if (e.retos && e.retos[k]) r.cr = e.retos[k]; });
    (m.extra || []).forEach((r, i) => { const k = m.id + '#x' + i; if (e.retos && e.retos[k]) r.cr = e.retos[k]; });
  });
});
