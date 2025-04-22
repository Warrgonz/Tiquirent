# api/models/vehicles.py
from api.extensions import db
from api.models.marca import Marca
from api.models.transmision import Transmision
from api.models.traccion import Traccion
from api.models.status import Status

class Vehiculo(db.Model):
    __tablename__ = 'vehiculos'

    id = db.Column(db.Integer, primary_key=True)
    asin = db.Column(db.String(100), nullable=False)

    modelo = db.Column(db.String(100), nullable=False)
    año = db.Column(db.Integer, nullable=False)
    placa = db.Column(db.String(20), nullable=False, unique=True)
    color = db.Column(db.String(30))
    ruta_imagen = db.Column(db.String(255))
    precio_diario = db.Column(db.Numeric(10, 2))

    puertas = db.Column(db.Integer)
    numero_asientos = db.Column(db.Integer)

    # Relaciones normalizadas
    marca_id = db.Column(db.Integer, db.ForeignKey('marcas.id'), nullable=False)
    transmision_id = db.Column(db.Integer, db.ForeignKey('transmisiones.id'))
    traccion_id = db.Column(db.Integer, db.ForeignKey('tracciones.id'))
    estado_id = db.Column(db.Integer, db.ForeignKey('estados.id'))

    marca = db.relationship('Marca', backref='vehiculos')
    transmision = db.relationship('Transmision', backref='vehiculos')
    traccion = db.relationship('Traccion', backref='vehiculos')
    estado = db.relationship('Status', backref='vehiculos')


