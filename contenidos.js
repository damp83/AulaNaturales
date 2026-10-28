/* =====================================================================
   CONTENIDOS DEL CURSO · Exploradores del Cuerpo
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
    /* Temas pendientes: añade misiones y jefe cuando lleguéis a ellos */
    { id:'plantas', n:4, title:'La vida de las plantas', short:'Próximamente', pages:'Págs. 64-79', color:'--virus', icon:'leaf', missions:[] },
    { id:'ciencia', n:5, title:'Nos gusta la ciencia', short:'Próximamente', pages:'Págs. 84-101', color:'--sense', icon:'flask', missions:[] },
    { id:'conectados', n:6, title:'Estamos conectados', short:'Próximamente', pages:'Págs. 102-117', color:'--bone', icon:'wifi', missions:[] }
  ]
};
