from flask import Blueprint, render_template

users_bp = Blueprint('users', __name__)

@users_bp.route('/users')
def users():
    return render_template('users.html')