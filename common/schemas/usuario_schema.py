from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from common.models.usuario import Usuario

class UsuarioSchema(SQLAlchemySchema):
    class Meta:
        model = Usuario
        load_instance = True

    id = auto_field()
    cedula = auto_field()
    nombre_usuario = auto_field()
    email = auto_field()
    contrasena = auto_field()
    contrasena_temp = auto_field()
    fecha_creacion = auto_field()
    ruta_imagen = auto_field()
