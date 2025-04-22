from flask.views import MethodView
from flask_smorest import Blueprint
from flask import abort, jsonify, render_template, request
from api.extensions import db
from api.models.users import Users
from api.schemas.user_schema import UserSchema
from api.decorators.auth import require_api_key
from api.services.localStorageService import uploadImagePhoto
from api.services.mailServices import send_email_async
from api.models.tipo_cedula import TipoCedula
from api.models.nacionalidad import Nacionalidad
from api.models.ubicaciones import Ubicaciones


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