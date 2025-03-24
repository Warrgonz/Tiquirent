# app/models/vehiculos.py
from config.database import db
from datetime import datetime

class Vehiculo(db.Model):
    __tablename__ = 'vehiculos'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    modelo = db.Column(db.String(100), nullable=False)
    marca = db.Column(db.String(50), nullable=False)
    año = db.Column(db.Integer, nullable=False)
    tipo = db.Column(db.String(50))
    placa = db.Column(db.String(20), unique=True, nullable=False)
    color = db.Column(db.String(30))
    kilometraje = db.Column(db.Numeric(10, 2))
    precio_diario = db.Column(db.Numeric(10, 2))
    transmision = db.Column(db.String(50))
    traccion = db.Column(db.String(50))
    puertas = db.Column(db.Integer)
    numero_asientos = db.Column(db.Integer)
    estado = db.Column(db.Enum('disponible', 'alquilado', 'mantenimiento'), default='disponible')