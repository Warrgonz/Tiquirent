# app/models/reservaciones.py
from config.database import db
from datetime import datetime

class Reservacion(db.Model):
    __tablename__ = 'reservaciones'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    codigo_reserva = db.Column(db.String(50), unique=True, nullable=False)
    codigo_qr = db.Column(db.Text)  # Se almacena el contenido QR como texto
    nombre = db.Column(db.String(100), nullable=False)
    nacionalidad = db.Column(db.String(50), nullable=False)
    tipo_id = db.Column(db.Enum('Cédula', 'Pasaporte'), nullable=False)
    numero_identificacion = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    numero_licencia = db.Column(db.String(50), unique=True, nullable=False)
    ubicacion_recogida = db.Column(db.String(100), nullable=False)
    ubicacion_entrega = db.Column(db.String(100), nullable=False)
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_fin = db.Column(db.Date, nullable=False)
    id_vehiculo = db.Column(db.Integer, db.ForeignKey('vehiculos.id'), nullable=False)

    vehiculo = db.relationship('Vehiculo', backref=db.backref('reservaciones', lazy=True))