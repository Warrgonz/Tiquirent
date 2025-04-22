# api/routes/login.py

from flask.views import MethodView
from flask_smorest import Blueprint
from flask import request, jsonify
from api.models.users import Users
from api.schemas.user_schema import UserSchema
from api.extensions import db
from api.utils.hashing import verify_password
from api.utils.hashing import hash_password
from sqlalchemy.orm import joinedload
import re



blp = Blueprint(
    "login",
    __name__,
    url_prefix="/login",
    description="Módulo de Login"
)

@blp.route("/")
class LoginResource(MethodView):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("contrasena")

        if not email or not password:
            return jsonify({"message": "Credenciales incompletas"}), 400

        user = Users.query.options(
            joinedload(Users.rol),
            joinedload(Users.estado)
        ).filter_by(email=email).first()

        if not user or not (
            verify_password(password, user.contrasena) or
            (user.contrasena_temp and verify_password(password, user.contrasena_temp))
        ):
            return jsonify({"message": "Credenciales inválidas"}), 401

        if user.estado_id != 1:
            return jsonify({"message": "Usuario inactivo"}), 403

        # No devolvemos la contraseña
        schema = UserSchema(exclude=("contrasena", "contrasena_temp"))
        user_data = schema.dump(user)
        user_data["requiere_cambio"] = bool(user.contrasena_temp)
        user_data["cedula"] = user.cedula
        user_data["estado_id"] = user.estado_id
        user_data["ruta_imagen"] = user.ruta_imagen
        return jsonify(user_data), 200

@blp.route("/<int:user_id>/cambiar-contrasena", methods=["POST"])
class CambiarContrasenaResource(MethodView):
    def post(self, user_id):
        data = request.get_json()
        nueva = data.get("nueva")

        if not nueva:
            return jsonify({"message": "Contraseña requerida"}), 400

        if not es_contrasena_segura(nueva):
            return jsonify({"message": "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un símbolo"}), 400

        user = Users.query.get(user_id)
        if not user:
            return jsonify({"message": "Usuario no encontrado"}), 404

        user.contrasena = hash_password(nueva)
        user.contrasena_temp = None
        db.session.commit()

        return jsonify({"message": "Contraseña actualizada correctamente"}), 200

@blp.route("/users/<int:user_id>")
class UserDetailResource(MethodView):
    def get(self, user_id):
        user = Users.query.get(user_id)
        if not user:
            return {"message": "Usuario no encontrado"}, 404
        schema = UserSchema(exclude=("contrasena", "contrasena_temp"))
        return schema.dump(user), 200

def es_contrasena_segura(contra):
    return (
        len(contra) >= 8 and
        re.search(r'[A-Z]', contra) and
        re.search(r'[a-z]', contra) and
        re.search(r'\d', contra) and
        re.search(r'[^\w\s]', contra)
    )