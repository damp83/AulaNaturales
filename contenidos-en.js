/* =====================================================================
   CONTENIDOS EN INGLÉS · Nature Explorers (Exploradores de la Naturaleza)
   © 2026 Diego Alberto Moya Puerta, Maestro de Educación Primaria, Comunidad Autónoma de la Región de Murcia · Licencia CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)
   ---------------------------------------------------------------------
   Versión inglesa de contenidos.js, adaptada a alumnado de 7-8 años que aprende inglés.
   Solo contiene TEXTOS: la estructura (respuestas correctas, orden, grupos, criterios) se toma
   de contenidos.js, así que el progreso y la evaluación son los mismos en los dos idiomas.

   Reglas para editar:
   - Cada misión tiene las mismas tarjetas (learn) y los mismos retos (ch) EN EL MISMO ORDEN que en
     contenidos.js. El esquema es el último reto de cada misión.
   - En «opts», «items», «pairs», «bins» y «parts» hay que respetar el mismo número y orden de
     elementos que en castellano (la respuesta correcta se identifica por su posición).
   - En «classify», «items» es solo la lista de textos (el grupo de cada uno sale de contenidos.js).
   - En los esquemas, [[palabra]] es un hueco: debe haber el mismo número de huecos.
   ===================================================================== */

const IDIOMA_CONTENIDOS = (() => {
  const CAMPOS = ['q', 'opts', 'hint', 'items', 'bins', 'pairs', 'parts', 'answers', 'bank', 'titulo', 'nodos', 'extra'];
  const copia = v => v === undefined ? undefined : JSON.parse(JSON.stringify(v));
  const ESQ_EN = { q: 'Complete the concept map for this mission.', hint: 'Look at the lesson cards: the concept map sums them up.' };

  // Guarda una vez los textos originales en castellano para poder volver a ellos
  function guardar(curso) {
    if (curso._es) return;
    curso._es = { asignatura: curso.asignatura, situaciones: (curso.situaciones || []).map(s => s.title) };
    curso.temas.forEach(t => {
      t._es = { title: t.title, short: t.short, starsBadge: t.starsBadge };
      [...(t.missions || []), ...(t.boss ? [t.boss] : [])].forEach(m => {
        m._es = { title: m.title, short: m.short, badge: m.badge, villain: m.villain, learn: copia(m.learn) };
        [...(m.ch || []), ...(m.extra || [])].forEach(r => {
          r._es = {};
          CAMPOS.forEach(k => { if (r[k] !== undefined) r._es[k] = copia(r[k]); });
        });
      });
    });
  }

  function ponerReto(r, o, idioma) {
    if (idioma === 'es') { Object.keys(r._es).forEach(k => { r[k] = copia(r._es[k]); }); return; }
    if (r.t === 'esquema') o = Object.assign({}, ESQ_EN, o);
    if (!o) return;
    CAMPOS.forEach(k => {
      if (o[k] === undefined) return;
      if (k === 'items' && r.t === 'classify') r.items = r._es.items.map((it, i) => [o.items[i], it[1]]);
      else r[k] = copia(o[k]);
    });
  }

  function aplicar(curso, idioma) {
    guardar(curso);
    const en = idioma === 'en' ? CONTENIDOS_EN : null;
    curso.asignatura = en ? en.asignatura : curso._es.asignatura;
    (curso.situaciones || []).forEach((s, i) => { s.title = en ? en.situaciones[i] : curso._es.situaciones[i]; });
    curso.temas.forEach(t => {
      const ot = en && en.temas[t.id];
      t.title = ot ? ot.title : t._es.title;
      t.short = ot ? ot.short : t._es.short;
      t.starsBadge = ot && ot.starsBadge ? ot.starsBadge : t._es.starsBadge;
      [...(t.missions || []), ...(t.boss ? [t.boss] : [])].forEach(m => {
        const om = en && en.misiones[m.id];
        ['title', 'short', 'badge', 'villain'].forEach(k => { m[k] = om && om[k] !== undefined ? om[k] : m._es[k]; });
        m.learn = om && om.learn ? copia(om.learn) : copia(m._es.learn);
        (m.ch || []).forEach((r, i) => ponerReto(r, om && om.ch && om.ch[i], idioma));
        (m.extra || []).forEach((r, i) => ponerReto(r, om && om.extra && om.extra[i], idioma));
      });
    });
  }
  return { aplicar };
})();

