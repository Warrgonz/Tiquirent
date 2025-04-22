from flask.views import MethodView
from flask_smorest import Blueprint
from flask import request, jsonify
from api.extensions import db
from api.models.vehicles import Vehiculo
from api.schemas.vehicles_schema import VehiculoSchema
from api.decorators.auth import require_api_key
from api.services.localStorageService import uploadImagePhoto

blp = Blueprint(
    "vehiculos",
    __name__,
    url_prefix="/vehiculos",
    description="Módulo de Vehículos"
)

@blp.route("/")
class VehiculosResource(MethodView):

    @require_api_key
    @blp.response(200, VehiculoSchema(many=True))
    def get(self):
        return Vehiculo.query.all()

    @require_api_key
    @blp.response(201, VehiculoSchema)
    def post(self):
        form = request.form
        errores = []

        print("🔍 DEBUG FORMULARIO RECIBIDO")
        for key in form:
            print(f"{key} = {form.get(key)}")

        placa = form.get("placa")
        if Vehiculo.query.filter_by(placa=placa).first():
            errores.append("Ya existe un vehículo con esa placa.")

        imagen_file = request.files.get("ruta_imagen")
        print("📸 Imagen recibida:", imagen_file)

        if not imagen_file:
            errores.append("No se recibió la imagen del vehículo.")

        if errores:
            print("❌ Errores en validación inicial:", errores)
            return jsonify({"errors": errores}), 400

        # Intentar guardar la imagen
        try:
            ruta_imagen = uploadImagePhoto(
                file_obj=imagen_file,
                tipo="vehicles",
                identificador=placa
            )
        except ValueError as e:
            print("❌ Error al subir imagen:", str(e))
            return jsonify({"errors": [str(e)]}), 400
        except Exception as e:
            print("🔥 Error inesperado al guardar la imagen:", str(e))
            return jsonify({"errors": ["Error inesperado al guardar la imagen."]}), 500

        # Crear instancia del vehículo
        try:
            nuevo_vehiculo = Vehiculo(
                asin=form.get("asin"),
                modelo=form.get("modelo"),
                marca_id=form.get("marca_id"),
                año=form.get("año"),
                placa=placa,
                color=form.get("color"),
                precio_diario=form.get("precio_diario"),
                transmision_id=form.get("transmision_id"),
                traccion_id=form.get("traccion_id"),
                puertas=form.get("puertas"),
                numero_asientos=form.get("numero_asientos"),
                estado_id=form.get("estado_id"),
                ruta_imagen=ruta_imagen
            )

            db.session.add(nuevo_vehiculo)
            db.session.commit()
            print("✅ Vehículo guardado correctamente en la base de datos.")

            return nuevo_vehiculo

        except Exception as e:
            print("❌ Error al guardar vehículo en la base de datos:", str(e))
            db.session.rollback()
            return jsonify({"errors": ["Error al guardar el vehículo."]}), 500

@blp.route("/<int:id>")
class VehiculoDetalleResource(MethodView):

    @require_api_key
    def get(self, id):
        vehiculo = Vehiculo.query.get_or_404(id)
        schema = VehiculoSchema()
        return schema.dump(vehiculo)
        
    @require_api_key
    def delete(self, id):
        vehiculo = Vehiculo.query.get_or_404(id)
        try:
            db.session.delete(vehiculo)
            db.session.commit()
            return jsonify({"message": "✅ Vehículo eliminado exitosamente."}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"❌ Error al eliminar el vehículo: {str(e)}"}), 500

@blp.route("/<int:id>/edit", methods=["POST"])
class VehiculoUpdateResource(MethodView):

    @require_api_key
    def post(self, id):
        vehiculo = Vehiculo.query.get_or_404(id)
        form = request.form

        try:
            vehiculo.asin = form.get("asin")
            vehiculo.modelo = form.get("modelo")
            vehiculo.marca_id = form.get("marca_id")
            vehiculo.año = form.get("año")
            vehiculo.placa = form.get("placa")
            vehiculo.color = form.get("color")
            vehiculo.precio_diario = form.get("precio_diario")
            vehiculo.transmision_id = form.get("transmision_id")
            vehiculo.traccion_id = form.get("traccion_id")
            vehiculo.puertas = form.get("puertas")
            vehiculo.numero_asientos = form.get("numero_asientos")
            vehiculo.estado_id = form.get("estado_id")

            imagen_file = request.files.get("ruta_imagen")
            if imagen_file and imagen_file.filename:
                ruta_nueva = uploadImagePhoto(imagen_file, "vehicles", vehiculo.placa)
                vehiculo.ruta_imagen = ruta_nueva

            db.session.commit()
            return jsonify({"message": "Vehículo actualizado correctamente"}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Error al actualizar el vehículo"}), 500

