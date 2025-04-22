# api/schemas/user_schema.py

from marshmallow import Schema, fields, validate

class RoleNestedSchema(Schema):
    id = fields.Int()
    nombre = fields.Str()

class EstadoNestedSchema(Schema):
    id = fields.Int()
    estado = fields.Str()

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    cedula = fields.Str()
    nombre_usuario = fields.Str()
    email = fields.Email()
    ruta_imagen = fields.Str()
    fecha_creacion = fields.DateTime()

    rol = fields.Nested(RoleNestedSchema)
    estado = fields.Nested(EstadoNestedSchema)

    contrasena = fields.Str(load_only=True)
    contrasena_temp = fields.Str(load_only=True)
