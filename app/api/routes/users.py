# api/routes/users.py

from flask.views import MethodView
from flask_smorest import Blueprint
from flask import abort
from api.extensions import db
from api.models.users import Users
from api.schemas.user_schema import UserSchema
from api.decorators.auth import require_api_key
#from api.controller.users import CreateUser

blp = Blueprint(
    "usuarios",              
    __name__,                
    url_prefix="/usuarios",  
    description="Módulo de Usuarios"
)

@blp.route("/")
class UsuariosResource(MethodView):

    @require_api_key
    @blp.response(200, UserSchema(many=True))
    def get(self):
        """Listar todos los usuarios"""
        return Users.query.all()

    @blp.arguments(UserSchema)
    @blp.response(201, UserSchema)
    def post(self, user_data):
        """Crear nuevo usuario"""

        #CreateUser

        if Users.query.filter_by(email=user_data["email"]).first():
            abort(400, message="Ya existe un usuario con ese email.")
        
        nuevo_usuario = Users(**user_data)
        db.session.add(nuevo_usuario)
        db.session.commit()
        return nuevo_usuario
