from flask import Blueprint, render_template

reservations_bp = Blueprint('reservations', __name__)

@reservations_bp.route('/reservations')
def reservations():
    return render_template('reservations.html')