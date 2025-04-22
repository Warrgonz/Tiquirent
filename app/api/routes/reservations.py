from flask.views import MethodView
from flask_smorest import Blueprint
from flask import abort, jsonify, render_template, request
from api.extensions import db
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

