from datetime import datetime
from flask.views import MethodView
from flask_smorest import Blueprint
from flask import abort, jsonify, render_template, request
from api.extensions import db
from api.models.reservation import Reservation
from api.models.traccion import Traccion
from api.models.transmision import Transmision
from api.models.users import Users
from api.schemas.user_schema import UserSchema
from api.decorators.auth import require_api_key
from api.services.localStorageService import uploadImagePhoto
from api.services.mailServices import send_email_async
from api.models.tipo_cedula import TipoCedula
from api.models.nacionalidad import Nacionalidad
from api.models.ubicaciones import Ubicaciones
from api.models.vehicles import Vehiculo


blp = Blueprint(
    "reservaciones",
    __name__,
    url_prefix="/Reservaciones",
    description="Módulo de Usuarios"
)

# -------------------------------
# RUTA: /usuarios/
# -------------------------------

@blp.route("/reservas")
class ReservaListResource(MethodView):
    @require_api_key
    def get(self):
        return Reservation.query.all()


@blp.route("/crear")
class CrearReservaResource(MethodView):

    @require_api_key
    def post(self):
        try:
            data = request.get_json()

            fmt = "%d/%m/%Y"
            fecha_inicio = datetime.strptime(data["fecha_inicio"], fmt).date()
            fecha_fin = datetime.strptime(data["fecha_fin"], fmt).date()

            nueva_reserva = Reservation(
                nombre_usuario=data["nombre_usuario"],
                cedula=data["cedula"],
                email=data["email"],
                telefono=data["telefono"],
                licencia=data["licencia"],
                tipo_cedula_id=int(data["tipo_cedula_id"]),
                nacionalidad_id=int(data["nacionalidad_id"]),
                ubicacion_entrega_id=int(data["ubicacion_entrega_id"]),
                ubicacion_regreso_id=int(data["ubicacion_regreso_id"]),
                fecha_inicio=fecha_inicio,
                fecha_fin=fecha_fin,
                vehiculo_id=int(data["vehiculo_id"]),
                estado_id=1  # Estado por defecto: Activa
            )

            db.session.add(nueva_reserva)
            db.session.commit()

            # Recuperar relaciones para el correo
            tipo = TipoCedula.query.get(nueva_reserva.tipo_cedula_id)
            nacion = Nacionalidad.query.get(nueva_reserva.nacionalidad_id)
            entrega = Ubicaciones.query.get(nueva_reserva.ubicacion_entrega_id)
            regreso = Ubicaciones.query.get(nueva_reserva.ubicacion_regreso_id)
            vehiculo = Vehiculo.query.get(nueva_reserva.vehiculo_id)

            html_content = render_template(
                "email/reserva_email.html",
                nombre=nueva_reserva.nombre_usuario,
                cedula=nueva_reserva.cedula,
                email=nueva_reserva.email,
                telefono=nueva_reserva.telefono,
                licencia=nueva_reserva.licencia,
                tipo_cedula=tipo.tipo_cedula if tipo else "",
                nacionalidad=nacion.pais if nacion else "",
                entrega=entrega.ubicacion if entrega else "",
                regreso=regreso.ubicacion if regreso else "",
                fecha_inicio=fecha_inicio.strftime("%d/%m/%Y"),
                fecha_fin=fecha_fin.strftime("%d/%m/%Y"),
                vehiculo=f"{vehiculo.marca.nombre} {vehiculo.modelo}" if vehiculo and vehiculo.marca else vehiculo.modelo
            )

            send_email_async(
                receiver_email=nueva_reserva.email,
                subject="📄 Confirmación de tu Reserva en Tiquirent",
                body=html_content
            )

            return {
                "message": "✅ Reserva creada con éxito.",
                "reserva_id": nueva_reserva.id
            }, 201

        except Exception as e:
            print("❌ Error al crear la reserva:", e)
            db.session.rollback()
            return {
                "message": "❌ Error al crear la reserva.",
                "error": str(e)
            }, 500
        


@blp.route("/catalogo/usuarios")
class CatalogoUsuariosResource(MethodView):

    @require_api_key
    def get(self):
        nacionalidades = Nacionalidad.query.all()
        tipos_cedula = TipoCedula.query.all()

        return {
            "nacionalidades": [{"id": n.id, "pais": n.pais} for n in nacionalidades],
            "tipos_cedula": [{"id": t.id, "tipo": t.tipo_cedula} for t in tipos_cedula]
        }
    

@blp.route("/catalogo/reservas")
class CatalogoReservasResource(MethodView):

    @require_api_key
    def get(self):
        ubicaciones = Ubicaciones.query.all()

        return {
            "ubicaciones": [{"id": u.id, "ubicacion": u.ubicacion} for u in ubicaciones]    
        }
    
    # api/routes/vehicles.py

@blp.route("/catalogo/vehiculos")
class CatalogoVehiculosResource(MethodView):

    @require_api_key
    def get(self):
        try:
            vehiculos = Vehiculo.query.all()

            return {
                "vehiculos": [
                    {
                        "id": v.id,
                        "modelo": v.modelo,
                        "año": v.año,
                        "placa": v.placa,
                        "color": v.color,
                        "ruta_imagen": v.ruta_imagen,
                        "precio_diario": float(v.precio_diario or 0),
                        "puertas": v.puertas,
                        "numero_asientos": v.numero_asientos,
                        "marca": v.marca.nombre if v.marca else None,          
                        "transmision": v.transmision.tipo if v.transmision else None,  
                        "traccion": v.traccion.tipo if v.traccion else None,          
                        "estado": v.estado.estado if v.estado else None              
                    }
                    for v in vehiculos
                ]
            }

        except Exception as e:
            print("❌ Error en /catalogo/vehiculos:", e)
            return {"vehiculos": []}, 500

@blp.route("/catalogo/vehiculos/filtrados")
class CatalogoVehiculosFiltrados(MethodView):

    @require_api_key
    def get(self):
        capacidad = request.args.getlist("capacidad")
        transmision = request.args.getlist("transmision")
        traccion = request.args.getlist("traccion")

        query = Vehiculo.query

        if capacidad:
            rangos = []
            for r in capacidad:
                if r == "1-4":
                    rangos.append((1, 4))
                elif r == "5-6":
                    rangos.append((5, 6))
                elif r == "7+":
                    rangos.append((7, 99))

            condiciones = [(Vehiculo.numero_asientos >= a) & (Vehiculo.numero_asientos <= b) for (a, b) in rangos]
            query = query.filter(db.or_(*condiciones))

        if transmision:
            query = query.join(Vehiculo.transmision).filter(Transmision.tipo.in_(transmision))

        if traccion:
            query = query.join(Vehiculo.traccion).filter(Traccion.tipo.in_(traccion))

        vehiculos = query.all()

        return {
            "vehiculos": [
                {
                    "id": v.id,
                    "modelo": v.modelo,
                    "año": v.año,
                    "placa": v.placa,
                    "color": v.color,
                    "ruta_imagen": v.ruta_imagen,
                    "precio_diario": float(v.precio_diario or 0),
                    "puertas": v.puertas,
                    "numero_asientos": v.numero_asientos,
                    "marca": v.marca.nombre if v.marca else None,
                    "transmision": v.transmision.tipo if v.transmision else None,
                    "traccion": v.traccion.tipo if v.traccion else None,
                    "estado": v.estado.estado if v.estado else None
                }
                for v in vehiculos
            ]
        }

