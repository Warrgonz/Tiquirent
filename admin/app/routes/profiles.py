from flask import Blueprint, render_template, session, request, redirect, flash
from flask_login import login_required
from app.services.http_client import APIClient

profiles_bp = Blueprint('profiles', __name__, url_prefix='/profiles')

api = APIClient()

@profiles_bp.route('/')
@login_required
def profiles():
    user = session.get("user_data", {})
    return render_template('profiles.html', user=user)


@profiles_bp.route('/edit', methods=['GET', 'POST'])
@login_required
def edit_profile():
    user = session.get("user_data", {})
    user_id = user.get("id")

    if request.method == "POST":
        form_data = {
            "nombre_usuario": request.form.get("nombre_usuario"),
        }

        foto = request.files.get("foto")
        files = None
        if foto and foto.filename:
            contenido = foto.read()
            foto.seek(0)
            files = {"foto": (foto.filename, contenido, foto.mimetype)}

        response = api.post(
            f"/usuarios/{user_id}/edit", data=form_data, files=files
        )

        if isinstance(response, dict) and response.get("message"):
            # 🔁 Refrescar los datos en sesión para reflejar los cambios en /profiles
            user_data_actualizado = api.get(f"/usuarios/{user_id}")
            if isinstance(user_data_actualizado, dict):
                session["user_data"] = user_data_actualizado

            flash("✅ Perfil actualizado correctamente", "success")
        else:
            flash("❌ No se pudo actualizar el perfil", "danger")

        return redirect("/profiles")

    user_data = api.get(f"/usuarios/{user_id}")
    return render_template("profiles_edit.html", user=user_data)


@profiles_bp.route('/change-password', methods=['GET', 'POST'])
@login_required
def change_password():
    user = session.get("user_data", {})
    user_id = user.get("id")

    if request.method == "POST":
        nueva = request.form.get("nueva")
        repetir = request.form.get("repetir")

        if not nueva or nueva != repetir:
            flash("❌ Las contraseñas no coinciden", "danger")
            return redirect("/profiles/change-password")

        response = api.post(f"/login/{user_id}/cambiar-contrasena", json={"nueva": nueva})

        if response.get("message"):
            flash("✅ Contraseña actualizada correctamente", "success")
        else:
            flash("❌ Error al actualizar la contraseña", "danger")

        return redirect("/profiles")

    return render_template("resetPassword_perfil.html")
