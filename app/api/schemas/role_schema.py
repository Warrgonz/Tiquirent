# api/schemas/role_schema.py
from marshmallow import Schema, fields

class RoleSchema(Schema):
    id = fields.Int(dump_only=True)
    nombre = fields.Str(required=True)
