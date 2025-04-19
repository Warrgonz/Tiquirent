from flask import Blueprint, flash, redirect, render_template, request
from app.services.http_client import APIClient
import os
from werkzeug.utils import secure_filename

api = APIClient()

users_bp = Blueprint('users', __name__)

@users_bp.route('/users')
def users():
    roles = api.get('/roles/')
    users = api.get('/usuarios/')
    return render_template('users/users.html', users=users, roles=roles)

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


