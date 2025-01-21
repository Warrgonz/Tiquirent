from flask import Blueprint, jsonify, render_template
import pdb
import sentry_sdk


inicio_bp = Blueprint('inicio', __name__)

@inicio_bp.route('/')
def inicio():
    return render_template('index.html')


#event_id = sentry_sdk.capture_exception(e)

@inicio_bp.route('/sentry-test')
def test_sentry():

    lista = []
    item = lista[5]  # IndexError
    
    return render_template('index.html', item=item)



