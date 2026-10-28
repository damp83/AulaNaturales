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

/* ---------- TEMA 1 · El cuerpo humano (libro, págs. 12-19) ---------- */
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

const CURSO = {
  asignatura: 'Ciencias de la Naturaleza',
  temas: [
    { id:'cuerpo', n:1, title:'El cuerpo humano', short:'Funciones vitales, movimiento, respiración y digestión',
      color:'--lung', icon:'person', map:'body', starsBadge:'Constelación',
      missions: TEMA1_MISIONES, boss: TEMA1_JEFE },
    /* Temas pendientes: cambia el título y añade misiones cuando lleguéis a ellos */
    { id:'salud', n:2, title:'La salud', short:'Hábitos saludables', color:'--ok', icon:'heartplus', missions:[] },
    { id:'animales', n:3, title:'Los animales', short:'Cómo son y cómo viven', color:'--food', icon:'paw', missions:[] },
    { id:'plantas', n:4, title:'Las plantas', short:'Partes y necesidades de las plantas', color:'--virus', icon:'leaf', missions:[] },
    { id:'paisaje', n:5, title:'El agua y el paisaje', short:'El agua, el aire y el paisaje', color:'--sense', icon:'drop', missions:[] },
    { id:'materia', n:6, title:'La materia y las máquinas', short:'Materiales y máquinas', color:'--bone', icon:'gear', missions:[] }
  ]
};