const CONTENIDOS_EN = {
  asignatura: 'Natural Science 2',
  situaciones: ['Shall we go on a trip?', 'Is water running out?', 'Do you like your neighbourhood?'],
  temas: {
    cuerpo:     { title: 'This is how our body works', short: 'Life processes, movement, breathing and digestion', starsBadge: 'Constellation' },
    salud:      { title: 'We look after our health', short: 'Health, habits, food and accidents', starsBadge: 'Health star' },
    animales:   { title: 'Very different animals', short: 'Animal groups and where animals live', starsBadge: 'Ark of stars' },
    plantas:    { title: 'The life of plants', short: 'Parts, types, reproduction and importance of plants', starsBadge: 'Garden of stars' },
    ciencia:    { title: 'We like science', short: 'Scientific method, matter, mixtures, materials, light and sound', starsBadge: 'Star lab' },
    conectados: { title: 'We are connected', short: 'Devices, the internet, presentations and good use', starsBadge: 'Fully connected' }
  },
  misiones: {
    /* ---------- TOPIC 1 · This is how our body works ---------- */
    funciones: { title: 'How does our body work?', short: 'Life processes', badge: 'Eagle eye',
      learn: [
        { h: 'The three life processes', p: 'All living things do three <mark>life processes</mark>: <mark>interaction</mark>, <mark>nutrition</mark> and <mark>reproduction</mark>.' },
        { h: 'Interaction', p: 'With our <mark>senses</mark> we notice what happens around us and we react. We have five senses and each one has its own organ.',
          extra: '<div class="senses"><b>Sight</b><span>eyes</span><b>Smell</b><span>nose</span><b>Hearing</b><span>ears</span><b>Taste</b><span>tongue</span><b>Touch</b><span>skin</span></div>' },
        { h: 'Nutrition', p: 'We breathe and eat food. Food helps us to <mark>grow</mark> and gives us <mark>energy</mark> for our daily activities.' },
        { h: 'Reproduction', p: 'Adults can reproduce. This means they can <mark>have children</mark>.' }
      ],
      ch: [
        { q: 'How many life processes do living things do?', opts: ['Two', 'Three', 'Five'], hint: 'They are interaction, nutrition and reproduction.' },
        { q: 'Match each sense with its organ.', pairs: [['Sight', 'Eyes'], ['Smell', 'Nose'], ['Hearing', 'Ears'], ['Taste', 'Tongue'], ['Touch', 'Skin']], hint: 'Think: what do you see, smell, hear, taste and touch with?' },
        { q: 'Ivan picks a tangerine because he sees it is orange. Which part of the body helps him?', opts: ['👁️ His eyes', '👅 His tongue'], hint: 'We use our sense of sight to see colours.' },
        { q: 'Ivan thinks the tangerine is very smooth. Which part of the body helps him?', opts: ['👅 His tongue', '✋ His skin'], hint: 'We feel if something is smooth or rough with our sense of touch.' },
        { q: 'Ivan likes the smell of the tangerine. Which part of the body helps him?', opts: ['👂 His ears', '👃 His nose'], hint: 'We notice smells with our sense of smell.' },
        { q: 'A girl touches a cactus, it pricks her and she pulls her hand away. She got the information with her sense of touch.', hint: 'Touch is in the skin. That is why she feels the prick.' },
        { q: 'Which life process is each activity?', bins: ['Interaction', 'Nutrition', 'Reproduction'],
          items: ['🥣 Having breakfast', '⚽ Playing at break time', '🌬️ Breathing', '🎵 Listening to music', '👶 An adult has a baby', '🌸 Smelling a flower', '🍎 Eating fruit'],
          hint: 'Interaction: we use our senses and react. Nutrition: we eat and breathe. Reproduction: having children.' },
        { q: 'Which life process can’t children do?', opts: ['Interaction', 'Nutrition', 'Reproduction'], hint: 'Only adults can have children.' },
        { q: 'We have three senses: sight, hearing and taste.', hint: 'We have five senses: sight, smell, hearing, taste and touch.' },
        { titulo: 'The [[life processes]]', nodos: [
          { txt: '[[Interaction]]', hijos: [{ txt: 'We use our five [[senses]]' }] },
          { txt: '[[Nutrition]]', hijos: [{ txt: 'We [[breathe]] and eat to grow' }] },
          { txt: '[[Reproduction]]', hijos: [{ txt: 'Adults can have [[children]]' }] }], extra: ['bones', 'digestion'] }
      ] },
    movemos: { title: 'How do we move?', short: 'Bones, joints and muscles', badge: 'Steel skeleton',
      learn: [
        { h: 'Bones', p: '<mark>Bones</mark> are inside our body. They are <mark>hard and stiff</mark>: they can’t bend. All our bones together make the <mark>skeleton</mark>.',
          extra: '<div class="tags"><span class="tag">skull</span><span class="tag">ribs</span><span class="tag">spine</span><span class="tag">femur</span><span class="tag">tibia</span></div>' },
        { h: 'Joints', p: '<mark>Joints</mark> are where bones meet. Thanks to joints we can <mark>bend</mark> some parts of our body.',
          extra: '<div class="tags"><span class="tag">shoulder</span><span class="tag">elbow</span><span class="tag">wrist</span><span class="tag">knee</span><span class="tag">ankle</span></div>' },
        { h: 'Muscles', p: '<mark>Muscles</mark> are under the skin and cover the bones. They are <mark>soft and stretchy</mark>: they stretch and shrink without breaking. To move, muscles <mark>pull the bones</mark>.',
          extra: '<div class="tags"><span class="tag">biceps</span><span class="tag">pectoral</span><span class="tag">abdominals</span><span class="tag">gluteus</span><span class="tag">calves</span></div>' },
        { h: 'Look after your body', p: 'It is important to do <mark>exercise</mark> to have healthy bones and muscles.' }
      ],
      ch: [
        { q: 'What do we call all the bones of the body together?', opts: ['Muscle', 'Skeleton', 'Joint'], hint: 'All the bones together make the skeleton.' },
        { q: 'Is it a bone, a joint or a muscle?', bins: ['Bone', 'Joint', 'Muscle'],
          items: ['Skull', 'Elbow', 'Biceps', 'Femur', 'Knee', 'Calves', 'Ribs', 'Ankle', 'Pectoral', 'Shoulder', 'Tibia', 'Abdominals'],
          hint: 'Joints: shoulder, elbow, wrist, knee and ankle. Muscles: biceps, pectoral, abdominals, gluteus and calves.' },
        { q: 'Is it about bones or about joints?', bins: ['Bones', 'Joints'],
          items: ['They can’t bend', 'They make the skeleton', 'They let us bend some parts of the body', 'They are hard and stiff', 'They are where bones meet'],
          hint: 'Bones are hard and make the skeleton. Joints join the bones and let us bend.' },
        { q: 'Tap the TWO leg bones.', opts: ['Femur', 'Skull', 'Tibia', 'Ribs', 'Elbow'], hint: 'The elbow is a joint. The skull and the ribs are not in the legs.' },
        { q: 'Tap the joints in the arms.', opts: ['Shoulder', 'Knee', 'Elbow', 'Ankle', 'Wrist'], hint: 'The knee and the ankle are in the legs.' },
        { q: 'Tap the things that are stretchy like muscles.', opts: ['🎈 Balloon', '🔩 Screw', '➰ Rubber band', '🪨 Stone', '🌀 Spring'], hint: 'Stretchy means it stretches and shrinks without breaking.' },
        { q: 'Tap the muscles in the trunk.', opts: ['Pectoral', 'Calves', 'Abdominals', 'Biceps'], hint: 'The calves are in the legs and the biceps is in the arm.' },
        { q: 'To help us move, muscles…', opts: ['pull the bones', 'break', 'become hard'], hint: 'Muscles pull the bones and that is how we move.' },
        { q: 'Muscles are hard and stiff.', hint: 'Muscles are soft and stretchy. Bones are hard and stiff.' },
        { q: 'Doing exercise helps us to have healthy bones and muscles.', hint: 'Exercise looks after our bones and muscles.' },
        { titulo: 'How do we move?', nodos: [
          { txt: '[[Bones]]', hijos: [{ txt: 'They are hard and [[stiff]]' }, { txt: 'All together they make the [[skeleton]]' }] },
          { txt: '[[Joints]]', hijos: [{ txt: 'They are where bones meet' }, { txt: 'For example: the elbow and the [[knee]]' }] },
          { txt: '[[Muscles]]', hijos: [{ txt: 'They are soft and [[stretchy]]' }, { txt: 'They [[pull]] the bones' }] }], extra: ['skull', 'hard'] }
      ] },
    respiramos: { title: 'How do we breathe?', short: 'The journey of air', badge: 'Champion lungs',
      learn: [
        { h: 'Oxygen', p: 'When we breathe, we get the <mark>oxygen</mark> we need to live. Oxygen is a <mark>gas in the air</mark>.' },
        { h: 'The journey of air', p: 'This is how air travels through our body:',
          extra: '<ol class="steps"><li>We breathe in through our <mark>nose</mark> or <mark>mouth</mark>.</li><li>The air goes down a tube called the <mark>windpipe</mark>.</li><li>The air reaches the <mark>lungs</mark>. There, the body takes the oxygen.</li><li>The air that is left goes back up and out through the mouth and nose.</li></ol>' },
        { h: 'Breathing in and out', p: 'When we <mark>breathe in</mark>, air comes in and our lungs fill up. When we <mark>breathe out</mark>, air leaves the body.' },
        { h: 'Breathing to calm down', p: 'Breathing deeply helps us to <mark>calm down</mark>. Breathe in through your nose, hold it for a few seconds and breathe out slowly through your mouth.' }
      ],
      ch: [
        { q: 'When we breathe, we get a gas that we need to live. What is it?', opts: ['💨 Oxygen', '🔥 Smoke', '☁️ Steam'], hint: 'It is a gas in the air and it starts with O.' },
        { q: 'Put the journey of air in order.', items: ['We breathe in through the nose or mouth', 'The air goes down the windpipe', 'The air reaches the lungs', 'The air that is left goes out through the mouth and nose'], hint: 'Start where the air comes in and finish where it goes out.' },
        { q: 'Complete the journey of air.', parts: ['It comes in through the ', 0, ' → goes down the ', 1, ' → reaches the ', 2, '.'], answers: ['nose', 'windpipe', 'lungs'], bank: ['oesophagus', 'stomach'], hint: 'The oesophagus and the stomach are for digestion, not for breathing.' },
        { q: 'Where does the body take the oxygen we need?', opts: ['In the stomach', 'In the lungs', 'In the windpipe'], hint: 'The windpipe is only a tube. The body takes oxygen in the lungs.' },
        { q: 'Is it breathing in or breathing out?', bins: ['Breathing in', 'Breathing out'],
          items: ['Air comes into the body', 'Air leaves the body', 'The lungs fill up', 'We blow air out of the mouth'],
          hint: 'Breathing in: air comes in. Breathing out: air goes out.' },
        { q: 'How do you breathe when you…?', bins: ['Slowly', 'Fast'],
          items: ['📖 read a story', '🏃 run', '✏️ draw', '💃 dance', '😴 sleep', '🪁 run with a kite'],
          hint: 'When we move a lot, we breathe faster.' },
        { q: 'Put the calming exercise in order.', items: ['Breathe in through your nose until your lungs are full', 'Hold the air in for a few seconds', 'Breathe out slowly through your mouth'], hint: 'First breathe in, then hold, and last breathe out.' },
        { q: 'You feel nervous. What can help you calm down?', opts: ['Breathing deeply a few times', 'Shouting very loudly', 'Not breathing for a long time'], hint: 'Breathing slowly and deeply helps us calm down.' },
        { tipo: 'flujo', titulo: 'The journey of [[air]]', nodos: [
          { txt: 'It comes in through the [[nose]] or the mouth' }, { txt: 'It goes down the [[windpipe]]' }, { txt: 'It reaches the [[lungs]]' },
          { txt: 'The body takes the [[oxygen]]' }, { txt: 'The air that is left goes [[out]]' }], extra: ['oesophagus', 'stomach'] }
      ] },
    alimentamos: { title: 'How do we digest food?', short: 'Digestion', badge: 'Super digestion',
      learn: [
        { h: 'Digestion', p: 'Eating is part of nutrition. Inside the body, <mark>digestion</mark> changes food into simpler substances called <mark>nutrients</mark>.' },
        { h: 'Nutrients', p: 'Nutrients give us two very important things:',
          extra: '<div class="flow"><span class="box fill">Food</span><span class="arrow">is made of ↓</span><span class="box">Nutrients</span><span class="arrow">that give us ↓</span><div class="split"><div class="flow"><span class="box">Matter</span><span class="arrow">that helps us grow</span></div><div class="flow"><span class="box">Energy</span><span class="arrow">for our activities</span></div></div></div>' },
        { h: 'The journey of food', p: 'This is the journey of food:',
          extra: '<ol class="steps"><li>We put food in our <mark>mouth</mark> and chew it with our <mark>teeth</mark>.</li><li>The chewed food goes down a tube called the <mark>oesophagus</mark>.</li><li>In the <mark>stomach</mark>, food breaks down into smaller pieces.</li><li>Nutrients pass into the body through the <mark>intestines</mark>.</li><li>The waste we don’t use leaves the body through the <mark>anus</mark>.</li></ol>' }
      ],
      ch: [
        { q: 'What is digestion?', opts: ['Food going from the mouth to the stomach', 'The way our body changes food inside us'], hint: 'Digestion changes food into nutrients.' },
        { q: 'Food is made of…', opts: ['nutrients', 'bones', 'air'], hint: 'Digestion takes the nutrients out of food.' },
        { q: 'Nutrients give us matter and energy. What is each one for?', bins: ['Matter', 'Energy'],
          items: ['📏 Growing', '🥋 Doing karate', '🏃 Running and playing', '🧒 Getting taller'],
          hint: 'Matter helps us grow. Energy is for our activities.' },
        { q: 'Tap the parts of the body we use for digestion.', opts: ['Stomach', 'Tibia', 'Elbow', 'Teeth', 'Intestines', 'Mouth', 'Anus', 'Gluteus'], hint: 'The tibia is a bone, the elbow is a joint and the gluteus is a muscle.' },
        { q: 'Put the journey of food in order.', items: ['Food goes into the mouth', 'The teeth chew the food', 'Food goes down the oesophagus', 'Food breaks down in the stomach', 'The nutrients we need pass into our body', 'The waste leaves the body'], hint: 'Start in the mouth and finish when the waste leaves the body.' },
        { q: 'When the food is well chewed, it goes down a tube called the…', opts: ['windpipe', 'oesophagus', 'intestine'], hint: 'Air goes down the windpipe. Food goes down the oesophagus.' },
        { q: 'Match each part with what it does.', pairs: [['Teeth', 'Chew the food'], ['Oesophagus', 'Tube that food goes down'], ['Stomach', 'Breaks down the food'], ['Intestines', 'Pass nutrients into the body'], ['Anus', 'Lets the waste out']], hint: 'Look at the journey of food in the lesson.' },
        { q: 'Nutrients pass into the body through the intestines.', hint: 'Yes: the intestines pass the nutrients into the body.' },
        { tipo: 'flujo', titulo: 'The journey of [[food]]', nodos: [
          { txt: 'Mouth: the [[teeth]] chew the food' }, { txt: '[[Oesophagus]]: the tube that food goes down' },
          { txt: '[[Stomach]]: food breaks down' }, { txt: '[[Intestines]]: nutrients pass into the body' },
          { txt: '[[Anus]]: the waste leaves the body' }], extra: ['windpipe', 'lungs'] }
      ] },
    reto: { title: 'The Big Challenge', short: 'Review of the whole journey', badge: 'Great explorer', villain: 'Grumpy Virus',
      extra: [
        { q: 'Where does it go: air or food?', bins: ['Air', 'Food'], items: ['Windpipe', 'Oesophagus', 'Lungs', 'Stomach', 'Intestines', 'Nose'],
          hint: 'Air goes down the windpipe to the lungs. Food goes down the oesophagus to the stomach.' }
      ] },
    /* ---------- TOPIC 2 · We look after our health ---------- */
    salud1: { title: 'How do we look after our health?', short: 'Illnesses, vaccines and health workers', badge: 'Super doctor',
      learn: [
        { h: 'Health', p: 'We are <mark>healthy</mark> when our body works well and we feel good inside and outside. If a part of the body does not work well, we feel bad because we are <mark>ill</mark>.',
          extra: '<div class="tags"><span class="tag">a cold</span><span class="tag">the flu</span><span class="tag">COVID</span></div>' },
        { h: 'The health centre', p: 'When we don’t feel well, we go to the <mark>health centre</mark>. There, <mark>paediatricians</mark>, the doctors who look after children, check us and give us <mark>medicines</mark> to make us better.' },
        { h: 'Vaccines', p: 'To stop some illnesses we must have <mark>vaccines</mark>. A vaccine is a kind of medicine that helps to <mark>prevent</mark> an illness. This means it stops the illness from starting.' },
        { h: 'Health workers', p: 'Different health workers help us at the health centre:',
          extra: '<div class="senses"><b>Doctor</b><span>finds out what illness we have and decides how to cure it.</span><b>Nurse</b><span>looks after our cuts and gives us vaccines.</span><b>Psychologist</b><span>helps us when we are sad or worried.</span></div>' }
      ],
      ch: [
        { q: 'We are healthy when our body works well and we feel good inside and outside.', hint: 'This is how the book explains good health.' },
        { q: 'Tap the illnesses.', opts: ['A cold', 'The flu', 'A vaccine', 'COVID', 'The paediatrician'], hint: 'A vaccine is a medicine and a paediatrician is a doctor.' },
        { q: 'What do we call the doctors who look after children?', opts: ['Paediatricians', 'Psychologists', 'Vets'], hint: 'They check us at the health centre when we are children.' },
        { q: 'What do we use in each case?', parts: ['To prevent illnesses → ', 0, '. To cure illnesses → ', 1, '.'], answers: ['vaccines', 'medicines'], bank: ['toys', 'sweets'], hint: 'Vaccines stop illnesses from starting. Medicines make us better.' },
        { q: 'Match each health worker with what they do.', pairs: [['Doctor', 'Finds out what illness we have and how to cure it'], ['Nurse', 'Looks after our cuts and gives us vaccines'], ['Psychologist', 'Helps us when we are sad or worried']], hint: 'Look at the health workers card.' },
        { q: 'When we don’t feel well, where do we go?', opts: ['🏥 To the health centre', '🛒 To the supermarket', '🛝 To the park'], hint: 'There they check us and give us medicines.' },
        { q: 'To prevent an illness means…', opts: ['to stop it from starting', 'to cure it when we already have it', 'to give it to another person'], hint: 'Vaccines help to prevent illnesses.' },
        { q: 'Vaccines are a kind of medicine.', hint: 'Yes: they are medicines that help to prevent illnesses.' },
        { titulo: 'We look after our [[health]]', nodos: [
          { txt: 'If we are ill: [[health centre]]', hijos: [{ txt: '[[Paediatricians]] check us' }, { txt: '[[Medicines]] make us better' }] },
          { txt: 'To prevent illnesses: [[vaccines]]' },
          { txt: 'Health workers', hijos: [{ txt: '[[Doctor]]: decides how to cure us' }, { txt: '[[Nurse]]: looks after cuts' }, { txt: '[[Psychologist]]: helps if we are sad' }] }], extra: ['sweets', 'toys'] }
      ] },
    salud2: { title: 'Do we have healthy habits?', short: 'Hygiene, exercise, posture and rest', badge: 'Champion habits',
      learn: [
        { h: 'Healthy habits', p: 'To look after our health we need <mark>healthy habits</mark>: hygiene, exercise, good posture, rest and good food.' },
        { h: 'Hygiene', p: 'To stop illnesses we must <mark>wash our hands well</mark>, <mark>have a shower</mark> often and <mark>brush our teeth</mark> after every meal.' },
        { h: 'Exercise and posture', p: 'Sport and exercise make our muscles and bones <mark>stronger</mark>. Sitting and standing in a <mark>good posture</mark> looks after our body and stops back pain.' },
        { h: 'Rest and food', p: 'Children should sleep about <mark>ten hours</mark> a day. Good food, with lots of <mark>fruit and vegetables</mark>, helps us grow healthy and gives us energy.' }
      ],
      ch: [
        { q: 'Is it a healthy habit?', bins: ['Healthy', 'Not healthy'],
          items: ['😴 Sleeping ten hours', '😪 Sleeping six hours', '🪥 Brushing your teeth once a day', '🚿 Having a shower often', '🎾 Playing tennis often', '🍎 Eating fruit every day', '🪑 Sitting with a straight back'],
          hint: 'We should sleep about ten hours and brush our teeth after every meal.' },
        { q: 'How many hours should children sleep?', opts: ['About ten hours', 'About six hours', 'About three hours'], hint: 'Rest is very important: about ten hours a day.' },
        { q: 'Tap the things you use for your hygiene.', opts: ['Toothbrush and toothpaste', 'Shower gel', 'Sponge', 'Comb', 'Lollipop', 'Games console'], hint: 'A lollipop and a games console are not for hygiene.' },
        { q: 'Which activity helps you to be healthy?', opts: ['⚽ Playing in the park with your friends', '📺 Watching TV'], hint: 'Moving and doing exercise make your body stronger.' },
        { q: 'We should brush our teeth…', opts: ['after every meal', 'once a week', 'only on Sundays'], hint: 'After every meal.' },
        { q: 'Sport and exercise make our muscles and bones stronger.', hint: 'That is why it is a healthy habit.' },
        { q: 'Sitting in any way you like does not affect your back.', hint: 'A good posture stops back pain.' },
        { q: 'Match each habit with an example.', pairs: [['Hygiene', 'Washing your hands well'], ['Exercise', 'Swimming in the pool'], ['Rest', 'Sleeping ten hours'], ['Food', 'Eating fruit and vegetables'], ['Posture', 'Sitting with a straight back']], hint: 'Look at the healthy habits cards.' },
        { titulo: '[[Healthy]] habits', nodos: [
          { txt: '[[Hygiene]]', hijos: [{ txt: 'Wash your hands and brush your [[teeth]]' }] },
          { txt: '[[Exercise]]', hijos: [{ txt: 'It makes muscles and bones stronger' }] },
          { txt: '[[Rest]]', hijos: [{ txt: 'Sleep about [[ten]] hours' }] },
          { txt: 'Good [[posture]]', hijos: [{ txt: 'A straight back when you sit' }] }], extra: ['six', 'TV'] }
      ] },
    salud3: { title: 'Do we eat well?', short: 'Food groups', badge: 'Healthy chef',
      learn: [
        { h: 'Eating well', p: 'To be healthy we must eat well:',
          extra: '<ol class="steps"><li>We need to have <mark>five meals</mark> a day.</li><li>We should have a <mark>good breakfast</mark>.</li><li>It is good to eat <mark>fresh food</mark>.</li></ol>' },
        { h: 'Food groups', p: 'To be healthy we should eat <mark>different kinds</mark> of food in the right amounts.',
          extra: '<div class="senses"><b>Energy</b><span>bread, pasta, potatoes, oil.</span><b>Growing</b><span>milk, eggs, fish, meat.</span><b>Vitamins and fibre</b><span>fruit and vegetables.</span></div>' },
        { h: 'Water', p: 'As well as eating well, we must drink enough <mark>water</mark>.' }
      ],
      ch: [
        { q: 'How many meals do we need to have a day?', opts: ['Five', 'Two', 'Eight'], hint: 'Breakfast, morning snack, lunch, afternoon snack and dinner.' },
        { q: 'Which group does each food belong to?', bins: ['Energy', 'Growing', 'Vitamins and fibre'],
          items: ['🍞 Bread', '🥔 Potatoes', '🍝 Pasta', '🥛 Milk', '🥚 Eggs', '🐟 Fish', '🍗 Chicken', '🥕 Carrot', '🍊 Orange', '🥬 Lettuce'],
          hint: 'Energy: bread, pasta and potatoes. Growing: milk, eggs, fish and meat. Vitamins and fibre: fruit and vegetables.' },
        { q: 'Tap the foods you would choose for a healthy breakfast.', opts: ['🍏 Apple', '🍌 Banana', '🥛 Milk', 'Yoghurt with fruit', 'Chocolate cereal', '🥐 Croissant', 'Chocolate pancake'], hint: 'Choose fruit and milk products. Cakes and chocolate are not for every day.' },
        { q: 'The foods that help us grow are…', opts: ['milk, eggs and fish', 'bread and pasta', 'fruit and vegetables'], hint: 'Bread and pasta give energy; fruit and vegetables give vitamins.' },
        { q: 'Fruit and vegetables give us…', opts: ['vitamins and fibre', 'a lot of sugar', 'a lot of fat'], hint: 'They help our body work well.' },
        { q: 'As well as eating well, we must drink enough water.', hint: 'Water is very important to be healthy.' },
        { q: 'To be healthy, we should always eat the same food.', hint: 'We should eat different kinds of food.' },
        { q: 'Menu: lentils with chorizo, breaded chicken with chips, sponge cake, a fizzy drink and bread. How can it be healthier?', opts: ['Adding fruit or vegetables and drinking water instead of a fizzy drink', 'Having two pieces of cake', 'Drinking another fizzy drink'], hint: 'It needs food with vitamins and fibre, and water is better than a fizzy drink.' },
        { titulo: 'The [[food]] groups', nodos: [
          { txt: 'They give us [[energy]]', hijos: [{ txt: 'Bread, pasta and [[potatoes]]' }] },
          { txt: 'They help us [[grow]]', hijos: [{ txt: 'Milk, eggs and [[fish]]' }] },
          { txt: '[[Vitamins]] and fibre', hijos: [{ txt: '[[Fruit]] and vegetables' }] },
          { txt: 'And drink lots of [[water]]' }], extra: ['fizzy drinks', 'cakes'] }
      ] },
    salud4: { title: 'How can we prevent accidents?', short: 'Safety at home and outside', badge: 'Safety shield',
      learn: [
        { h: 'Accidents', p: '<mark>Accidents</mark> can be dangerous for our health. If we are <mark>careful</mark>, we can stop many accidents.' },
        { h: 'At home', p: 'We prevent accidents at home:',
          extra: '<ol class="steps"><li>Pick up your toys and things from the floor so nobody trips.</li><li>Never touch <mark>sockets</mark> and be careful with electrical things.</li><li>Be very careful in the shower so you don’t slip.</li></ol>' },
        { h: 'Outside', p: 'We prevent accidents outside:',
          extra: '<ol class="steps"><li>Walk on the pavement and cross at the <mark>zebra crossing</mark>.</li><li>Wear a <mark>seat belt</mark> in the car and a <mark>helmet</mark> on a bike or scooter.</li><li>Don’t run or play on stairs or in high places.</li></ol>' },
        { h: 'Protection in sport', p: 'Some things protect our body when we do sport.',
          extra: '<div class="tags"><span class="tag">helmet</span><span class="tag">gloves</span><span class="tag">knee pads</span><span class="tag">goggles</span></div>' }
      ],
      ch: [
        { q: 'Tap what you should do to prevent accidents at home.', opts: ['Be careful with knives and kitchen tools', 'Heat food on the cooker without help', 'Pick up everything you see on the floor', 'Walk barefoot when the floor is wet'], hint: 'Cooking needs an adult’s help and a wet floor is slippery.' },
        { q: 'Tap the things that protect your body when you do sport.', opts: ['⛑️ Helmet', '🧤 Gloves', 'Knee pads', '🥽 Goggles', 'Trouser belt', '🎾 Racket'], hint: 'A racket is for playing and a trouser belt does not protect you.' },
        { q: 'Match each object with the accident it can cause.', pairs: [['Iron', 'You can burn yourself'], ['Scissors', 'You can cut yourself'], ['Socket', 'You can get an electric shock']], hint: 'Think: what happens if you use each object badly?' },
        { q: 'Is the child being careful?', bins: ['Careful', 'Not careful'],
          items: ['🛼 Skates with a helmet and knee pads', 'Climbs on the stair rail', '🚸 Crosses at the zebra crossing', 'Runs on the escalator', '🧸 Picks up toys from the floor', '🔌 Touches sockets', '🚗 Wears a seat belt in the car'],
          hint: 'Being careful stops many accidents.' },
        { q: 'Where should we cross the street?', opts: ['🚸 At the zebra crossing', 'Anywhere we like', 'Running between the cars'], hint: 'Always at the zebra crossing.' },
        { q: 'If you ride a bike or a scooter, you must wear a helmet.', hint: 'A helmet protects your head.' },
        { q: 'We can stop many accidents by being careful.', hint: 'This is what the lesson explains.' },
        { q: 'What should you do in the shower?', opts: ['Be very careful so you don’t slip', 'Run in the shower', 'Play jumping games'], hint: 'A wet floor is slippery.' },
        { titulo: 'We prevent [[accidents]]', nodos: [
          { txt: 'At [[home]]', hijos: [{ txt: 'Pick up toys from the floor' }, { txt: 'Don’t touch [[sockets]]' }] },
          { txt: 'Outside', hijos: [{ txt: 'Cross at the [[zebra]] crossing' }, { txt: 'Wear a seat [[belt]] in the car' }, { txt: 'Wear a [[helmet]] on a bike' }] }], extra: ['scissors', 'stairs'] }
      ] },
    'reto-salud': { title: 'The Big Health Challenge', short: 'Review of the whole topic', badge: 'Health hero', villain: 'Snotty Germ',
      extra: [
        { q: 'Is it good for your health or not?', bins: ['Good for health', 'Not good'], items: ['🍎 Eating fruit and vegetables', '💉 Having vaccines', 'Sleeping very little', '🧼 Washing your hands', 'Riding a bike without a helmet', 'Doing no exercise at all'],
          hint: 'Healthy habits and prevention look after our health.' }
      ] },
    /* ---------- TOPIC 3 · Very different animals ---------- */
    animales1: { title: 'How do we classify animals?', short: 'Vertebrates and invertebrates', badge: 'Expert classifier',
      learn: [
        { h: 'Vertebrates and invertebrates', p: 'Some animals have a skeleton inside their body and some don’t. <mark>Vertebrates</mark> have a skeleton made of bones with a <mark>backbone</mark>. <mark>Invertebrates</mark> have no bones.',
          extra: '<div class="senses"><b>Vertebrates</b><span>wolf, seagull, rabbit, toad.</span><b>Invertebrates</b><span>wasp, jellyfish, snail, spider.</span></div>' },
        { h: 'The body of vertebrates', p: 'Vertebrates have a <mark>head, a trunk and a tail</mark>, but some have no tail. Their limbs can be <mark>legs, fins or wings</mark>.' },
        { h: 'Five groups of vertebrates', p: 'There are five groups of vertebrates:',
          extra: '<div class="tags"><span class="tag">mammals</span><span class="tag">birds</span><span class="tag">reptiles</span><span class="tag">amphibians</span><span class="tag">fish</span></div>' }
      ],
      ch: [
        { q: 'Is it a vertebrate or an invertebrate?', bins: ['Vertebrate', 'Invertebrate'],
          items: ['🐜 Ant', '🕷️ Spider', '🐠 Clownfish', 'Seagull', '🐸 Toad', '🐰 Rabbit', '🐌 Snail', 'Mussel', '🐺 Wolf', 'Jellyfish'],
          hint: 'Vertebrates have bones and a backbone. Invertebrates have no bones.' },
        { q: 'Vertebrates have…', opts: ['a skeleton with a backbone', 'a body with no bones', 'always eight legs'], hint: 'Their name comes from the vertebrae of the backbone.' },
        { q: 'Invertebrates have no bones.', hint: 'Yes: they don’t have a skeleton made of bones.' },
        { q: 'Tap the body parts of vertebrates.', opts: ['Head', 'Trunk', 'Tail', 'Tentacles', 'Shell'], hint: 'Head, trunk and tail (but some have no tail).' },
        { q: 'Tap the five groups of vertebrates.', opts: ['Mammals', 'Birds', 'Insects', 'Reptiles', 'Amphibians', 'Fish', 'Spiders'], hint: 'Insects and spiders are invertebrates.' },
        { q: 'The limbs of vertebrates can be…', opts: ['legs, fins or wings', 'antennae and tentacles', 'shells and claws'], hint: 'A pigeon has wings and legs; a tuna has fins.' },
        { q: 'A dragonfly and a canary have wings. How are they different?', opts: ['The canary is a vertebrate and the dragonfly is an invertebrate', 'They are both vertebrates', 'They are both invertebrates'], hint: 'A canary is a bird and a dragonfly is an insect.' },
        { titulo: 'We classify animals', nodos: [
          { txt: '[[Vertebrates]]: they have [[bones]]', hijos: [{ txt: 'Five groups: mammals, birds, reptiles, [[amphibians]] and fish' }] },
          { txt: '[[Invertebrates]]: they have no bones', hijos: [{ txt: 'Insects, snails, jellyfish…' }] }], extra: ['feathers', 'scales'] }
      ] },
    animales2: { title: 'Mammals and birds', short: 'Viviparous and oviparous', badge: 'Fur and feathers',
      learn: [
        { h: 'Mammals', p: '<mark>Mammals</mark> are <mark>viviparous</mark>: babies are born from their mother’s body. The babies drink milk from their mother’s <mark>breasts</mark>.',
          extra: '<div class="tags"><span class="tag">they have hair</span><span class="tag">they have teeth</span><span class="tag">most have four legs</span></div>' },
        { h: 'Birds', p: '<mark>Birds</mark> are <mark>oviparous</mark>: they hatch from eggs.',
          extra: '<div class="tags"><span class="tag">they have a beak</span><span class="tag">body covered in feathers</span><span class="tag">two wings</span><span class="tag">two legs</span></div>' },
        { h: 'Watch out for tricks!', p: 'A <mark>bat</mark> flies and a <mark>dolphin</mark> swims, but they are both mammals. A <mark>penguin</mark> and an <mark>ostrich</mark> can’t fly, but they are birds.' }
      ],
      ch: [
        { q: 'What are mammals like? Tap the correct ones.', opts: ['They have hair and teeth', 'Most of them walk', 'They are born from their mother’s body', 'They are oviparous', 'New babies drink their mother’s milk'], hint: 'Mammals are viviparous, not oviparous.' },
        { q: 'Is it a mammal or a bird?', bins: ['Mammal', 'Bird'],
          items: ['🐷 Pig', '🦅 Eagle', '🐱 Cat', '🦉 Owl', '🐧 Penguin', '🐬 Dolphin', '🦇 Bat', 'Ostrich', 'Meerkat'],
          hint: 'Hair and babies that drink milk: mammal. Feathers, a beak and eggs: bird.' },
        { q: 'Animals that are born from their mother’s body are called…', opts: ['viviparous', 'oviparous', 'invertebrates'], hint: 'Animals that hatch from eggs are oviparous.' },
        { q: 'Birds hatch from…', opts: ['🥚 eggs', 'their mother’s body', 'plants'], hint: 'Birds are oviparous.' },
        { q: 'Tap what all birds have.', opts: ['A beak', 'Feathers', 'Two wings', 'Two legs', 'Hair', 'Teeth'], hint: 'Hair and teeth are for mammals.' },
        { q: 'A bat flies, but it is a mammal.', hint: 'It has hair and its babies drink milk.' },
        { q: 'A crocodile is a mammal.', hint: 'A crocodile has scales: it is a reptile.' },
        { q: 'A penguin can’t fly. What is it?', opts: ['A bird', 'A mammal', 'A fish'], hint: 'It has feathers and a beak and it hatches from an egg.' },
        { titulo: 'Mammals and birds', nodos: [
          { txt: '[[Mammals]]', hijos: [{ txt: 'They are [[viviparous]]' }, { txt: 'They have [[hair]] and teeth' }, { txt: 'Babies drink [[milk]]' }] },
          { txt: '[[Birds]]', hijos: [{ txt: 'They are [[oviparous]]' }, { txt: 'They have [[feathers]] and a beak' }] }], extra: ['scales', 'fins'] }
      ] },
    animales3: { title: 'Fish, reptiles and amphibians', short: 'Fins, scales and bare skin', badge: 'Scales and fins',
      learn: [
        { h: 'Fish', p: '<mark>Fish</mark> are oviparous and live in water. They have <mark>fins</mark>, their body is covered in <mark>scales</mark> and they breathe in water with their <mark>gills</mark>.' },
        { h: 'Reptiles', p: '<mark>Reptiles</mark> are oviparous. Some live on land and some live in water. They are covered in <mark>scales</mark>, they have a <mark>long tail</mark> and most have four legs. Some have a <mark>shell</mark>.' },
        { h: 'Amphibians', p: '<mark>Amphibians</mark> are oviparous and need to live near water. They have <mark>bare skin</mark> and adults move with their four legs. Their babies are called <mark>tadpoles</mark>: they live in water and swim with their tail.' }
      ],
      ch: [
        { q: 'Which group does each animal belong to?', bins: ['Fish', 'Reptile', 'Amphibian'],
          items: ['🦎 Chameleon', 'Salamander', 'Trout', '🐍 Snake', '🦈 Shark', '🐢 Sea turtle', '🐸 Frog', 'Tuna'],
          hint: 'Fins and gills: fish. Scales and a long tail: reptile. Bare skin: amphibian.' },
        { q: 'Match each group with what it has.', pairs: [['Fish', 'They have fins'], ['Reptiles', 'They have scales and a long tail'], ['Amphibians', 'They have bare skin']], hint: 'Look at the three cards in the lesson.' },
        { q: 'In what order does it happen? Put the life of a frog in order.', items: ['The frog lays its eggs in the water', 'The tadpoles hatch in the water and swim with their tail', 'As they grow, they get legs and lose their tail'], hint: 'First the eggs, then the tadpoles and last the adult frog.' },
        { q: 'Fish breathe in water with their…', opts: ['gills', 'nose', 'fins'], hint: 'Fins are for swimming.' },
        { q: 'What are baby amphibians called?', opts: ['Tadpoles', 'Puppies', 'Chicks'], hint: 'They live in water and swim with their tail.' },
        { q: 'Fish, reptiles and amphibians are oviparous.', hint: 'All three hatch from eggs.' },
        { q: 'All reptiles live in water.', hint: 'Some live on land and some live in water.' },
        { q: 'Some reptiles, like the tortoise, have…', opts: ['a shell', 'feathers', 'gills'], hint: 'The shell protects its body.' },
        { titulo: 'Fish, reptiles and amphibians', nodos: [
          { txt: '[[Fish]]', hijos: [{ txt: 'They have [[fins]] and scales' }, { txt: 'They breathe with [[gills]]' }] },
          { txt: '[[Reptiles]]', hijos: [{ txt: 'Scales and a long tail' }, { txt: 'Some have a [[shell]]' }] },
          { txt: '[[Amphibians]]', hijos: [{ txt: 'They have [[bare]] skin' }, { txt: 'Their babies are [[tadpoles]]' }] }], extra: ['feathers', 'hair'] }
      ] },
    animales4: { title: 'What are invertebrates like?', short: 'Insects, molluscs and more', badge: 'Bug hunter',
      learn: [
        { h: 'Invertebrates', p: 'Animals without a skeleton made of bones are <mark>invertebrates</mark>. There are many different kinds and most are <mark>oviparous</mark>.',
          extra: '<div class="senses"><b>Squid</b><span>soft body with eight arms and two tentacles.</span><b>Snail</b><span>protected by a shell.</span><b>Crab</b><span>two claws and a hard shell.</span></div>' },
        { h: 'Insects', p: '<mark>Insects</mark> are the biggest group of invertebrates. Most have <mark>wings</mark>. They have <mark>two antennae</mark> on their head and <mark>six legs</mark>.' },
        { h: 'From caterpillar to butterfly', p: 'When insects hatch from their eggs, they look very different from the adults.',
          extra: '<ol class="steps"><li>Eggs</li><li>Caterpillar</li><li>Cocoon</li><li>Butterfly</li></ol>' }
      ],
      ch: [
        { q: 'Match each animal with what it has.', pairs: [['Clam', 'It has two shells'], ['Prawn', 'It has antennae'], ['Earthworm', 'It has a bare body'], ['Octopus', 'It has eight arms']], hint: 'Look at the body of each animal.' },
        { q: 'Tap the true sentences about invertebrates.', opts: ['Some have wings', 'Most are oviparous', 'Insects are invertebrates', 'They have a skeleton of bones', 'They all look very similar', 'Some protect their body with a shell'], hint: 'They have no bones and there are many very different kinds.' },
        { q: 'Put the changes of a butterfly in order.', items: ['Eggs', 'Caterpillar', 'Cocoon', 'Butterfly'], hint: 'A caterpillar comes out of the egg.' },
        { q: 'Tap what insects have.', opts: ['Six legs', 'Two antennae', 'Most have wings', 'Eight legs', 'A backbone'], hint: 'Insects have six legs, not eight.' },
        { q: 'Is a spider an insect?', opts: ['No, because it has eight legs and no antennae', 'Yes, because it has wings', 'Yes, because it has six legs'], hint: 'Count its legs: it has eight.' },
        { q: 'Which of these animals does not live in water?', opts: ['Centipede', 'Mussel', 'Starfish'], hint: 'Mussels and starfish live in the sea.' },
        { q: 'Crabs have…', opts: ['two claws and a hard shell', 'feathers and a beak', 'hair and teeth'], hint: 'The shell protects their soft body.' },
        { q: 'Insects are the biggest group of invertebrates.', hint: 'There are very, very many kinds of insects.' },
        { titulo: '[[Invertebrates]]', nodos: [
          { txt: '[[Insects]]', hijos: [{ txt: 'Six [[legs]] and two [[antennae]]' }, { txt: 'Egg, [[caterpillar]], cocoon, butterfly' }] },
          { txt: 'Other invertebrates', hijos: [{ txt: 'Snail: it has a [[shell]]' }, { txt: 'Crab: two [[claws]]' }, { txt: 'Squid: eight [[arms]]' }] }], extra: ['bones', 'feathers'] }
      ] },
    animales5: { title: 'Where do animals live?', short: 'Land and water habitats', badge: 'Habitat explorer',
      learn: [
        { h: 'Land habitats', p: 'Some places are on dry land:',
          extra: '<div class="senses"><b>Forests</b><span>lots of trees grow. Squirrels and birds live there.</span><b>Grasslands</b><span>lots of grass grows. Rabbits and zebras live there.</span><b>Deserts</b><span>there is very little water. Scorpions and camels live there.</span><b>Poles</b><span>covered in ice. Polar bears in the north and penguins in the south.</span></div>' },
        { h: 'Water habitats', p: 'These places are covered in water:',
          extra: '<div class="senses"><b>Rivers and lakes</b><span>fresh water. Fish, frogs and invertebrates live there.</span><b>Seas and oceans</b><span>salt water. Whales, jellyfish and crabs live there.</span></div>' }
      ],
      ch: [
        { q: 'Is it a land habitat or a water habitat?', bins: ['Land', 'Water'],
          items: ['🌳 Forest', 'River', '🏜️ Desert', '🌊 Sea', 'Grassland', 'Lake', '🧊 Pole', 'Ocean'],
          hint: 'Water habitats are covered in water.' },
        { q: 'Match each place with the animals that live there.', pairs: [['Forest', 'Squirrels and birds'], ['Grassland', 'Rabbits and zebras'], ['Desert', 'Scorpions and camels'], ['Poles', 'Polar bears and penguins']], hint: 'Look at the land habitats card.' },
        { q: 'Where does each animal live?', bins: ['Forest', 'River'], items: ['Wild boar', 'Barbel fish', 'Crayfish', '🐿️ Squirrel'], hint: 'A barbel is a river fish.' },
        { q: 'How are a river and the sea different?', opts: ['A river has fresh water and the sea has salt water', 'A river has salt water and the sea has fresh water', 'They are the same'], hint: 'Sea water is salty.' },
        { q: 'There are very few plants and animals in deserts because…', opts: ['there is very little water', 'it is very cold', 'there are too many trees'], hint: 'It is very hard to live without water.' },
        { q: 'Polar bears live at the North Pole and penguins live at the South Pole.', hint: 'This is what the lesson explains.' },
        { q: 'Where do whales and jellyfish live?', opts: ['🌊 In seas and oceans', 'In rivers', 'In the desert'], hint: 'They live in salt water.' },
        { q: 'It is important to keep rivers and seas clean.', hint: 'Many animals live there.' },
        { titulo: 'Where do animals live?', nodos: [
          { txt: '[[Land]] habitats', hijos: [{ txt: '[[Forest]]: squirrels and birds' }, { txt: 'Desert: scorpions and [[camels]]' }, { txt: '[[Poles]]: polar bears' }] },
          { txt: '[[Water]] habitats', hijos: [{ txt: 'Rivers and lakes: [[fresh]] water' }, { txt: 'Seas and oceans: [[salt]] water' }] }], extra: ['zebras', 'hot'] }
      ] },
    'reto-animales': { title: 'The Big Animal Challenge', short: 'Review of the whole topic', badge: 'King of the jungle', villain: 'Grumpy Bug',
      extra: [
        { q: 'Is it viviparous or oviparous?', bins: ['Viviparous', 'Oviparous'], items: ['🐄 Cow', '🐔 Hen', '🐬 Dolphin', '🐍 Snake', '🐸 Frog', '🐱 Cat'],
          hint: 'Mammals are viviparous. Birds, reptiles, amphibians and fish are oviparous.' }
      ] },
    /* ---------- TOPIC 4 · The life of plants ---------- */
    plantas1: { title: 'What are plants like?', short: 'Parts of a plant and photosynthesis', badge: 'Champion root',
      learn: [
        { h: 'Living things', p: 'Plants are <mark>living things</mark>: they are born, grow, reproduce and die. They have very different parts and each part has a job.' },
        { h: 'The parts of a plant', p: 'Each part has its job:',
          extra: '<div class="senses"><b>Roots</b><span>hold the plant in the ground and take in water and nutrients from the soil.</span><b>Stem</b><span>holds the plant up and carries water and nutrients.</span><b>Leaves</b><span>take in sunlight and air.</span><b>Flowers</b><span>in most plants they turn into fruits.</span><b>Fruits</b><span>have the seeds inside.</span></div>' },
        { h: 'Photosynthesis', p: 'To live, plants need <mark>sunlight, air, water and nutrients</mark>. They use sunlight to change water and part of the air into their food. This is called <mark>photosynthesis</mark> and it happens in the leaves and other green parts.' }
      ],
      ch: [
        { q: 'Match each part of the plant with what it does.', pairs: [['Roots', 'Hold the plant and take in water'], ['Stem', 'Holds the plant up and carries water'], ['Leaves', 'Take in sunlight and air'], ['Fruits', 'Have the seeds inside']], hint: 'Look at the parts of a plant card.' },
        { q: 'Plants are living things: they are born, grow, reproduce and die.', hint: 'That is why they are living things.' },
        { q: 'What do all plants have in common? Tap the correct ones.', opts: ['They have green parts', 'They have roots', 'They can move by themselves', 'They are born, grow, reproduce and die'], hint: 'Plants can’t move from place to place.' },
        { q: 'Tap what plants need to live.', opts: ['☀️ Sunlight', '💨 Air', '💧 Water', 'Nutrients from the soil', '🍬 Sweets', '📺 TV'], hint: 'Light, air, water and nutrients.' },
        { q: 'Complete.', parts: ['Leaves take in the sun’s ', 0, ' and the ', 1, ' they need to make their food. This is called ', 2, '.'], answers: ['light', 'air', 'photosynthesis'], bank: ['digestion', 'sand'], hint: 'It is the way plants make their food.' },
        { q: 'Where does photosynthesis happen?', opts: ['In the leaves and other green parts', 'In the roots', 'Inside the seeds'], hint: 'It happens where the plant takes in light.' },
        { q: 'A plant has been in a glass of water with no soil for a long time. Can it keep growing?', opts: ['It will be hard: it needs nutrients from the soil', 'Yes, it needs nothing else', 'Yes, because it has leaves'], hint: 'Roots take in nutrients from the soil.' },
        { q: 'In most plants, flowers turn into…', opts: ['fruits', 'roots', 'stems'], hint: 'Fruits have the seeds inside.' },
        { titulo: 'The parts of a [[plant]]', nodos: [
          { txt: '[[Roots]]', hijos: [{ txt: 'They hold the plant and take in water' }] },
          { txt: '[[Stem]]', hijos: [{ txt: 'It holds the plant up' }] },
          { txt: '[[Leaves]]', hijos: [{ txt: 'They take in light and do [[photosynthesis]]' }] },
          { txt: 'Flowers and [[fruits]]', hijos: [{ txt: 'Fruits have the [[seeds]] inside' }] }], extra: ['gills', 'bones'] }
      ] },
    plantas2: { title: 'How do we classify plants?', short: 'Trees, bushes and herbs', badge: 'Forest ranger',
      learn: [
        { h: 'By their stem', p: 'There are three kinds of plants, depending on how tall and thick their stem is:',
          extra: '<div class="senses"><b>Trees</b><span>thick, hard, tall stem called a trunk. Branches grow from it. Example: pine.</span><b>Bushes</b><span>thin stem, not very tall. Branches grow near the ground. Example: broom.</span><b>Herbs</b><span>thin, soft, green stem. They are short. Example: mint.</span></div>' },
        { h: 'By their leaves', p: 'Trees and bushes can be:',
          extra: '<div class="senses"><b>Evergreen</b><span>they have leaves all year. Example: pine.</span><b>Deciduous</b><span>in autumn their leaves change colour and fall. Example: elm.</span></div>' },
        { h: 'With or without flowers', p: '<mark>Flowering plants</mark> have flowers, like the chestnut tree or lavender. <mark>Non-flowering plants</mark> don’t have flowers, like moss or ferns.' }
      ],
      ch: [
        { q: 'What kind of plant is it, by its stem?', bins: ['Tree', 'Bush', 'Herb'],
          items: ['🌳 Olive tree', 'Chestnut tree', '🌲 Pine', 'Rose bush', 'Rosemary', 'Broom', '🌼 Daisy', 'Poppy', '🌿 Mint'],
          hint: 'Tree: tall, thick trunk. Bush: branches near the ground. Herb: thin, soft, green stem.' },
        { q: 'What is the thick, hard, tall stem of a tree called?', opts: ['Trunk', 'Branch', 'Root'], hint: 'Branches grow from it.' },
        { q: 'Match each kind of leaf with its description.', pairs: [['Evergreen', 'It has leaves all year'], ['Deciduous', 'Its leaves fall in autumn']], hint: 'Deciduous trees drop their leaves in autumn.' },
        { q: 'Is it evergreen or deciduous?', bins: ['Evergreen', 'Deciduous'], items: ['Pine', 'Elm', 'Fir', 'Oak'], hint: 'Oaks and elms lose their leaves in autumn. Pines and firs don’t.' },
        { q: 'Is it a flowering or a non-flowering plant?', bins: ['Flowering', 'Non-flowering'], items: ['Chestnut tree', 'Lavender', 'Moss', 'Fern', '🌹 Rose bush'], hint: 'Moss and ferns don’t have flowers.' },
        { q: 'What do a tree and a bush have in common?', opts: ['They both have a woody stem and branches', 'They both have a soft, green stem', 'They are both the same height'], hint: 'They are different in height and how thick the stem is.' },
        { q: 'Herbs have a thin, soft, green stem.', hint: 'For example, mint.' },
        { q: 'Bushes have a very tall, thick trunk.', hint: 'Their stem is thin and not very tall.' },
        { titulo: 'We classify plants', nodos: [
          { txt: 'By their [[stem]]', hijos: [{ txt: '[[Tree]]: thick, tall trunk' }, { txt: '[[Bush]]: branches near the ground' }, { txt: '[[Herb]]: soft, green stem' }] },
          { txt: 'By their [[leaves]]', hijos: [{ txt: '[[Evergreen]]: leaves all year' }, { txt: '[[Deciduous]]: leaves fall in autumn' }] }], extra: ['moss', 'root'] }
      ] },
    plantas3: { title: 'How do plants reproduce?', short: 'Seeds and spores', badge: 'Magic seed',
      learn: [
        { h: 'Flowering plants', p: 'Most flowering plants reproduce with <mark>seeds</mark>:',
          extra: '<ol class="steps"><li>A seed falls to the ground.</li><li>If the ground is wet, a new plant grows from the seed.</li><li>The plant grows and, in the right season, it has flowers.</li><li>Insects and the wind help the plant to reproduce.</li><li>The flowers turn into fruits, which have the seeds inside.</li></ol>' },
        { h: 'Non-flowering plants', p: 'Non-flowering plants, like <mark>ferns</mark> and <mark>moss</mark>, have no fruits or seeds. They reproduce with <mark>spores</mark>. Spores do the same job as seeds, but they are much smaller.' }
      ],
      ch: [
        { q: 'Put the way a flowering plant reproduces in order.', items: ['A seed falls to the ground', 'If the ground is wet, a new plant grows', 'The plant grows and has flowers', 'Insects and the wind help it reproduce', 'The flowers turn into fruits with seeds'], hint: 'Start with the seed and finish with the fruits.' },
        { q: 'Tap the non-flowering plants.', opts: ['Fern', 'Violet', 'Moss', 'Orchid'], hint: 'Violets and orchids have flowers.' },
        { q: 'How do ferns and moss reproduce?', opts: ['With spores', 'With seeds', 'With fruits'], hint: 'Spores are much smaller than seeds.' },
        { q: 'Is it about flowering or non-flowering plants?', bins: ['Flowering', 'Non-flowering'],
          items: ['The wind is important for reproduction', 'They have spores', 'The fruits have the seeds inside', 'For example, ferns and moss'],
          hint: 'Non-flowering plants have no fruits or seeds.' },
        { q: 'What does a seed need to grow into a new plant?', opts: ['💧 Water', 'Total darkness', 'A lot of cold'], hint: 'If the ground is wet, it grows.' },
        { q: 'Who helps flowering plants to reproduce?', opts: ['🐝 Insects and the wind', 'Stones', 'Fish'], hint: 'They carry pollen from one flower to another.' },
        { q: 'Fruits have the plant’s seeds inside.', hint: 'Think of an apple.' },
        { tipo: 'flujo', titulo: 'How [[flowering]] plants reproduce', nodos: [
          { txt: 'A [[seed]] falls to the ground' }, { txt: 'With water, a new plant [[grows]]' }, { txt: 'The plant grows and has [[flowers]]' },
          { txt: 'Insects and the [[wind]] help' }, { txt: 'The flowers turn into [[fruits]]' }], extra: ['spores', 'roots'] }
      ] },
    plantas4: { title: 'Why are plants important?', short: 'Wild and farmed plants', badge: 'Expert farmer',
      learn: [
        { h: 'Wild plants', p: 'Many plants grow where they find what they need, and make forests, grasslands or jungles. These are <mark>wild plants</mark>. They give <mark>food and shelter</mark> to many wild animals.' },
        { h: 'The air', p: 'All plants help to <mark>make the air cleaner</mark>. During photosynthesis they make <mark>oxygen</mark>, which most living things need.' },
        { h: 'Farmed plants', p: 'Plants that we sow and look after to get <mark>materials and food</mark> are <mark>farmed plants</mark>. Farmers prepare the soil, sow the seeds, water the plants and pick the harvest.' }
      ],
      ch: [
        { q: 'What do we call plants that are born and grow without help from people?', opts: ['Wild', 'Farmed', 'Artificial'], hint: 'They make forests, grasslands and jungles.' },
        { q: 'Is it true or false?', bins: ['True', 'False'],
          items: ['Wild plants are born and grow without help from people', 'During photosynthesis plants make oxygen', 'Wild meat-eating animals eat wild plants', 'Plants can be a shelter for some animals'],
          hint: 'Meat-eating animals eat other animals, not plants.' },
        { q: 'Where are there wild plants and where are there farmed plants?', bins: ['Wild', 'Farmed'], items: ['Olive grove', 'Grassland', 'Vegetable garden', '🌳 Forest'], hint: 'People sow and look after olive groves and vegetable gardens.' },
        { q: 'Sort these products from plants.', bins: ['Food', 'Materials'], items: ['Straw', 'Cork', 'Wood', 'Cotton', '🌾 Cereals', '🍎 Fruit and vegetables'], hint: 'We eat food. We use materials to make things.' },
        { q: 'Put the farmers’ work in order.', items: ['They prepare the soil and sow the seeds', 'They water and look after the plants so they grow healthy', 'They pick the harvest when it is time'], hint: 'First they sow and last they pick.' },
        { q: 'Which gas do plants make that we need to live?', opts: ['Oxygen', 'Smoke', 'Steam'], hint: 'They make it during photosynthesis.' },
        { q: 'Plants help to make the air cleaner.', hint: 'That is why they are important in cities.' },
        { titulo: 'Plants are important', nodos: [
          { txt: '[[Wild]] plants', hijos: [{ txt: 'They grow without help from people' }, { txt: 'They give food and [[shelter]] to animals' }] },
          { txt: '[[Farmed]] plants', hijos: [{ txt: '[[Farmers]] look after them' }, { txt: 'They give us [[food]] and materials' }] },
          { txt: 'All plants make [[oxygen]]' }], extra: ['smoke', 'plastic'] }
      ] },
    'reto-plantas': { title: 'The Big Plant Challenge', short: 'Review of the whole topic', badge: 'Green thumb', villain: 'Hungry Caterpillar',
      extra: [
        { q: 'Match each word with its meaning.', pairs: [['Photosynthesis', 'Plants make their food'], ['Spores', 'Ferns and moss reproduce with them'], ['Deciduous', 'Loses its leaves in autumn']], hint: 'Look at the key words of the topic.' }
      ] },
    /* ---------- TOPIC 5 · We like science ---------- */
    ciencia1: { title: 'What is the scientific method?', short: 'Observe, ask, experiment and conclude', badge: 'Little scientist',
      learn: [
        { h: 'Asking questions', p: 'People have always asked questions to understand the world. To answer them, scientists use the <mark>scientific method</mark>.' },
        { h: 'Steps of the scientific method', p: 'This is how a scientist investigates:',
          extra: '<ol class="steps"><li>We <mark>observe</mark> the world around us. “Wow! The sun is so hot!”</li><li>We ask a <mark>question</mark>. “Can the sun burn things?”</li><li>We do <mark>experiments</mark>. “Oh! The paper is burning!”</li><li>We reach <mark>conclusions</mark>. “Yes, the sun can burn.”</li></ol>' }
      ],
      ch: [
        { q: 'Put the steps of the scientific method in order.', items: ['We observe something', 'We ask questions', 'We do an experiment', 'We reach a conclusion'], hint: 'First we observe and last we reach a conclusion.' },
        { q: 'Match each step with what the boy says.', pairs: [['Observe', 'Wow! The sun is so hot!'], ['Ask', 'Can the sun burn things?'], ['Experiment', 'Oh! The paper is burning!'], ['Conclude', 'Yes, the sun can burn.']], hint: 'Look at the example with the magnifying glass and the paper.' },
        { q: 'You see a plant with dry leaves. What is a good question?', opts: ['Does the plant need water to live?', 'What colour is the flowerpot?', 'How much does the plant cost?'], hint: 'The question should help to explain what you see.' },
        { q: 'You put an ice cube in the sun. What happens after an hour?', opts: ['It melts and turns into water', 'It gets bigger', 'Nothing happens'], hint: 'The heat of the sun melts the ice.' },
        { q: 'What is your conclusion from the ice cube experiment?', opts: ['Heat melts ice', 'Ice never melts', 'The sun makes things cold'], hint: 'Think about what you saw.' },
        { q: 'To find out how liquid water turns into steam, what experiment would you do?', opts: ['Heat water in a pan and watch', 'Put water in the freezer', 'Mix water with sand'], hint: 'Steam appears when water gets very hot.' },
        { q: 'Scientists do experiments to answer their questions.', hint: 'It is the third step of the scientific method.' },
        { tipo: 'flujo', titulo: 'The [[scientific]] method', nodos: [
          { txt: 'We [[observe]] the world around us' }, { txt: 'We ask a [[question]]' }, { txt: 'We do [[experiments]]' }, { txt: 'We reach [[conclusions]]' }], extra: ['guess', 'forget'] }
      ] },
    ciencia2: { title: 'What are the states of matter?', short: 'Solid, liquid and gas', badge: 'Ice master',
      learn: [
        { h: 'Matter', p: 'Most things around us are made of <mark>matter</mark>: mountains, clouds, water, air, our body… Matter can be in three <mark>states</mark>:',
          extra: '<div class="senses"><b>Solid</b><span>soil.</span><b>Liquid</b><span>water in its natural state.</span><b>Gas</b><span>air.</span></div>' },
        { h: 'Changes of state', p: 'Matter can <mark>change state</mark> when it <mark>heats up</mark> or <mark>cools down</mark>.',
          extra: '<div class="senses"><b>Metal</b><span>if we heat it a lot, it melts and becomes liquid.</span><b>Lava</b><span>it is liquid, but when it cools down it becomes solid rock.</span><b>Sea water</b><span>when it heats up it turns into water vapour and the salt is left.</span></div>' }
      ],
      ch: [
        { q: 'What state is it in?', bins: ['Solid', 'Liquid', 'Gas'],
          items: ['Smoke', '🌧️ Rain', '❄️ Snow', '🍫 Chocolate', 'Oil', '💨 Air', 'Soil', '💧 Water'],
          hint: 'You can’t pick up a gas with your hand. Liquids spill.' },
        { q: 'Matter can be in…', opts: ['three states', 'two states', 'five states'], hint: 'Solid, liquid and gas.' },
        { q: 'Match each change with an example.', pairs: [['From liquid to solid', 'Water in the freezer'], ['From solid to liquid', 'Butter in a frying pan'], ['From liquid to gas', 'Water boiling in a pan']], hint: 'Think: does it get hot or cold?' },
        { q: 'Does it need heat or cold?', bins: ['Heat', 'Cold'],
          items: ['Butter becoming liquid', 'Water becoming solid', 'Water evaporating', 'Lava becoming rock'],
          hint: 'Heat melts and evaporates. Cold makes things solid.' },
        { q: 'Lava from volcanoes is liquid. When it cools down…', opts: ['it becomes solid rock', 'it becomes air', 'it stays liquid'], hint: 'Cold makes it solid.' },
        { q: 'When sea water heats up and evaporates, what is left on the ground?', opts: ['Salt', 'Sand', 'Fish'], hint: 'This is how we get salt in salt pans.' },
        { q: 'Air is matter in a gas state.', hint: 'This is what the lesson explains.' },
        { titulo: 'The states of [[matter]]', nodos: [
          { txt: '[[Solid]]', hijos: [{ txt: 'Soil, ice' }] },
          { txt: '[[Liquid]]', hijos: [{ txt: 'Water, oil' }] },
          { txt: '[[Gas]]', hijos: [{ txt: 'Air, smoke' }] },
          { txt: 'When they [[heat]] up or cool down, they change state' }], extra: ['soft', 'metal'] }
      ] },
    ciencia3: { title: 'What are mixtures?', short: 'Substances, mixtures and solutions', badge: 'Mad mixer',
      learn: [
        { h: 'Substances and mixtures', p: 'Air, water and wood are <mark>substances</mark>. A salad or milky coffee are <mark>mixtures</mark> of substances.' },
        { h: 'Kinds of mixtures', p: 'In some mixtures we can’t see the different substances: they are <mark>solutions</mark>. If we mix salt and water, the salt dissolves and we can’t see it. In other mixtures we can see the substances: oil floats on water.' },
        { h: 'Separating mixtures', p: 'We can separate mixtures in different ways:',
          extra: '<div class="senses"><b>Sieve</b><span>separates sand from water.</span><b>Evaporating</b><span>to separate salt from water, we let the water evaporate.</span><b>Special funnel</b><span>separates water and oil.</span></div>' }
      ],
      ch: [
        { q: 'Is it a substance or a mixture?', bins: ['Substance', 'Mixture'],
          items: ['Gold', '💧 Water', 'Salt', '🥗 Salad', '☕ Milky coffee', '🥣 Milk with cereal'],
          hint: 'A mixture has different substances together.' },
        { q: 'Is it a solution?', bins: ['A solution', 'Not a solution'], items: ['Water with sugar', 'Water with salt', 'Milk with cereal', 'Water with oil'], hint: 'In a solution you can’t see one of the substances.' },
        { q: 'How would you separate each mixture?', pairs: [['Sand and water', 'With a sieve'], ['Salt and water', 'Letting the water evaporate'], ['Water and oil', 'With a special funnel'], ['Pasta and water', 'With a colander']], hint: 'Look at the separating mixtures card.' },
        { q: 'If we mix oil and water, the oil…', opts: ['floats on the water', 'disappears', 'becomes solid'], hint: 'You can see them separately.' },
        { q: 'To separate sugar from water…', opts: ['we let the water evaporate', 'we use a sieve', 'we shake it a lot'], hint: 'Dissolved sugar does not stay in the sieve.' },
        { q: 'Which substances are mixed in a salad?', bins: ['Solids', 'Liquids'], items: ['🥬 Lettuce', '🍅 Tomato', 'Oil', 'Vinegar', '🧅 Onion'], hint: 'Liquids spill.' },
        { q: 'In a solution, you can’t see the different substances.', hint: 'Like salt in water.' },
        { titulo: '[[Mixtures]]', nodos: [
          { txt: '[[Solutions]]: you can’t see the parts', hijos: [{ txt: 'Water with [[salt]]' }] },
          { txt: 'You can see the parts', hijos: [{ txt: 'Water with [[oil]]' }] },
          { txt: 'How to separate them', hijos: [{ txt: '[[Sieve]]: sand and water' }, { txt: 'Let the water [[evaporate]]: salt and water' }] }], extra: ['magnet', 'scissors'] }
      ] },
    ciencia4: { title: 'What are materials like?', short: 'Origin and properties', badge: 'Builder',
      learn: [
        { h: 'Natural and artificial', p: '<mark>Materials</mark> are the substances we use to make things.',
          extra: '<div class="senses"><b>Natural</b><span>we use them as they are in nature: silk (from silkworms), wood (from trees).</span><b>Artificial</b><span>people make them by changing natural substances: plastic.</span></div>' },
        { h: 'Properties', p: 'Each material has <mark>properties</mark> that make it good for a job:',
          extra: '<div class="senses"><b>Strong</b><span>they hold heavy things without breaking.</span><b>Fragile</b><span>they break when they are hit.</span><b>Rigid</b><span>they don’t bend or twist.</span><b>Flexible</b><span>they bend without breaking.</span><b>Hard</b><span>they are difficult to scratch or cut.</span><b>Soft</b><span>they scratch or change shape easily.</span></div>' }
      ],
      ch: [
        { q: 'Is it a natural or an artificial material?', bins: ['Natural', 'Artificial'],
          items: ['Leather', 'Straw', 'Cotton', 'Wood', 'Silk', 'Glass', 'Plasticine', 'Plastic'],
          hint: 'People make artificial materials by changing natural substances.' },
        { q: 'Match each property with its meaning.', pairs: [['Strong', 'Holds heavy things without breaking'], ['Fragile', 'Breaks when it is hit'], ['Flexible', 'Bends without breaking'], ['Soft', 'Scratches or changes shape easily']], hint: 'Look at the properties card.' },
        { q: 'Where does silk come from?', opts: ['From silkworm cocoons', 'From tree trunks', 'From oil'], hint: 'It is a natural material from an animal.' },
        { q: 'Where does wood come from?', opts: ['From the trunk and branches of trees', 'From sheep', 'From stones'], hint: 'It is a natural material from a plant.' },
        { q: 'A china vase breaks when it falls. It is a … material.', opts: ['fragile', 'flexible', 'strong'], hint: 'Fragile materials break when they are hit.' },
        { q: 'Which material is better to make a boat: wood or cardboard?', opts: ['Wood, because it is strong and floats without getting ruined', 'Cardboard, because it gets wet quickly'], hint: 'Water ruins cardboard.' },
        { q: 'Wool is a natural material.', hint: 'It comes from sheep.' },
        { titulo: '[[Materials]]', nodos: [
          { txt: '[[Natural]]', hijos: [{ txt: 'Wood, wool, [[silk]]' }] },
          { txt: '[[Artificial]]', hijos: [{ txt: '[[Plastic]]' }] },
          { txt: 'Properties', hijos: [{ txt: '[[Fragile]]: breaks when it is hit' }, { txt: '[[Flexible]]: bends without breaking' }, { txt: '[[Strong]]: holds heavy things' }] }], extra: ['transparent', 'liquid'] }
      ] },
    ciencia5: { title: 'Light and sound', short: 'How we see and how we hear', badge: 'Eyes and ears',
      learn: [
        { h: 'Light', p: '<mark>Light</mark> lets us see things. Without light, it is dark. <mark>Natural light</mark> comes from the Sun, the stars or lightning. People make things that give <mark>artificial light</mark>, like light bulbs.' },
        { h: 'Materials and light', p: 'Light goes through some materials, but not all:',
          extra: '<div class="senses"><b>Transparent</b><span>light goes through easily and we can see what is behind (glass).</span><b>Translucent</b><span>they let a little light through and we can’t see clearly (coloured bottle).</span><b>Opaque</b><span>light can’t go through and we can’t see what is behind (cardboard).</span></div>' },
        { h: 'Sound', p: 'When we talk, we make invisible waves that travel through the air: this is <mark>sound</mark>. There are <mark>natural</mark> sounds (birds singing) and <mark>artificial</mark> sounds (a guitar). Sounds can be <mark>loud</mark> or <mark>quiet</mark>, <mark>low</mark> like a cow mooing or <mark>high</mark> like a whistle.' }
      ],
      ch: [
        { q: 'Is it natural light or artificial light?', bins: ['Natural', 'Artificial'],
          items: ['☀️ Sun', '⭐ Stars', '⚡ Lightning', '💡 Light bulb', '🕯️ Candle', '🔦 Torch', 'Firefly'],
          hint: 'Artificial light comes from things that people make.' },
        { q: 'What are these materials like?', pairs: [['Transparent', 'Glass jar'], ['Translucent', 'Coloured cubes'], ['Opaque', 'Cardboard box']], hint: 'Can you see what is behind it?' },
        { q: 'Materials that don’t let light through are called…', opts: ['opaque', 'transparent', 'translucent'], hint: 'We can’t see what is behind them.' },
        { q: 'Is it a low or a high sound?', bins: ['Low', 'High'], items: ['🥁 Drum', 'Whistle', '🦁 Lion roaring', '🔔 Little bell', '🐄 Cow mooing'], hint: 'Low sounds are deep and high sounds are thin.' },
        { q: 'Is it a natural or an artificial sound?', bins: ['Natural', 'Artificial'],
          items: ['🐦 A bird singing', '🚗 A car horn', '🐕 A dog barking', '🎸 A guitar', '🗣️ A person’s voice', '🚑 An ambulance siren'],
          hint: 'Machines or instruments make artificial sounds.' },
        { q: 'Sound travels as…', opts: ['invisible waves in the air', 'rays of light', 'drops of water'], hint: 'Like the waves when you throw a stone into water.' },
        { q: 'Without light we can’t see anything.', hint: 'It is dark.' },
        { titulo: 'Light and sound', nodos: [
          { txt: '[[Light]]', hijos: [{ txt: 'Natural: the [[Sun]]' }, { txt: 'Artificial: a light [[bulb]]' }, { txt: '[[Opaque]]: lets no light through' }] },
          { txt: '[[Sound]]', hijos: [{ txt: 'It travels in [[waves]] through the air' }, { txt: 'It can be low or [[high]]' }] }], extra: ['transparent', 'water'] }
      ] },
    'reto-ciencia': { title: 'The Big Science Challenge', short: 'Review of the whole topic', badge: 'Science genius', villain: 'Doctor Bubbles',
      extra: [
        { q: 'Match each word with an example.', pairs: [['Solution', 'Water with salt'], ['Artificial material', 'Plastic'], ['Opaque material', 'Cardboard'], ['High sound', 'Whistle']], hint: 'Review the whole topic.' }
      ] },
    /* ---------- TOPIC 6 · We are connected ---------- */
    digital1: { title: 'What are digital devices?', short: 'Mobile phone, tablet and laptop', badge: 'Tech expert',
      learn: [
        { h: 'What they are for', p: '<mark>Digital devices</mark> are machines that help us do many things:',
          extra: '<div class="senses"><b>Learning</b><span>writing texts, looking for information or videos for schoolwork.</span><b>Having fun</b><span>reading, listening to music, watching videos, taking photos, playing…</span><b>Communicating</b><span>sending or getting texts, pictures or videos and making video calls.</span></div>' },
        { h: 'Some devices', p: 'These are some devices:',
          extra: '<div class="senses"><b>Mobile phone</b><span>small, with a touch screen. For calls, video calls and going on the internet.</span><b>Tablet</b><span>bigger than a mobile phone and smaller than a laptop. It has a touch screen too.</span><b>Laptop</b><span>bigger. With it we do harder tasks in less time.</span></div>' }
      ],
      ch: [
        { q: 'What can we do with a mobile phone? Tap all the correct ones.', opts: ['Play games', 'Take photos', 'Listen to music', 'Go on the internet', 'Cook food'], hint: 'A mobile phone can’t cook.' },
        { q: 'A touch screen is a screen that…', opts: ['works when we touch it with our fingers', 'can’t be touched', 'only works with a keyboard'], hint: 'Like the screen of a mobile phone or a tablet.' },
        { q: 'Match each device with its description.', pairs: [['Mobile phone', 'Small, with a touch screen'], ['Tablet', 'Touch screen, bigger than a phone'], ['Laptop', 'For harder tasks'], ['Digital camera', 'For taking photos']], hint: 'Look at the devices card.' },
        { q: 'What do we use the device for?', bins: ['Learning', 'Having fun', 'Communicating'],
          items: ['Looking for information for school', 'Writing a text', 'Playing games', 'Listening to music', 'Making a video call', 'Sending a message'],
          hint: 'Look at the first card of the lesson.' },
        { q: 'How are a laptop and a tablet the same?', opts: ['You can go on the internet with both', 'They are both the same size', 'They are both phones'], hint: 'They are different in size and keyboard.' },
        { q: 'Which device is the biggest?', opts: ['The laptop', 'The mobile phone', 'The tablet'], hint: 'The mobile phone is the smallest.' },
        { q: 'Digital devices also help us to learn.', hint: 'For example, to do schoolwork.' },
        { titulo: '[[Digital]] devices', nodos: [
          { txt: 'They are for', hijos: [{ txt: '[[Learning]]' }, { txt: 'Having fun' }, { txt: '[[Communicating]]' }] },
          { txt: 'Some devices', hijos: [{ txt: 'Mobile [[phone]]: small, touch screen' }, { txt: '[[Tablet]]: bigger, touch screen' }, { txt: '[[Laptop]]: for harder tasks' }] }], extra: ['fridge', 'washing machine'] }
      ] },
    digital2: { title: 'Where do we look for information?', short: 'The internet and browsers', badge: 'Web detective',
      learn: [
        { h: 'The internet and browsers', p: 'On the <mark>internet</mark> we can find a lot of information. To find it we use programs called <mark>browsers</mark>, like Google Chrome or Microsoft Edge.' },
        { h: 'How do we look for information?', p: 'Follow these steps:',
          extra: '<ol class="steps"><li>Open a browser.</li><li>Write what you want to know in the box that says “Search”.</li><li>Look at the list of results: they are <mark>web pages</mark>.</li><li>Click on one and read until you find the information.</li></ol>' },
        { h: 'Be careful!', p: 'Anybody can publish false news. We must not believe everything we read on the internet: we should <mark>check different pages</mark> and always have an <mark>adult with us</mark>.' }
      ],
      ch: [
        { q: 'Put the steps to look for information in order.', items: ['Open a browser', 'Write what you want to know in “Search”', 'Look at the list of web pages', 'Click on one and read the information'], hint: 'First you open the browser.' },
        { q: 'What would you use the internet for? Tap the correct ones.', opts: ['To look for information', 'To make video calls', 'To listen to music', 'To read a book', 'To play games online', 'To write a text'], hint: 'The internet is for all of these!' },
        { q: 'What are the programs we use to go on the internet called?', opts: ['Browsers', 'Word processors', 'Calculators'], hint: 'For example, Google Chrome or Microsoft Edge.' },
        { q: 'How can you know if information on the internet is true?', opts: ['Look at which page you read it on', 'Ask an adult', 'Check the same thing on other web pages', 'Believe everything I read'], hint: 'You must not believe everything.' },
        { q: 'Everything we read on the internet is true.', hint: 'Anybody can publish false information.' },
        { q: 'To look for information about animals, which page would you choose?', opts: ['A page about nature and animals', 'A page with recipes for children', 'A page about films'], hint: 'Choose a page about the topic you are looking for.' },
        { tipo: 'flujo', titulo: 'How to look for [[information]]', nodos: [
          { txt: 'Open a [[browser]]' }, { txt: 'Write what you want to know in “[[Search]]”' }, { txt: 'Look at the list of [[web pages]]' },
          { txt: 'Read and compare different pages' }, { txt: 'Ask an [[adult]]' }], extra: ['stranger', 'advert'] }
      ] },
    digital3: { title: 'How do we present information?', short: 'Programs and storage', badge: 'Star presenter',
      learn: [
        { h: 'Computer programs', p: 'To organise information and present our work we use <mark>computer programs</mark>:',
          extra: '<div class="senses"><b>Word processor</b><span>to write and correct texts. We can change the size, colour and type of letters.</span><b>Presentation maker</b><span>for projects and talks. We can add text, drawings, photos and tables.</span></div>' },
        { h: 'Saving information', p: 'We use <mark>storage devices</mark>:',
          extra: '<div class="senses"><b>Hard disk</b><span>saves thousands and thousands of documents, pictures or videos.</span><b>Memory stick</b><span>easy to carry, but it saves less than a hard disk.</span><b>Memory card</b><span>very small. We use it in digital cameras and mobile phones.</span></div>' }
      ],
      ch: [
        { q: 'Which program would be more useful?', bins: ['Word processor', 'Presentation maker'],
          items: ['To present a project', 'To write a recipe', 'To make slides', 'To write a news story', 'To write a book', 'To make a concept map with photos'],
          hint: 'A presentation maker is for talks. A word processor is for writing.' },
        { q: 'Match each storage device with its description.', pairs: [['Hard disk', 'Saves thousands and thousands of documents'], ['Memory stick', 'Easy to carry'], ['Memory card', 'Very small, for cameras and phones']], hint: 'Look at the saving information card.' },
        { q: 'Which device is small and easy to carry?', opts: ['The memory stick', 'The hard disk'], hint: 'It fits in your pocket.' },
        { q: 'Where can you save more files?', opts: ['On the hard disk', 'On the memory card'], hint: 'It saves thousands and thousands of documents.' },
        { q: 'Which devices use memory cards?', opts: ['📷 Digital cameras', '📱 Mobile phones', '🧊 Fridges', '🚲 Bikes'], hint: 'Devices that save photos.' },
        { q: 'It is important to save our work when we finish.', hint: 'Then we don’t lose it.' },
        { titulo: 'We present and save information', nodos: [
          { txt: 'Programs', hijos: [{ txt: 'Word [[processor]]: for writing' }, { txt: '[[Presentation]] maker: for talks' }] },
          { txt: '[[Storage]] devices', hijos: [{ txt: '[[Hard]] disk: saves a lot' }, { txt: 'Memory [[stick]]: easy to carry' }, { txt: 'Memory [[card]]: cameras and phones' }] }], extra: ['light bulb', 'socket'] }
      ] },
    digital4: { title: 'Do we use digital devices well?', short: 'Dangers and good use', badge: 'Cyber guardian',
      learn: [
        { h: 'Dangers', p: 'The internet and digital devices are not always safe:',
          extra: '<ol class="steps"><li>Don’t click on adverts or pages you don’t know: this way you avoid <mark>computer viruses</mark>.</li><li>A lot of content is not right for children: always go on the internet with an <mark>adult watching</mark>.</li></ol>' },
        { h: 'Good use', p: 'It is important to control the <mark>time</mark> we spend on these devices, and agree <mark>rules</mark> with adults. Sit with a <mark>good posture</mark>: a straight back and the screen not too close, so your eyes don’t get tired.' }
      ],
      ch: [
        { q: 'Tap what you should do to use the internet well.', opts: ['Go on the internet with an adult', 'Don’t click on adverts you don’t know', 'Agree on a time limit', 'Sit with a straight back', 'Talk to strangers', 'Spend hours without a break'], hint: 'Never talk to strangers.' },
        { q: 'Match each problem with its solution.', pairs: [['Virus', 'Don’t click on pages you don’t know'], ['Too much use', 'Agree time rules'], ['Bad posture', 'Straight back and the screen at a good distance']], hint: 'Look at the good use card.' },
        { q: 'Hugo is using his mum’s tablet without asking. What would you tell him?', opts: ['To ask for permission first', 'To carry on, it doesn’t matter', 'To hide it'], hint: 'We must ask adults for permission.' },
        { q: 'Lidia’s mum got a message from a stranger on her phone. What would you tell her?', opts: ['Not to open it or answer it', 'To answer it straight away', 'To click on the link'], hint: 'Messages from strangers can be dangerous.' },
        { q: 'Isa saw something on the internet that scared her. What should she do?', opts: ['Tell an adult', 'Say nothing', 'Keep watching'], hint: 'Adults help us.' },
        { q: 'Computer viruses can break the computer.', hint: 'They are harmful programs.' },
        { q: 'It is good to put the screen very close to your eyes.', hint: 'The screen should be at a good distance so your eyes don’t get tired.' },
        { titulo: 'We use devices well', nodos: [
          { txt: '[[Dangers]]', hijos: [{ txt: 'Computer [[viruses]]' }, { txt: 'Content not for children: go online with an [[adult]]' }] },
          { txt: 'Good [[use]]', hijos: [{ txt: 'Control your screen [[time]]' }, { txt: 'Good [[posture]] and the screen far away' }] }], extra: ['speed', 'music'] }
      ] },
    'reto-digital': { title: 'The Big Digital Challenge', short: 'Review of the whole topic', badge: 'Digital hero', villain: 'Pixel Virus',
      extra: [
        { q: 'Is it good use or bad use?', bins: ['Good use', 'Bad use'], items: ['Going online with an adult', 'Clicking on adverts you don’t know', 'Checking information on different pages', 'Using the tablet all night', 'Saving your work when you finish'],
          hint: 'Look at the dangers and good use.' }
      ] }
  }
};
