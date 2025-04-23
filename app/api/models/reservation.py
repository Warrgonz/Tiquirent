from api.extensions import db
from datetime import datetime

class Reservation(db.Model):
    __tablename__ = 'reservaciones'

    id = db.Column(db.Integer, primary_key=True)

    # Datos del usuario
    nombre_usuario = db.Column(db.String(100), nullable=False)
    cedula = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    licencia = db.Column(db.String(20), nullable=False)
    tipo_cedula_id = db.Column(db.Integer, db.ForeignKey("tipo_cedula.id"), nullable=False)
    nacionalidad_id = db.Column(db.Integer, db.ForeignKey("nacionalidad.id"), nullable=False)
    
    # Datos de la reserva
    ubicacion_entrega_id = db.Column(db.Integer, db.ForeignKey("ubicacion.id"), nullable=False)
    ubicacion_regreso_id = db.Column(db.Integer, db.ForeignKey("ubicacion.id"), nullable=False)
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_fin = db.Column(db.Date, nullable=False)

    # Relación con vehículo
    vehiculo_id = db.Column(db.Integer, db.ForeignKey("vehiculos.id"), nullable=False)

    # Estado y timestamps
    estado_id = db.Column(db.Integer, db.ForeignKey("estado_reservas.id"), nullable=False)
    fecha_reserva = db.Column(db.DateTime, default=datetime.utcnow)

    # Relaciones
    tipo_cedula = db.relationship("TipoCedula", backref="reservas", lazy=True)
    nacionalidad = db.relationship("Nacionalidad", backref="reservas", lazy=True)
    vehiculo = db.relationship("Vehiculo", backref="reservas", lazy=True)
    ubicacion_entrega = db.relationship("Ubicaciones", foreign_keys=[ubicacion_entrega_id])
    ubicacion_regreso = db.relationship("Ubicaciones", foreign_keys=[ubicacion_regreso_id])
    estado = db.relationship("EstadoReserva", backref="reservas", lazy=True)