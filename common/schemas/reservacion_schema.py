from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from common.models.reservacion import Reservacion

class ReservacionSchema(SQLAlchemySchema):
    class Meta:
        model = Reservacion
        load_instance = True

    id = auto_field()
    codigo_reserva = auto_field()
    codigo_qr = auto_field()
    nombre = auto_field()
    nacionalidad = auto_field()
    tipo_id = auto_field()
    numero_identificacion = auto_field()
    email = auto_field()
    telefono = auto_field()
    numero_licencia = auto_field()
    ubicacion_recogida = auto_field()
    ubicacion_entrega = auto_field()
    fecha_inicio = auto_field()
    fecha_fin = auto_field()
    id_estado_reserva = auto_field()
    id_aprobador = auto_field()
    id_vehiculo = auto_field()
