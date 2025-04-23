from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from api.models.reservation import Reservation

class ReservationSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Reservation
        include_fk = True
        load_instance = True

    fecha_inicio = auto_field(dump_only=True)
    fecha_fin = auto_field(dump_only=True)
    fecha_reserva = auto_field(dump_only=True)