from flask import Blueprint, flash, jsonify, redirect, render_template, request, session
from datetime import datetime, timedelta

from flask_login import login_required

from app.services.http_client import APIClient
from datetime import datetime, timedelta

reservations_bp = Blueprint('reservations', __name__)

api = APIClient()

@reservations_bp.route("/reservations")
@login_required 
def reservations():
    reservas = api.get("/Reservaciones/reservas/")

    print(reservas)
    
    if isinstance(reservas, dict) and reservas.get("error"):
        flash("❌ Error al obtener las reservaciones", "danger")
        reservas = []

    return render_template("reservations/reservations.html", reservas=reservas)

@reservations_bp.route('/reservations/create/user-data', methods=["GET", "POST"])
@login_required 
def reservations_create_data():
    if request.method == "POST":
        # Obtener datos del formulario
        nombre = request.form.get("nombre")
        nacionalidad = request.form.get("nacionalidad")
        tipo_cedula = request.form.get("tipo_cedula")
        cedula = request.form.get("cedula")
        email = request.form.get("email")
        telefono = request.form.get("telefono")
        licencia = request.form.get("licencia")

        # Construir el objeto
        session['reserva'] = session.get('reserva', {})
        session['reserva'].update({
            "usuario": {
                "nombre": nombre,
                "nacionalidad": nacionalidad,
                "tipo_cedula": tipo_cedula,
                "cedula": cedula,
                "email": email,
                "telefono": telefono,
                "licencia": licencia
            }
        })

        print("🔐 Sesión después de guardar usuario:")
        print(session['reserva'])

        return redirect("/reservations/create/details")

    # GET (cargar el formulario)
    api = APIClient()
    catalogo = api.get("/Reservaciones/catalogo/usuarios")

    return render_template(
        'reservations/reservations_create_user-data.html',
        nacionalidades=catalogo.get("nacionalidades", []),
        tipos_cedula=catalogo.get("tipos_cedula", [])
    )


@reservations_bp.route('/reservations/create/details', methods=["GET", "POST"])
@login_required 
def reservations_details_data():
    api = APIClient()
    catalogo = api.get("/Reservaciones/catalogo/reservas")

    if not isinstance(catalogo, dict):
        flash("❌ Error al cargar las ubicaciones de recogida.", "danger")
        catalogo = {"ubicaciones": []}

    if request.method == "POST":
        entrega = request.form.get("ubicacion_entrega")
        regreso = request.form.get("ubicacion_regreso")
        start_date = request.form.get("start_date")
        end_date = request.form.get("end_date")

        session['reserva'] = session.get('reserva', {})
        session['reserva']['detalles'] = {
            "ubicacion_entrega": entrega,
            "ubicacion_regreso": regreso,
            "start_date": start_date,
            "end_date": end_date
        }

        print("📦 Sesión actualizada con detalles:")
        print(session['reserva'])

        return redirect("/reservations/create/vehiculo")

    return render_template(
        "reservations/reservations_details-data.html",
        ubicaciones=catalogo.get("ubicaciones", [])
    )


@reservations_bp.route('/reservations/create/vehiculo', methods=['GET', 'POST'])
@login_required 
def reservations_vehiculo_data():
    if request.method == 'POST':
        vehiculo_id = request.form.get('vehiculo_id')

        if not vehiculo_id:
            flash("❌ Vehículo no seleccionado.", "danger")
            return redirect("/reservations/create/vehiculo")

        session['reserva'] = session.get('reserva', {})
        session['reserva']['vehiculo'] = int(vehiculo_id)

        # Guardar inicio de temporizador si aún no existe
        if not session['reserva'].get("inicio_temporizador"):
            session['reserva']['inicio_temporizador'] = datetime.now().isoformat()

        print("🚗 Vehículo agregado a la sesión:")
        print(session['reserva'])

        return redirect("/reservations/create/overview")

    # GET: Verificación de temporizador antes de cargar vehículos
    session['reserva'] = session.get("reserva", {})
    inicio_str = session['reserva'].get("inicio_temporizador")

    if inicio_str:
        try:
            inicio_dt = datetime.fromisoformat(inicio_str)
            if datetime.now() > inicio_dt + timedelta(minutes=5):
                # ⏰ Tiempo expirado: limpiar datos relacionados al vehículo
                session['reserva'].pop("vehiculo", None)
                session['reserva'].pop("inicio_temporizador", None)
                flash("⏰ El tiempo para confirmar la reserva ha expirado. Seleccione nuevamente un vehículo.", "warning")
        except Exception as e:
            print("⚠️ Error al verificar el temporizador:", e)

    # Obtener vehículos
    api = APIClient()
    catalogo = api.get("/Reservaciones/catalogo/vehiculos")

    if not isinstance(catalogo, dict) or "vehiculos" not in catalogo:
        flash("❌ Error al cargar los vehículos disponibles.", "danger")
        catalogo = {"vehiculos": []}

    print(f"🔍 Vehículos recibidos del API: {len(catalogo['vehiculos'])}")

    return render_template(
        "reservations/reservations_vehiculo-data.html",
        vehiculos=catalogo.get("vehiculos", [])
    )


