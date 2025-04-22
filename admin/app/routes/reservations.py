from flask import Blueprint, flash, render_template

from app.services.http_client import APIClient

reservations_bp = Blueprint('reservations', __name__)

@reservations_bp.route('/reservations')
def reservations():
    return render_template('reservations/reservations.html')

@reservations_bp.route('/reservations/create/user-data')
def reservations_create_data():
    api = APIClient()
    catalogo = api.get("/Reservaciones/catalogo/usuarios")

    return render_template(
        'reservations/reservations_create_user-data.html',
        nacionalidades=catalogo.get("nacionalidades", []),
        tipos_cedula=catalogo.get("tipos_cedula", [])
    )

@reservations_bp.route('/reservations/create/details')
def reservations_details_data():
    api = APIClient()
    catalogo = api.get("/Reservaciones/catalogo/reservas")

    if not isinstance(catalogo, dict):
        flash("❌ Error al cargar las ubicaciones de recogida.", "danger")
        catalogo = {"ubicaciones": []}

    return render_template(
        "reservations/reservations_details-data.html",
        ubicaciones=catalogo.get("ubicaciones", [])
    )



@reservations_bp.route('/reservations/create/vehiculo')
def reservations_vehiculo_data():
    return render_template('reservations/reservations_vehiculo-data.html')

@reservations_bp.route('/reservations/create/overview')
def reservations_overview_data():
    return render_template('reservations/reservations_overview-data.html')