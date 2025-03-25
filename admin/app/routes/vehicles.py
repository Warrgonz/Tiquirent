from flask import Blueprint, render_template

vehicles_bp = Blueprint('vehicles', __name__)

@vehicles_bp.route('/vehicles')
def vehicles():
    return render_template('vehicles.html')