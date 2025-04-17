from flask import Blueprint, flash, redirect, render_template, request
from app.services.http_client import APIClient

api = APIClient()

users_bp = Blueprint('users', __name__)

@users_bp.route('/users')
def users():
    return render_template('users.html')

@users_bp.route('/users/add', methods=['GET', 'POST'])
def add_user():
    form_data = {}

    if request.method == 'POST':
        form_data = {
            "cedula": request.form.get("cedula"),
            "nombre_usuario": request.form.get("nombre_usuario"),
            "email": request.form.get("email"),
            "rol_id": request.form.get("rol_id"),
            "contrasena": "temporal123",
            "contrasena_temp": None,
            "estado_id": 1,
            "ruta_imagen": None
        }

        response = api.post("/usuarios/", form_data)

        if isinstance(response, dict) and response.get("errors"):
            for mensaje in response["errors"]:
                flash(mensaje, "danger")  # ⚠️ Solo el mensaje, sin campo

        elif response:
            flash("✅ Usuario creado con éxito", "success")
            return redirect("/users")
        else:
            flash("❌ Error de conexión o inesperado", "danger")

    roles = api.get('/roles/')
    return render_template('add_user.html', roles=roles, form_data=form_data)


