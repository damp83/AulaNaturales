"""Genera los archivos de la versión Google Classroom a partir de index.html, contenidos.js
y contenidos-en.js.

Uso:  python3 tools/build_classroom.py
Crea google-classroom/index.html, google-classroom/contenidos.html y
google-classroom/contenidos_en.html, listos para pegar en el proyecto de Apps Script junto
con Codigo.gs.
"""
from pathlib import Path

raiz = Path(__file__).resolve().parent.parent
html = (raiz / 'index.html').read_text(encoding='utf-8')
etiqueta = '<script src="contenidos.js"></script>'
assert etiqueta in html, 'No se encuentra la etiqueta de contenidos en index.html'
salida = raiz / 'google-classroom'
salida.mkdir(exist_ok=True)
etiqueta_en = '<script src="contenidos-en.js"></script>'
assert etiqueta_en in html, 'No se encuentra la etiqueta de contenidos en inglés en index.html'
html = html.replace(etiqueta, "<?!= include('contenidos'); ?>").replace(etiqueta_en, "<?!= include('contenidos_en'); ?>")
(salida / 'index.html').write_text(html, encoding='utf-8')
for origen, destino in (('contenidos.js', 'contenidos.html'), ('contenidos-en.js', 'contenidos_en.html')):
    texto = (raiz / origen).read_text(encoding='utf-8')
    (salida / destino).write_text('<script>\n' + texto + '\n</script>\n', encoding='utf-8')
print('Generados google-classroom/index.html, contenidos.html y contenidos_en.html')
