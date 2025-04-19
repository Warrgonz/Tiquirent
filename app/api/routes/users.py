# api/routes/users.py

from flask.views import MethodView
from flask_smorest import Blueprint
from flask import abort, jsonify, render_template, request
from api.extensions import db
from api.models.users import Users
from api.schemas.user_schema import UserSchema
from api.decorators.auth import require_api_key
from api.controller.users import CreateUser, generate_temp_password
from api.services.localStorageService import uploadImagePhoto
from api.services.mailServices import send_email_async
from api.utils.hashing import hash_password

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

    @blp.response(201, UserSchema)
    def post(self):
        form = request.form
        errores = []

        if not form.get("cedula"):
            errores.append("La cédula es obligatoria.")
        if not form.get("nombre_usuario"):
            errores.append("El nombre de usuario es obligatorio.")
        if not form.get("email"):
            errores.append("El correo electrónico es obligatorio.")

        if Users.query.filter_by(email=form.get("email")).first():
            errores.append("Ya existe un usuario con ese correo electrónico.")
        if Users.query.filter_by(cedula=form.get("cedula")).first():
            errores.append("Ya existe un usuario con esa cédula.")

        if errores:
            return jsonify({"errors": errores}), 400

        imagen_file = request.files.get("foto")
        try:
            image_url = uploadImagePhoto(
                file_obj=imagen_file,
                tipo="profile-pictures",
                identificador=form.get("cedula")
            )
        except ValueError as e:
            return jsonify({"errors": [str(e)]}), 400
        except Exception as e:
            print("❌ Error inesperado al subir imagen:", str(e))
            return jsonify({"errors": ["Error al procesar la imagen."]}), 500

        # 1. Generar contraseña temporal
        temp_password = generate_temp_password()
        hashed_password = hash_password(temp_password)

        # 2. Crear usuario
        nuevo_usuario = Users(
            cedula=form.get("cedula"),
            nombre_usuario=form.get("nombre_usuario"),
            email=form.get("email"),
            contrasena="",
            contrasena_temp=hashed_password,
            rol_id=form.get("rol_id"),
            estado_id=1,
            ruta_imagen=image_url
        )

        db.session.add(nuevo_usuario)
        db.session.commit()

        # 3. Renderizar el template con la contraseña temporal
        html_content = render_template(
            'email/temp_password.html',
            nombre=form.get("nombre_usuario"),
            contrasena=temp_password
        )

        # 4. Enviar correo de forma asíncrona
        send_email_async(
            receiver_email=form.get("email"),
            subject="Tu contraseña temporal para Tiquirent",
            body=html_content
        )

        return nuevo_usuario