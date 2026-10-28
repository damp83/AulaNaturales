"""Genera los archivos de la versión Google Classroom a partir de index.html y contenidos.js.

Uso:  python3 tools/build_classroom.py
Crea google-classroom/index.html y google-classroom/contenidos.html, listos para pegar
en el proyecto de Apps Script junto con Codigo.gs.
"""
from pathlib import Path

raiz = Path(__file__).resolve().parent.parent
html = (raiz / 'index.html').read_text(encoding='utf-8')
etiqueta = '<script src="contenidos.js"></script>'
assert etiqueta in html, 'No se encuentra la etiqueta de contenidos en index.html'
salida = raiz / 'google-classroom'
salida.mkdir(exist_ok=True)
(salida / 'index.html').write_text(html.replace(etiqueta, "<?!= include('contenidos'); ?>"), encoding='utf-8')
contenidos = (raiz / 'contenidos.js').read_text(encoding='utf-8')
(salida / 'contenidos.html').write_text('<script>\n' + contenidos + '\n</script>\n', encoding='utf-8')
print('Generados google-classroom/index.html y google-classroom/contenidos.html')
