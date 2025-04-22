from ..services.mySqlServices import db

class EstadoReserva(db.Model):
    __tablename__ = 'estado_reservas'

    id = db.Column(db.Integer, primary_key=True)
    estado = db.Column(db.String(50), nullable=False, unique=True)