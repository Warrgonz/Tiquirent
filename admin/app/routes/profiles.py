from flask import Blueprint, render_template

profiles_bp = Blueprint('profiles', __name__)

@profiles_bp.route('/profiles')
def profiles():
    return render_template('profiles.html')