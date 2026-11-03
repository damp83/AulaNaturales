"""Genera la versión Google Classroom de cada curso.

Uso:  python3 tools/build_classroom.py            (todos los cursos de cursos.js)
      python3 tools/build_classroom.py 2-primaria (solo ese curso)

Crea google-classroom/<curso>/index.html, contenidos.html y (si el curso tiene inglés)
contenidos_en.html, listos para pegar en un proyecto de Apps Script junto con
google-classroom/Codigo.gs. Cada curso se instala como un proyecto distinto.
"""
import json
import re
import sys
from pathlib import Path

raiz = Path(__file__).resolve().parent.parent
html = (raiz / 'index.html').read_text(encoding='utf-8')
inicio, fin = '<!-- CARGADOR', '<!-- /CARGADOR -->'
assert inicio in html and fin in html, 'No se encuentra el cargador de cursos en index.html'
antes, resto = html.split(inicio, 1)
_, despues = resto.split(fin, 1)

registro = (raiz / 'cursos.js').read_text(encoding='utf-8')
cuerpo = registro[registro.index('const CURSOS = ['):]
ids = re.findall(r"id:\s*'([\w-]+)'", cuerpo)
pedidos = sys.argv[1:] or ids

for cid in pedidos:
    assert cid in ids, f'El curso {cid} no está en cursos.js'
    carpeta = raiz / 'cursos' / cid
    ingles = (carpeta / 'contenidos-en.js').exists()
    # En Apps Script no se pueden cargar archivos por ruta: se incluye el curso fijo
    cargador = (
        '<script>window.CURSO_ACTIVO = CURSOS.find(c => c.id === ' + json.dumps(cid) + ');</script>\n'
        "<?!= include('contenidos'); ?>\n" + ("<?!= include('contenidos_en'); ?>\n" if ingles else '')
    )
    salida = raiz / 'google-classroom' / cid
    salida.mkdir(parents=True, exist_ok=True)
    pagina = antes.replace('<script src="cursos.js"></script>', '<script>\n' + registro + '\n</script>') + cargador + despues
    (salida / 'index.html').write_text(pagina, encoding='utf-8')
    archivos = [('contenidos.js', 'contenidos.html')] + ([('contenidos-en.js', 'contenidos_en.html')] if ingles else [])
    for origen, destino in archivos:
        texto = (carpeta / origen).read_text(encoding='utf-8')
        (salida / destino).write_text('<script>\n' + texto + '\n</script>\n', encoding='utf-8')
    print(f'Generada la versión de Classroom de {cid} en google-classroom/{cid}/')
