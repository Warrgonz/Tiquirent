# routes/signout.py

from flask import Blueprint, redirect, url_for
from flask_login import login_required, logout_user

signOut_bp = Blueprint('signOut', __name__)

@signOut_bp.route("/logout")
@login_required 
def logout():
    logout_user()
    return redirect(url_for('signIn.inicio'))
