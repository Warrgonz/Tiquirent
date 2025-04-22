from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from flask_login import login_user, current_user, login_required, logout_user
from app.services.http_client import APIClient
from app.models.user import User


signIn_bp = Blueprint('signIn', __name__)
api_client = APIClient()

@signIn_bp.route('/', methods=['GET', 'POST'])
def inicio():
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get('password')

        res = api_client.post("/login/", json={
            "email": email,
            "contrasena": password
        })

        print("🔐 Respuesta completa del login:", res)

        if isinstance(res, dict) and res.get("id"):
            user = User(res)

            session["user_data"] = user.to_dict()
            remember = bool(request.form.get("remember"))
            login_user(user, remember=remember, fresh=True)

            if getattr(user, "requiere_cambio", False):
                return redirect(url_for("signIn.cambiar_contrasena_opcional"))

            next_page = request.args.get("next")
            return redirect(next_page or url_for('dashboard.dashboard'))

        flash(res.get("message", "Error de login"), "danger")

    return render_template('signIn.html')


@signIn_bp.route('/resetPasswordOpcional', methods=['GET', 'POST'])
@login_required
def cambiar_contrasena_opcional():
    if request.method == 'POST':
        nueva = request.form.get("nueva")
        repetir = request.form.get("repetir")

        if not nueva or nueva != repetir:
            flash("❌ Las contraseñas no coinciden", "danger")
            return redirect(request.url)

        res = api_client.post(f"/login/{current_user.id}/cambiar-contrasena", json={
            "nueva": nueva
        })

        if res.get("message"):
            flash("✅ Contraseña actualizada", "success")
            return redirect(url_for("dashboard.dashboard"))
        else:
            flash("❌ Error al cambiar la contraseña", "danger")

    # ⬇️ Este sí muestra el HTML con botón "Omitir"
    return render_template("resetPasswordOpcional.html")

@signIn_bp.route('/logout')
@login_required
def logout():
    from flask import session 
    logout_user()
    session.clear()
    return redirect(url_for('signIn.inicio'))