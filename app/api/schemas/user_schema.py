# api/schemas/user_schema.py

from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    cedula = fields.Str(required=True, validate=validate.Length(min=9))
    nombre_usuario = fields.Str(required=True, validate=validate.Length(min=4))
    email = fields.Email(required=True)
    contrasena = fields.Str(required=True, load_only=True)
    contrasena_temp = fields.Str(load_only=True, allow_none=True)
    rol_id = fields.Int(required=False, allow_none=True)
    estado_id = fields.Int(required=False, allow_none=True)
    ruta_imagen = fields.Str(required=False, allow_none=True)
    fecha_creacion = fields.DateTime(dump_only=True)