@reservations_bp.route('/reservations/create/overview')
@login_required 
def reservations_overview_data():
    reserva = session.get("reserva", {})
    vehiculo_id = reserva.get("vehiculo")

    # Obtener todos los vehículos y ubicaciones
    api = APIClient()
    catalogo = api.get("/Reservaciones/catalogo/vehiculos")
    ubicaciones_data = api.get("/Reservaciones/catalogo/reservas")

    # Solo guardarlo si no existe ya
    if not session['reserva'].get("inicio_temporizador"):
        session['reserva']['inicio_temporizador'] = datetime.now().isoformat()

    if isinstance(ubicaciones_data, dict) and "ubicaciones" in ubicaciones_data:
        ubicaciones = {u["id"]: u["ubicacion"] for u in ubicaciones_data["ubicaciones"]}
    elif isinstance(ubicaciones_data, list):
        ubicaciones = {u["id"]: u["ubicacion"] for u in ubicaciones_data}
    else:
        ubicaciones = {}


    vehiculo = None

    if isinstance(catalogo, dict) and "vehiculos" in catalogo:
        for v in catalogo["vehiculos"]:
            if v["id"] == vehiculo_id:
                vehiculo = v
                break

    if not vehiculo:
        flash("❌ Vehículo no encontrado.", "danger")
        return redirect("/reservations/create/vehiculo")

    fmt = "%d/%m/%Y"
    detalles = reserva.get("detalles", {})
    try:
        inicio = datetime.strptime(detalles["start_date"], fmt)
        fin = datetime.strptime(detalles["end_date"], fmt)
        dias = (fin - inicio).days
        total = dias * vehiculo["precio_diario"]
    except Exception as e:
        dias = 0
        total = 0
        print("⚠️ Error calculando el total:", e)

    return render_template(
        "reservations/reservations_overview-data.html",
        reserva=reserva,
        vehiculo=vehiculo,
        ubicaciones_dict=ubicaciones,
        dias=dias,
        total=total
    )

@reservations_bp.route('/reservations/complete', methods=["POST"])
@login_required 
def reservations_complete():
    reserva = session.get("reserva", {})
    inicio_str = reserva.get("inicio_temporizador")

    if inicio_str:
        try:
            inicio_dt = datetime.fromisoformat(inicio_str)
            if datetime.now() > inicio_dt + timedelta(minutes=5):
                flash("⏰ El tiempo para completar la reserva ha expirado.", "warning")
                session['reserva'].pop("vehiculo", None)
                session['reserva'].pop("inicio_temporizador", None)
                return redirect("/reservations/create/vehiculo")
        except Exception as e:
            print("⚠️ Error validando el temporizador:", e)

    # Construcción del payload desde session
    try:
        detalles = reserva["detalles"]
        usuario = reserva["usuario"]

        data = {
            "nombre_usuario": usuario["nombre"],
            "cedula": usuario["cedula"],
            "email": usuario["email"],
            "telefono": usuario["telefono"],
            "licencia": usuario["licencia"],
            "tipo_cedula_id": int(usuario["tipo_cedula"]),
            "nacionalidad_id": int(usuario["nacionalidad"]),
            "ubicacion_entrega_id": int(detalles["ubicacion_entrega"]),
            "ubicacion_regreso_id": int(detalles["ubicacion_regreso"]),
            "fecha_inicio": detalles["start_date"],
            "fecha_fin": detalles["end_date"],
            "vehiculo_id": reserva["vehiculo"]
        }

        # Envío a la API
        api = APIClient()
        response = api.post("/Reservaciones/crear", json=data)

        if response and "reserva_id" in response:
            flash("✅ ¡Reserva completada con éxito!", "success")
        else:
            flash("⚠️ La reserva no se pudo registrar correctamente.", "warning")

    except Exception as e:
        flash("❌ Error interno al completar la reserva.", "danger")
        print("⚠️ Error en creación de reserva:", e)

    # Limpiar la sesión
    session.pop("reserva", None)

    return redirect("/reservations")


