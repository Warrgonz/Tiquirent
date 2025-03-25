from flask import Blueprint, render_template

signIn_bp = Blueprint('signIn', __name__)

@signIn_bp.route('/')
def inicio():
    return render_template('signIn.html')

@signIn_bp.route('/forgotPassword')
def forgotPassword():
    return render_template('forgotPassword.html')

@signIn_bp.route('/resetPassword')
def resetPassword():
    return render_template('resetPassword.html')