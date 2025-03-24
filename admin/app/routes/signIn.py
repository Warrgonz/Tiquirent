from flask import Blueprint, render_template

signIn_bp = Blueprint('signIn', __name__)

@signIn_bp.route('/')
def inicio():
    return render_template('signIn.html')