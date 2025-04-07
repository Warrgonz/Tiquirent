from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from common.models.vehiculo import Vehiculo

class VehiculoSchema(SQLAlchemySchema):
    class Meta:
        model = Vehiculo
        load_instance = True

    id = auto_field()
    modelo = auto_field()
    marca = auto_field()
    año = auto_field()
    tipo = auto_field()
    placa = auto_field()
    color = auto_field()
    ruta_imagen = auto_field()
    precio_diario = auto_field()
    transmision = auto_field()
    traccion = auto_field()
    puertas = auto_field()
    numero_asientos = auto_field()
