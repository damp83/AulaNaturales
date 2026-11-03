"""Crea la estructura de un curso nuevo en la plataforma.

Uso:  python3 tools/nuevo_curso.py <id> "<nombre>" ["<nombre en inglés>"] [--temas N]

Ejemplo:  python3 tools/nuevo_curso.py 3-primaria "3.º de Primaria" "Primary 3" --temas 6

Crea cursos/<id>/contenidos.js con N temas vacíos («Próximamente») y añade el curso a cursos.js.
Después hay que rellenar los temas (misiones, retos, esquemas y currículo). El curso empieza solo
en castellano: para añadir el inglés, crea cursos/<id>/contenidos-en.js y pon ingles: true en cursos.js.
"""
import re
import sys
from pathlib import Path

raiz = Path(__file__).resolve().parent.parent
args = [a for a in sys.argv[1:] if not a.startswith('--')]
temas = 6
if '--temas' in sys.argv:
    temas = int(sys.argv[sys.argv.index('--temas') + 1])
    args = [a for a in args if a != str(temas)]
if len(args) < 2:
    sys.exit(__doc__)
cid, nombre = args[0], args[1]
nombre_en = args[2] if len(args) > 2 else nombre
if not re.fullmatch(r'[a-z0-9-]+', cid):
    sys.exit('El id del curso solo puede tener minúsculas, números y guiones (por ejemplo, 3-primaria).')

carpeta = raiz / 'cursos' / cid
if carpeta.exists():
    sys.exit(f'Ya existe la carpeta cursos/{cid}.')
registro = (raiz / 'cursos.js').read_text(encoding='utf-8')
if f"id: '{cid}'" in registro:
    sys.exit(f'El curso {cid} ya está en cursos.js.')

# Cabecera con las instrucciones, tomada del curso de ejemplo
modelo = (raiz / 'cursos' / '2-primaria' / 'contenidos.js').read_text(encoding='utf-8')
cabecera = modelo[:modelo.index('/* ---------- CURRÍCULO')]
colores = ['--lung', '--ok', '--food', '--virus', '--sense', '--bone']
iconos = ['person', 'heartplus', 'paw', 'leaf', 'flask', 'wifi']
lista = ',\n'.join(
    f"    {{ id:'tema{i}', n:{i}, title:'Tema {i}', short:'Próximamente', color:'{colores[(i - 1) % 6]}', icon:'{iconos[(i - 1) % 6]}', missions:[] }}"
    for i in range(1, temas + 1)
)
contenido = cabecera + f"""/* ---------- CURRÍCULO: criterios de evaluación y saberes básicos ----------
   Se rellenan aquí y se asocian a temas, misiones y retos (mira cursos/2-primaria/contenidos.js
   como ejemplo, apartados CURRICULO y EVALUACION). */
const CURRICULO = {{
  criterios: [
    /* {{ id:'1.1', texto:'…' }}, */
  ],
  saberes: [
    /* {{ id:'A.1.1', bloque:'…', texto:'…' }}, */
  ]
}};

/* ---------- TEMAS ----------
   Para cada tema: define sus misiones y su jefe final (como TEMA1_MISIONES y TEMA1_JEFE en
   cursos/2-primaria/contenidos.js) y ponlos en missions / boss. */

const CURSO = {{
  asignatura: 'Ciencias de la Naturaleza · {nombre}',
  situaciones: [
    /* {{ title:'Título propio de la situación', temas:['tema1','tema2'] }}, */
  ],
  temas: [
{lista}
  ]
}};
"""
carpeta.mkdir(parents=True)
(carpeta / 'contenidos.js').write_text(contenido, encoding='utf-8')

entrada = f"""  {{
    id: '{cid}',
    nombre: '{nombre}',
    nombre_en: '{nombre_en}',
    ingles: false
  }}"""
registro = re.sub(r"\n\];\s*$", ",\n" + entrada + "\n];\n", registro.rstrip() + "\n")
(raiz / 'cursos.js').write_text(registro, encoding='utf-8')
print(f'Curso creado: cursos/{cid}/contenidos.js ({temas} temas vacíos) y añadido a cursos.js.')
print(f'Enlace: https://damp83.github.io/AulaNaturales/?curso={cid}')
