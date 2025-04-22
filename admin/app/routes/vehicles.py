# app/routes/vehicles.py

from flask import Blueprint, jsonify, render_template, request, redirect, url_for, flash
from app.services.http_client import APIClient

vehicles_bp = Blueprint('vehicles', __name__)

def get_catalogo_data():
    api = APIClient()
    catalogo = api.get("/catalogo/vehiculos")

    if not isinstance(catalogo, dict):
        flash("❌ Error al cargar el catálogo de datos.", "danger")
        return {
            "marcas": [],
            "transmisiones": [],
            "tracciones": [],
            "estados": []
        }

    return {
        "marcas": catalogo.get("marcas", []),
        "transmisiones": catalogo.get("transmisiones", []),
        "tracciones": catalogo.get("tracciones", []),
        "estados": catalogo.get("estados", [])
    }

@vehicles_bp.route('/vehicles')
def listar_vehiculos():
    page = request.args.get('page', 1, type=int)
    per_page = 5

    api = APIClient()
    query = request.args.get("q", "")
    data = api.get(f"/vehiculos/?q={query}")  # Incluye búsqueda si aplica

    all_vehiculos = data.get("vehiculos", []) if isinstance(data, dict) else []
    total = len(all_vehiculos)
    start = (page - 1) * per_page
    end = start + per_page
    vehiculos_paginated = all_vehiculos[start:end]

    total_pages = max(1, (total + per_page - 1) // per_page)

    return render_template(
        'vehicles/vehicles.html',
        vehiculos=vehiculos_paginated,
        current_page=page,
        total_pages=total_pages
    )



@vehicles_bp.route("/vehicles/add")
def vehicles_add():
    return render_template("vehicles/add_vehicles.html", **get_catalogo_data())

@vehicles_bp.route('/vehicles/add', methods=["POST"])
def vehicles_add_post():
    api = APIClient()
    form_data = request.form.to_dict()
    imagen = request.files.get("ruta_imagen")

    # Leer imagen si existe
    files = None
    if imagen and imagen.filename:
        contenido = imagen.read()
        imagen.seek(0)
        files = {"ruta_imagen": (imagen.filename, contenido, imagen.mimetype)}

    print("🧪📤 DEBUG CLIENTE – DATOS ENVIADOS AL BACKEND:\n")
    for k, v in form_data.items():
        print(f"{k}: {v}")
    if files:
        print(f"ruta_imagen (filename): {files['ruta_imagen'][0]}")
        print(f"ruta_imagen (mimetype): {files['ruta_imagen'][2]}")
        print(f"ruta_imagen (content_length): {len(contenido)}")

    # Enviar a la API
    response = api.post("/vehiculos/", data=form_data, files=files)

    if isinstance(response, dict) and "errors" in response:
        for error in response["errors"]:
            flash(error, "danger")
        return render_template(
            "vehicles/add_vehicles.html",
            form_data=form_data,
            **get_catalogo_data()
        )

    flash("✅ Vehículo agregado correctamente.", "success")
    return redirect(url_for("vehicles.vehicles"))

@vehicles_bp.route("/vehicles/view/<int:vehiculo_id>")
def vehicle_view(vehiculo_id):
    api = APIClient()
    vehiculo = api.get(f"/vehiculos/{vehiculo_id}")  

    if not vehiculo or vehiculo.get("error"):
        flash("❌ Vehículo no encontrado", "danger")
        return redirect("/vehicles")

    catalogo = get_catalogo_data()

    return render_template(
        "vehicles/view_vehicles.html",
        user=vehiculo,
        form_data=vehiculo,
        **catalogo
    )

@vehicles_bp.route("/vehicles/edit/<int:vehiculo_id>")
def vehicle_edit(vehiculo_id):
    api = APIClient()

    vehiculo = api.get(f"/vehiculos/{vehiculo_id}")
    if not vehiculo or vehiculo.get("error"):
        flash("❌ Vehículo no encontrado", "danger")
        return redirect("/vehicles")

    catalogo = api.get("/catalogo/vehiculos")
    if not isinstance(catalogo, dict):
        flash("❌ Error al cargar el catálogo de datos.", "danger")
        catalogo = {"marcas": [], "transmisiones": [], "tracciones": [], "estados": []}

    return render_template(
        "vehicles/edit_vehicles.html",  # Podés cambiar luego a edit_vehicles.html si querés
        user=vehiculo,
        marcas=catalogo.get("marcas", []),
        transmisiones=catalogo.get("transmisiones", []),
        tracciones=catalogo.get("tracciones", []),
        estados=catalogo.get("estados", [])
    )

@vehicles_bp.route("/vehicles/edit/<int:vehiculo_id>", methods=["POST"])
def vehicle_edit_post(vehiculo_id):
    api = APIClient()
    form_data = request.form.to_dict()
    imagen = request.files.get("ruta_imagen")

    files = None
    if imagen and imagen.filename:
        contenido = imagen.read()
        imagen.seek(0)
        files = {"ruta_imagen": (imagen.filename, contenido, imagen.mimetype)}

    response = api.post(f"/vehiculos/{vehiculo_id}/edit", data=form_data, files=files)

    if isinstance(response, dict):
        if response.get("message"):
            flash(f"✅ {response['message']}", "success")
        elif response.get("error"):
            flash(f"❌ {response['error']}", "danger")
        else:
            flash("❌ Error desconocido al actualizar el vehículo", "danger")
    else:
        flash("❌ Error inesperado al conectarse con la API", "danger")

    return redirect(url_for("vehicles.vehicles"))

@vehicles_bp.route("/vehicles/delete/<int:vehiculo_id>", methods=["POST"])
def delete_vehicle(vehiculo_id):
    api = APIClient()
    response = api.delete(f"/vehiculos/{vehiculo_id}")

    if isinstance(response, dict) and response.get("message"):
        flash("✅ Vehículo eliminado exitosamente.", "success")
    else:
        flash("❌ No se pudo eliminar el vehículo.", "danger")

    return redirect(url_for("vehicles.vehicles"))

@vehicles_bp.route("/vehicles/delete/<int:vehiculo_id>", methods=["POST"])
def vehicle_delete(vehiculo_id):
    api = APIClient()
    response = api.delete(f"/vehiculos/{vehiculo_id}")

    if isinstance(response, dict) and response.get("message"):
        flash(response["message"], "success")
    else:
        flash(response.get("error", "❌ No se pudo eliminar el vehículo."), "danger")

    return redirect("/vehicles")


