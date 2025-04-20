from flask.views import MethodView
from flask_smorest import Blueprint
from flask import abort, jsonify, render_template, request
from api.extensions import db
from api.models.users import Users
from api.schemas.user_schema import UserSchema
from api.decorators.auth import require_api_key
from api.controller.users import generate_temp_password
from api.services.localStorageService import uploadImagePhoto
from api.services.mailServices import send_email_async
from api.utils.hashing import hash_password

blp = Blueprint(
    "usuarios",
    __name__,
    url_prefix="/usuarios",
    description="Módulo de Usuarios"
)

# -------------------------------
# RUTA: /usuarios/
# -------------------------------
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
            contrasena="",  # Campo requerido pero vacío porque usamos contrasena_temp
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

# -------------------------------
# RUTA: /usuarios/<id>/toggle
# -------------------------------
@blp.route("/<int:user_id>/toggle", methods=["POST"])
class UsuarioToggleEstadoResource(MethodView):

    @require_api_key
    def post(self, user_id):
        user = Users.query.get(user_id)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        form = request.form
        try:
            nuevo_estado = int(form.get("estado_id"))
        except (TypeError, ValueError):
            return jsonify({"error": "Estado inválido"}), 400

        if nuevo_estado not in [1, 2]:
            return jsonify({"error": "Estado inválido"}), 400

        user.estado_id = nuevo_estado
        db.session.commit()

        estado_legible = "habilitado" if nuevo_estado == 1 else "deshabilitado"

        # 📧 Renderizar correo dinámico
        html_content = render_template(
            'email/account_disabled.html',
            nombre=user.nombre_usuario,
            estado=estado_legible
        )

        # ✉️ Enviar notificación
        send_email_async(
            receiver_email=user.email,
            subject=f"Tu cuenta ha sido {estado_legible}",
            body=html_content
        )

        return jsonify({
            "message": f"Estado del usuario actualizado correctamente a {estado_legible}"
        }), 200
    
# -------------------------------
# RUTA: /usuarios/<id>/edit
# -------------------------------

@blp.route("/<int:user_id>", methods=["GET", "POST"])
class UsuarioResource(MethodView):

    @require_api_key
    def get(self, user_id):
        print(f"📥 GET recibido para usuario con ID: {user_id}")
        user = Users.query.get(user_id)
        if not user:
            print(f"❌ No se encontró el usuario con ID {user_id}")
            return jsonify({"error": "Usuario no encontrado"}), 404

        print(f"✅ Usuario encontrado: {user.nombre_usuario}")
        return jsonify({
            "id": user.id,
            "cedula": user.cedula,
            "nombre_usuario": user.nombre_usuario,
            "email": user.email,
            "rol_id": user.rol_id,
            "ruta_imagen": user.ruta_imagen
        })

@blp.route("/<int:user_id>/edit", methods=["POST"])
class UsuarioUpdateResource(MethodView):

    @require_api_key
    def post(self, user_id):
        print(f"🛠️ POST para editar usuario {user_id}")
        user = Users.query.get(user_id)
        if not user:
            print("❌ Usuario no encontrado en DB")
            return jsonify({"error": "Usuario no encontrado"}), 404

        form = request.form
        nuevo_email = form.get("email")

        if nuevo_email and nuevo_email != user.email:
            if Users.query.filter_by(email=nuevo_email).first():
                print(f"⚠️ Email {nuevo_email} ya está en uso.")
                return jsonify({"error": "El correo electrónico ya está registrado"}), 400

        user.nombre_usuario = form.get("nombre_usuario", user.nombre_usuario)
        user.email = nuevo_email
        user.rol_id = form.get("rol_id", user.rol_id)

        imagen_file = request.files.get("foto")
        if imagen_file and imagen_file.filename:
            try:
                nueva_ruta = uploadImagePhoto(
                    file_obj=imagen_file,
                    tipo="profile-pictures",
                    identificador=user.cedula
                )
                user.ruta_imagen = nueva_ruta
            except Exception as e:
                print("⚠️ Error al subir nueva imagen:", str(e))
                return jsonify({"error": "Error al actualizar la imagen"}), 500

        db.session.commit()

        print("✅ Usuario actualizado correctamente")
        return jsonify({"message": "Usuario actualizado correctamente"}), 200








