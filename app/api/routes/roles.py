# api/routes/users.py

from flask.views import MethodView
from flask_smorest import Blueprint
from flask import abort
from api.extensions import db
from api.models.role import Role
from api.schemas.role_schema import RoleSchema
from api.decorators.auth import require_api_key


blp = Blueprint(
    "roles",              
    __name__,                
    url_prefix="/roles",  
    description="Módulo de Roles"
)

@blp.route("/")
class RolesResource(MethodView):

    @require_api_key
    @blp.response(200, RoleSchema(many=True))
    def get(self):
        """Listar todos los roles"""
        return Role.query.all()

