from flask import Blueprint, jsonify
import pdb
#import sentry_sdk


inicio_bp = Blueprint('inicio', __name__)

@inicio_bp.route('/')
def inicio():
    1/0
    saludo = "Hola mundo"

    return jsonify(saludo=saludo)

"""
@inicio_bp.route('/sentry-test')
def test_sentry():

    lista = []
    item = lista[5]  # IndexError
    
    return render_template('index.html', item=item)
"
"""



