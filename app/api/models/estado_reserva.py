from api.extensions import db

class EstadoReserva(db.Model):
    __tablename__ = 'estado_reserva'

    id = db.Column(db.Integer, primary_key=True)
    estado = db.Column(db.String(150), unique=True, nullable=False)
