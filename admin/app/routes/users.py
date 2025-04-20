from flask import Blueprint, flash, jsonify, redirect, render_template, request
import requests
from app.services.http_client import APIClient
import os
from werkzeug.utils import secure_filename

api = APIClient()

users_bp = Blueprint('users', __name__)

@users_bp.route('/users')
def users():
    roles = api.get('/roles/')
    users = api.get('/usuarios/')
    return render_template('users/users.html', users=users, roles=roles,config={"API_BASE_URL": os.getenv("API_BASE_URL")})

@users_bp.route('/users/add', methods=['GET', 'POST'])
def add_user():
    form_data = {}

    if request.method == 'POST':
        # 🔽 Recoger campos del formulario
        form_data = {
            "cedula": request.form.get("cedula"),
            "nombre_usuario": request.form.get("nombre_usuario"),
            "email": request.form.get("email"),
            "rol_id": request.form.get("rol_id"),
            "contrasena": "temporal123",
            "contrasena_temp": None,
            "estado_id": 1
        }

        # 🔽 Leer imagen
        foto = request.files.get("foto")
        if foto and foto.filename:
            contenido = foto.read()
            foto.seek(0)  # Rebobinar para poder reenviar
            files = {"foto": (foto.filename, contenido, foto.mimetype)}
            response = api.post("/usuarios/", data=form_data, files=files)
        else:
            response = api.post("/usuarios/", data=form_data)

        # 🔽 Manejo de respuesta del backend
        if isinstance(response, dict) and response.get("errors"):
            for msg in response["errors"]:
                flash(msg, "danger")  # ✅ Mostrar errores uno por uno
            return redirect(request.url)

        elif response:
            flash("✅ Usuario creado con éxito", "success")
            return redirect("/users")

        else:
            flash("❌ Error de conexión o inesperado", "danger")

    # 🔽 Mostrar formulario
    roles = api.get('/roles/')
    return render_template('users/add_user.html', roles=roles, form_data=form_data)

@users_bp.route("/users/<int:user_id>/toggle", methods=["POST"])
def toggle_user_status_web(user_id):
    estado = request.form.get("estado_id")
    if not estado:
        flash("❌ Estado inválido", "danger")
        return redirect("/users")

    try:
        estado = int(estado)
    except ValueError:
        flash("❌ Estado no numérico", "danger")
        return redirect("/users")

    response = api.post(
        f"/usuarios/{user_id}/toggle",
        data={"estado_id": estado}
    )

    if isinstance(response, dict) and response.get("message"):
        flash(f"✅ {response['message']}", "success")
    else:
        flash("❌ No se pudo actualizar el estado del usuario", "danger")

    return redirect("/users")

@users_bp.route("/test")
def test():
   return render_template('/users/test.html')

@users_bp.route("/users/<int:user_id>/edit", methods=["GET", "POST"])
def edit_user(user_id):
    if request.method == "POST":
        form_data = {
            "nombre_usuario": request.form.get("nombre_usuario"),
            "email": request.form.get("email"),
            "rol_id": request.form.get("rol_id"),
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
            flash("✅ Usuario actualizado correctamente", "success")
        else:
            flash("❌ Hubo un problema al actualizar el usuario", "danger")

        return redirect("/users")

    user = api.get(f"/usuarios/{user_id}")
    if not user:
        flash("❌ Usuario no encontrado", "danger")
        return redirect("/users")

    roles = api.get("/roles/")
    return render_template("users/edit_user.html", user=user, roles=roles, form_data=user)





