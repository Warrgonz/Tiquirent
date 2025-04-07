from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from common.models.role import Role

class RoleSchema(SQLAlchemySchema):
    class Meta:
        model = Role
        load_instance = True

    id = auto_field()
    nombre = auto_field()
    descripcion = auto_field()
