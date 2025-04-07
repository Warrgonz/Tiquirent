from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from common.models.estado import Estado

class EstadoSchema(SQLAlchemySchema):
    class Meta:
        model = Estado
        load_instance = True

    id = auto_field()
    nombre = auto_field()
